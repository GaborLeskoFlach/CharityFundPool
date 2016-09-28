import * as React from 'react'
import {render, findDOMNode} from 'react-dom'
import {observable, action, IObservableArray, computed} from 'mobx';
import {observer} from 'mobx-react';
import { DWMyWorkspaces, IMyWorkspaceSlides, SortDropdownValues } from './model'
import { IWSItemData } from './interfaces';
import DevTools from 'mobx-react-devtools';
import * as classNames from 'classnames';

//Component for Ajax Loader
import { DWLoaderComponent, IDWLoaderComponentProps } from '../loader/component';

import './styles.css'

export interface IDWMyWorkspacesComponentProps {
  slide: DWMyWorkspaces;
}

interface ISlidesComponentProps {
  slide: DWMyWorkspaces;
  handleMouseOut: () => void;
  handleMouseOver: () => void;
}

interface ISlideComponentProps {
  slideClass: string;
  slide: IMyWorkspaceSlides;
}

interface IPaginationComponentProps {
  slide: Array<IMyWorkspaceSlides>;
  toggleSlide: (id: number) => void;
  currentSlideIndex: number;
}

interface IPagerComponentProps {
  slide: IMyWorkspaceSlides;
  noOfSlides: number;
  toggleSlide: (id: number) => void;
  currentSlideIndex: number;
  index:number;
}

interface IControlsComponentProps {
  togglePrev: () => void;
  toggleNext: () => void;
}

interface ISortDropdownComponentProps{
    onSelectChange: (selectedOption:any) => void;
}

interface IWorkspaceContainerComponentProps{
    workspaces : Array<IWSItemData>;
}

interface IWorkspaceItemComponentProps{
    workspace : IWSItemData;
}

@observer
export class DWMyWorkspacesComponent extends React.Component<IDWMyWorkspacesComponentProps, {}>{

  constructor(props) {
    super(props);
    this.autoplayIterator = this.autoplayIterator.bind(this);
  }

  componentDidMount() {
    if (this.props.slide.autoplay) {
      this.startAutoplay();
    }
  }

  componentUnMount() {
    this.stopAutoplay();
  }

  autoplayIterator() {
    this.props.slide.toggleNext();
  }

  startAutoplay() {
    this.props.slide.autoplayID = setInterval(this.autoplayIterator, this.props.slide.autoplayInterval);
  }

  resetAutoplay() {
    if (this.props.slide.autoplay && !this.props.slide.autoplayPaused) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  stopAutoplay() {
    this.props.slide.autoplayID && clearInterval(this.props.slide.autoplayID);
  }

  handleMouseOver() {
    if (this.props.slide.autoplay) {
      this.props.slide.autoplayPaused = true;
      this.stopAutoplay();
    }
  }

  handleMouseOut() {
    if (this.props.slide.autoplay && this.props.slide.autoplayPaused) {
      this.startAutoplay();
      this.props.slide.autoplayPaused = null;
    }
  }

  toggleNext() {
    this.props.slide.toggleNext();
  }

  togglePrev() {
    this.props.slide.togglePrev();
  }

  toggleSlide(id: number) {
    this.props.slide.toggleSlide(id);
  }

  onSelectChange(e:any){
    this.props.slide.onSelectedChange(e.target.value);
  }

  render() {
       
    if(this.props.slide.selectionHasChanged){
      this.props.slide.selectionHasChanged = false;
    }

    return (
      <div id="DWMyWorkspacesHolder">          
          <SortDropdown onSelectChange={this.onSelectChange.bind(this)} />
          <DWLoaderComponent height={30} width={30} loading={this.props.slide.isLoading}>      
            <div className="carousel">           
                <Slides slide={this.props.slide} handleMouseOver={() => this.handleMouseOver() } handleMouseOut={() => this.handleMouseOut() }/>
                {this.props.slide.showIndicators ? <Indicators slide={this.props.slide.slides} toggleSlide={this.toggleSlide.bind(this) } currentSlideIndex={this.props.slide.currentSlideIndex} /> : null}
                {this.props.slide.showControls ? <Controls toggleNext={() => this.toggleNext() } togglePrev={() => this.togglePrev() } /> : null}
            </div>
          </DWLoaderComponent>
      </div>
    )
  }
  
}

class Slides extends React.Component<ISlidesComponentProps, {}>{

  constructor(props) {
    super(props);
  }

  getClassName = (index: number, activeIndex: number): string => {

    let className: string = '';
    let position: string;
    let direction: string;
    let css: string = 'item';

    if (index > activeIndex) {
      position = 'right';
      direction = 'next';
    }
    else if (index < activeIndex) {
      position = 'left';
      direction = 'prev';
    }

    className = classNames(css, direction, position);

    if (index == activeIndex) {
      className = classNames(css, "active");
    }

    return className;
  }

  render() {
    let currentSlideIndex: number = this.props.slide.currentSlideIndex;

    return (
      <div className="carousel-inner" onMouseOver={() => this.props.handleMouseOver() } onMouseOut={() => this.props.handleMouseOut() }>
        {this.props.slide.slides.map((child: IMyWorkspaceSlides, index:number) =>
          <Slide
            key={index}
            slide={child}
            slideClass={this.getClassName(index, currentSlideIndex) }/>
        ) }
      </div>
    )
  }
}

class Slide extends React.Component<ISlideComponentProps, {}>{

  constructor(props) {
    super(props);
  }

  render() {

    let { slideClass }: any = this.props;

    return (
        <div className={slideClass}>
            <WorkspaceContainer workspaces={this.props.slide.slides} />
        </div>
    )
  }
}

class WorkspaceContainer extends React.Component<IWorkspaceContainerComponentProps,{}>{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='page'>
              {this.props.workspaces.map((child: IWSItemData, index:number) =>
                <WorkspaceItem key={index} workspace={child} />
              ) }
            </div>
        )
    }
}

class WorkspaceItem extends React.Component<IWorkspaceItemComponentProps,{}>{
    constructor(props){
        super(props);
    }

    render(){

      let workspaceImage : string = this.props.workspace.WkspcAvatarImage;
      let style : React.CSSProperties = { backgroundImage : 'url('+ workspaceImage + ')' }

      return(
        <div className="pageItem col-lg-4 col-sm-4 col-xs-6">
            <a href={this.props.workspace.URL}>
                <span className="avatarImgWrapper" id="site-img" style={style} alt=""></span>
                <div className="details">
                    <div className="title">{this.props.workspace.Title}</div>
                    <div>{this.props.workspace.Created.toDateString()}</div>
                    <div>{this.props.workspace.WkspcType}</div>
                </div>
            </a>
        </div>              
      )
    }
}

class SortDropdown extends React.Component<ISortDropdownComponentProps,{}>{
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <select ref="sortDropdownElement" onChange ={this.props.onSelectChange.bind(this)}>
                <option value={SortDropdownValues.Default}>-- Sort By --</option>
                <option value={SortDropdownValues.Alphabetical}>Alphabetical order</option>
                <option value={SortDropdownValues.LastCreated}>Last created</option>
                <option value={SortDropdownValues.Type}>Type</option>
            </select>
        )
    }
}

class Controls extends React.Component<IControlsComponentProps, {}>{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a className='left carousel-control' onClick={() => this.props.togglePrev() }>
          <span className="glyphicon glyphicon-chevron-left" ></span>
        </a>
        <a className='right carousel-control' onClick={() => this.props.toggleNext() }>
          <span className="glyphicon glyphicon-chevron-right" ></span>
        </a>
      </div>
    )
  }
}

class Indicators extends React.Component<IPaginationComponentProps, {}>{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ol className="carousel-indicators" >
        { this.props.slide.map((child: IMyWorkspaceSlides, index:number) =>
          <Dots key={index} index={index} slide={child} toggleSlide={this.props.toggleSlide} currentSlideIndex={this.props.currentSlideIndex} noOfSlides={this.props.slide.length} />
        ) }
      </ol>
    )
  }
}

class Dots extends React.Component<IPagerComponentProps, {}>{

  constructor(props) {
    super(props);
  }

  render() {
    const { currentSlideIndex }: any = this.props;
    let activeDotClass: string = currentSlideIndex === (this.props.slide.index) ? 'active' : '';

    return (
      <li key={this.props.slide.index} onClick={this.props.toggleSlide.bind(this, this.props.slide.index) } className={ activeDotClass  }>
        <span className="sr-only">slide { this.props.slide.index } of { this.props.noOfSlides }</span>
      </li>
    );
  }
}


