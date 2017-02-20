import * as React from 'react';
import './styles.css';
import { ICause, DataFilter, RegistrationType } from '../interfaces';
import { browserHistory } from 'react-router';
import { AdministrationController } from './controller';
import { convertData } from '../../utils/utils';

import { NeedHelpIndividualRegistrations } from './NeedHelpIndividual/list';
import { NeedHelpOrganisationRegistrations } from './NeedHelpOrganization/list';
import { WantToHelpRegistrations } from './WantToHelp/list';
import { ArchivedRegistrations } from './ArchivedRegistrations/list';

import { ListFilterIndividualRegistrations } from './NeedHelpIndividual/listFilter';
import { ListFilterOrganisationRegistrations } from './NeedHelpOrganization/listFilter';
import { ListFilterWantToHelpRegistrations } from './WantToHelp/listFilter';

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

    
    ///
    /// DeActivating a User (should not be already registered) setting Active and ArchiveDate Flags
    ///
    handleArchiveRegistration = (id : string, regType:RegistrationType) => {

        if(window.confirm('Are you sure you want to delete this item?')){
            switch(regType){
                case RegistrationType.NeedHelpInd:
                console.log('Deleting NeedHelpInd Item => ' + id);
                this.controller.archiveRegistration(RegistrationType.NeedHelpInd, id);
                break;
                case RegistrationType.NeedHelpOrg:
                console.log('Deleting NeedHelpOrg Item => ' + id);
                this.controller.archiveRegistration(RegistrationType.NeedHelpOrg,id);
                break;
                case RegistrationType.WantToHelp:
                console.log('Deleting WantToHelp Item => ' + id);
                this.controller.archiveRegistration(RegistrationType.WantToHelp,id);
                break;
            }
        }        
    }

    ///
    /// Activating a previously disabled Registration (setting Active and ArchivedDate flags)
    ///
    handleActivateRegistration = (id : string, regType:RegistrationType) => {

        switch(regType){
            case RegistrationType.NeedHelpInd:
            console.log('Activating NeedHelpInd Item => ' + id);
            this.controller.activateRegistration(RegistrationType.NeedHelpInd, id);
            break;
            case RegistrationType.NeedHelpOrg:
            console.log('Activating NeedHelpOrg Item => ' + id);
            this.controller.activateRegistration(RegistrationType.NeedHelpOrg, id);
            break;
            case RegistrationType.WantToHelp:
            console.log('Activating WantToHelp Item => ' + id);
            this.controller.activateRegistration(RegistrationType.WantToHelp, id);
            break;
        }               
    }

    /// 
    /// Register User first time (creating user profile)
    ///
    handleRegisterUser = (id : string, email:string, regType : RegistrationType) => {

        switch(regType){
            case RegistrationType.NeedHelpInd:
            console.log('Activating NeedHelpInd Item => ' + id);
            this.controller.registerUser(RegistrationType.NeedHelpInd, id, email);
            break;
            case RegistrationType.NeedHelpOrg:
            console.log('Activating NeedHelpOrg Item => ' + id);
            this.controller.registerUser(RegistrationType.NeedHelpOrg, id, email);
            break;
            case RegistrationType.WantToHelp:
            console.log('Activating WantToHelp Item => ' + id);
            this.controller.registerUser(RegistrationType.WantToHelp, id, email);
            break;
        }   
    }

    ///
    /// Redirects to particular Registation page to edit details and Save
    ///
    handleEditRegistration = (id : string, regType : RegistrationType) => {
        switch(regType){
                case RegistrationType.NeedHelpInd:
                    browserHistory.push('/register/NeedHelp/Ind/' + id);
                    break;
                case RegistrationType.NeedHelpOrg:
                    browserHistory.push('/register/NeedHelp/Org/' + id);
                    break;
                case RegistrationType.WantToHelp:
                    browserHistory.push('/register/WantToHelp/' + id);
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
                                                
                                                <ListFilterIndividualRegistrations />
                                                
                                                <NeedHelpIndividualRegistrations 
                                                    filters={null}
                                                    showArchivedItemsOnly={false}
                                                    active={this.tabIndActive}
                                                    onArchiveRegistration={this.handleArchiveRegistration}
                                                    onEditRegistration={this.handleEditRegistration}
                                                    onRegisterUser={this.handleRegisterUser} 
                                                    onActivateRegistration={() => {}} />

                                            </div>
                                            <div className="tab-pane fade " id="organizationsNeedHelp">

                                                <ListFilterOrganisationRegistrations />

                                                <NeedHelpOrganisationRegistrations 
                                                    filters={null}
                                                    showArchivedItemsOnly={false}
                                                    active={this.tabOrgActive}
                                                    onArchiveRegistration={this.handleArchiveRegistration}
                                                    onEditRegistration={this.handleEditRegistration}
                                                    onRegisterUser={this.handleRegisterUser}
                                                    onActivateRegistration={() => {}} />

                                            </div>
                                            <div className="tab-pane fade" id="peopleWantToHelp">
                                                
                                                <ListFilterWantToHelpRegistrations />                                                 
                                                
                                                <WantToHelpRegistrations 
                                                    filters={null}
                                                    showArchivedItemsOnly={false}
                                                    active={this.tabWantActive}
                                                    onArchiveRegistration={this.handleArchiveRegistration}
                                                    onEditRegistration={this.handleEditRegistration}
                                                    onRegisterUser={this.handleRegisterUser}
                                                    onActivateRegistration={() => {}} />

                                            </div>
                                            <div className="tab-pane fade" id="archivedRegistrations">

                                                <div className="well">
                                                    All sorts of filters we can put in here to filter Need Cards below
                                                </div>                                            

                                                <ArchivedRegistrations 
                                                    filters={null} 
                                                    active={this.tabArchivedActive}
                                                    onActivateRegistration={this.handleActivateRegistration} />
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

