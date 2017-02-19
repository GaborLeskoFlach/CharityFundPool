import * as React from 'react';
import './styles.css';
import { ICause, DataFilter } from '../interfaces';
import { browserHistory } from 'react-router';
import { CauseController } from './controller';
import { NeedCard } from './needCard';
import { convertData } from '../../utils/utils';
import { observer } from 'mobx-react';

export class NeedList extends React.Component<{},{}>{
    controller: CauseController;

    constructor(props)
    {
        super(props);
        this.controller = new CauseController();
    }

    componentWillMount() {
        this.controller.isLoading = true;
        this.controller.getCauses().then(response => {
            this.controller.getArchivedCauses().then(response => {
                this.controller.isLoading = false;
            })            
        })
    }

    /*
    onClickArchiveNeed = (need : ICause) => {
        event.preventDefault();
        this.controller.archiveCause(need.ID).then(response => {
            console.log('Awesome');
        })
    }

    onClickEditNeed = (need : ICause) => {
        event.preventDefault();
        console.log('Edit Cause => {0}', need.ID);
    }

    onClickDonateNeed = (need : ICause) => {
        browserHistory.push('');
    }

    renderNeedCard = (need : ICause, index : number) => {
        return(
            <li key={index} className="col-sm-3">
                <NeedCard need={need} onClickArchive={this.onClickArchiveNeed} onClickDonate={this.onClickDonateNeed} onClickEdit={this.onClickEditNeed}/>
            </li>  
        )
    }
    */

    render(){
        return(
            <div className="container">
                <div className="section-title">
                    <h1>Needs</h1>
                </div>
                <div className="row">
                    <div id="donate-section">   
                        <div className="container">
                            <div className="donate-section padding">				
                                <div className="donate-tab text-center">
                                    <div id="donate">
                                        <ul className="tab-list list-inline" role="tablist">
                                            <li className="active"><a href="#activeNeeds" role="tab" data-toggle="tab">Currently active Needs</a></li>
                                            <li><a href="#archivedNeeds" role="tab" data-toggle="tab">Archived Needs </a></li>                                            
                                        </ul>
                                       
                                        <TabContent controller={this.controller}  />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                   
            </div>                      
        )
        
    }
}

interface ITabContent{    
    //renderNeedCard : (need : ICause, index : number) => void;
    controller : CauseController;
}

@observer
export class TabContent extends React.Component<ITabContent, {}>{
    
    constructor(props){
        super(props);
    }

    onClickArchiveNeed = (need : ICause, e : React.FormEvent) => {
        event.preventDefault();
        this.props.controller.archiveCause(need.ID).then(response => {
            console.log('Awesome');
        })                
    }

    onClickEditNeed = (need : ICause, e : React.FormEvent) => {
        event.preventDefault();
        console.log('EDIT NEED => {0}', need);
    }

    onClickDonateNeed = (need : ICause, e : React.FormEvent) => {
        event.preventDefault();
        browserHistory.push('/donate/' + need.ID);
    }

    renderNeedCard = (need : ICause, index : number) => {
        return(
            <li key={index} className="col-sm-3">
                <NeedCard 
                    need={need} 
                    onClickArchive={this.onClickArchiveNeed} 
                    onClickDonate={this.onClickDonateNeed} 
                    onClickEdit={this.onClickEditNeed} 
                />
            </li>  
        )
    }

    render(){

        const { controller } = this.props;

        if(controller.isLoading){
            return null;
        }else{
            return(
                    <fieldset className="tab-content">
                        <div className="tab-pane fade in active" id="activeNeeds">
                            
                            <div className="well">
                                All sorts of filters we can put in here to filter Need Cards below
                            </div>
                            
                            <ul className="fancy-label row">
                                {
                                    convertData(controller.causes, DataFilter.ActiveOnly).map((need, index) => {
                                        return this.renderNeedCard(need, index);
                                    })
                                }                                                                      
                            </ul>
                        </div>
                        <div className="tab-pane fade " id="archivedNeeds">

                            <div className="well">
                                All sorts of filters we can put in here to filter Need Cards below
                            </div>                                            

                            <ul className="fancy-label row">
                                {
                                    convertData(controller.archivedCauses, DataFilter.InActiveOnly).map((need, index) => {
                                        return this.renderNeedCard(need, index);
                                    })
                                }                                                                      
                            </ul>                                                                                                                                                     

                        </div>
                    </fieldset>
                )
        }        
    }
}