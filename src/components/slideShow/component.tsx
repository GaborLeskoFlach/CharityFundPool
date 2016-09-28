import * as React from 'react'
import {render, findDOMNode} from 'react-dom'
import {observable, action, IObservableArray, computed} from 'mobx';
import {observer} from 'mobx-react';
import { DWSlides } from './model'
import { ISlideShowCarouselData, DWLink } from './interfaces';
import DevTools from 'mobx-react-devtools';
import * as classNames from 'classnames';
import { DWLoaderComponent } from '../loader/component';

import './styles.css'

export interface IDWSlideShowComponentProps {
  slide: DWSlides;
}

interface ISlidesComponentProps {
  slide: DWSlides;
  handleMouseOut: () => void;
  handleMouseOver: () => void;
}

interface ISlideComponentProps {
  slideClass: string;
  slide: ISlideShowCarouselData;
}

interface IPaginationComponentProps {
  slide: Array<ISlideShowCarouselData>;
  toggleSlide: (id: number) => void;
  currentSlideIndex: number;
}

interface IPagerComponentProps {
  slide: ISlideShowCarouselData;
  noOfSlides: number;
  toggleSlide: (id: number) => void;
  currentSlideIndex: number;
}

interface IControlsComponentProps {
  togglePrev: () => void;
  toggleNext: () => void;
}

@observer
export class DWSlideShowComponent extends React.Component<IDWSlideShowComponentProps, {}>{

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

  render() {
    return (
      <div id="DWSlideshowHolder">
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
        {this.props.slide.slides.map((child: ISlideShowCarouselData, index) =>
          <Slide
            key={child.ID}
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
      <div key={this.props.slide.ID} className={slideClass}  ref="sliderElement">
        <a href={this.props.slide.OriginalPath} >
          <img src={this.props.slide.DWNewsThumbnailImage} className="videoimg" />
          <div className="carousel-caption">

            <div className="shaded">
              <a href={this.props.slide.OriginalPath}>
                <div className="captionText">
                  <h2 className="captionTitleLink">{this.props.slide.DWTitle}</h2>
                  <div className="captionDetailLink">
                    <p className="scwide">{this.props.slide.DWNewsShortdesc}</p>
                    <p className="scsmall">{this.props.slide.DWNewsShortdesc}</p>
                  </div>
                </div>

                <p className="readmore">
                  <span className="scwide">Read more </span>
                  <span className="scsmall">
                    <span className="fa fa-angle-double-right"></span>
                  </span>
                  <span className="fa fa-chevron-right scwide"></span>
                </p>
                <p className="actions">
                  <span>
                    <span className="scsmall">
                      <i className="fa fa-thumbs-up lhs"></i>
                    </span>
                    <span>{this.props.slide.likesCount }</span>
                    <span className="scwide">Likes</span>
                  </span>
                  <span>
                    <span className="scsmall">
                      <i className="fa fa-comment lhs"></i>
                    </span>
                    <span>{this.props.slide.commentsCount }</span>
                    <span className="scwide">Comments</span>
                  </span>
                </p>
              </a>
            </div>
          </div>
        </a>
      </div>
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
        { this.props.slide.map((child: ISlideShowCarouselData) =>
          <Dots key={child.ID} slide={child} toggleSlide={this.props.toggleSlide} currentSlideIndex={this.props.currentSlideIndex} noOfSlides={this.props.slide.length} />
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
    let activeDotClass: string = currentSlideIndex === (this.props.slide.ID - 1) ? 'active' : '';

    return (
      <li key={this.props.slide.ID} onClick={this.props.toggleSlide.bind(this, this.props.slide.ID) } className={ activeDotClass  }>
        <span className="sr-only">slide { this.props.slide.ID } of { this.props.noOfSlides }</span>
      </li>
    );
  }
}


