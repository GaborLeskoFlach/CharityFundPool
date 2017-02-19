import * as React from 'react';
import './styles.css';
import { ICause, DataFilter } from '../interfaces';
import { browserHistory } from 'react-router';
import { AdministrationController } from './controller';
import { convertData } from '../../utils/utils';

import { NeedHelpIndividualRegistrations } from './NeedHelpIndividual/list';
import { NeedHelpOrganisationRegistrations } from './NeedHelpOrganization/list';
import { WantToHelpRegistrations } from './WantToHelp/list';

import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export class Administration extends React.Component<{},{}>{
    controller: AdministrationController;
    @observable tabIndActive : boolean;
    @observable tabOrgActive : boolean;
    @observable tabWantActive : boolean;
    @observable tabArchivedActive : boolean;

    constructor(props)
    {
        super(props);
        this.controller = new AdministrationController();

        this.tabIndActive = true;
        this.tabOrgActive = false;
        this.tabWantActive = false;
        this.tabArchivedActive = false;
    }

    handleTabChange = (e) => {
        

        switch(e.target.attributes[0].value)
        {
            case '#organizationsNeedHelp':
                this.tabIndActive = false;
                this.tabOrgActive = true;
                this.tabWantActive = false;
                this.tabArchivedActive = false;            
            break;
            case '#peopleNeedHelp':
                this.tabIndActive = true;
                this.tabOrgActive = false;
                this.tabWantActive = false;
                this.tabArchivedActive = false;            
            break;
            case '#peopleWantToHelp':
                this.tabIndActive = false;
                this.tabOrgActive = false;
                this.tabWantActive = true;
                this.tabArchivedActive = false;            
            break;
            case '#archivedRegistrations':
                this.tabIndActive = false;
                this.tabOrgActive = false;
                this.tabWantActive = false;
                this.tabArchivedActive = true;            
            break;
        }
    }

    render(){
        return(
            <div className="container">
                <div className="section-title">
                    <h1>Administration</h1>
                </div>
                <div className="row">
                    <div id="donate-section">   
                        <div className="container">
                            <div className="donate-section padding">				
                                <div className="donate-tab text-center">
                                    <div id="donate">
                                        <ul className="tab-list list-inline" role="tablist" >
                                            <li onClick={this.handleTabChange} className="active"><a href="#peopleNeedHelp" role="tab" data-toggle="tab">People who need help</a></li>
                                            <li onClick={this.handleTabChange}><a href="#organizationsNeedHelp" role="tab" data-toggle="tab">Organizations need help</a></li>
                                            <li onClick={this.handleTabChange}><a href="#peopleWantToHelp" role="tab" data-toggle="tab">People who want to help</a></li>
                                            <li onClick={this.handleTabChange}><a href="#archivedRegistrations" role="tab" data-toggle="tab">Archived Registrations</a></li>                    
                                        </ul>
                                       
                                        <fieldset className="tab-content">
                                            <div className="tab-pane fade in active" id="peopleNeedHelp">
                                                
                                                <div className="well">
                                                    All sorts of filters we can put in here to filter Need Cards below
                                                </div>
                                                
                                                <NeedHelpIndividualRegistrations filters={null} active={this.tabIndActive}/>

                                            </div>
                                            <div className="tab-pane fade " id="organizationsNeedHelp">

                                                <div className="well">
                                                    All sorts of filters we can put in here to filter Need Cards below
                                                </div>                                            

                                                <NeedHelpOrganisationRegistrations filters={null} active={this.tabOrgActive}/>                                                                                                                                                    

                                            </div>
                                            <div className="tab-pane fade" id="peopleWantToHelp">
                                                
                                                <div className="well">
                                                    All sorts of filters we can put in here to filter Need Cards below
                                                </div>
                                                
                                                <WantToHelpRegistrations filters={null}active={this.tabWantActive}/>

                                            </div>
                                            <div className="tab-pane fade" id="archivedRegistrations">

                                                <div className="well">
                                                    All sorts of filters we can put in here to filter Need Cards below
                                                </div>                                            

                                                <ul className="fancy-label row">
                                                                    
                                                </ul>                                                                                                                                                     

                                            </div>                                            
                                        </fieldset>

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

