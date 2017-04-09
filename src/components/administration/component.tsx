import * as React from 'react';
import './styles.css';
import { IOrgNeedHelpWithListItem, DataFilter, RegistrationType } from '../interfaces';
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
        if(window.confirm('Are you sure you want to Archive this item?')){
            switch(regType){
                case RegistrationType.NeedHelpInd:
                this.controller.archiveRegistration(regType, id);
                break;
                case RegistrationType.NeedHelpOrg:
                this.controller.archiveRegistration(regType,id);
                break;
                case RegistrationType.WantToHelp:
                this.controller.archiveRegistration(regType,id);
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
            this.controller.activateRegistration(regType, id);
            break;
            case RegistrationType.NeedHelpOrg:
            this.controller.activateRegistration(regType, id);
            break;
            case RegistrationType.WantToHelp:
            this.controller.activateRegistration(regType, id);
            break;
        }               
    }

    /// 
    /// Register User first time (creating user profile)
    ///
    handleRegisterUser = (id : string, email:string, regType : RegistrationType, register : boolean) => {
        const registerMsg : string = 'Email verification will be sent to user. Are you sure you want to continue?';
        const unRegisterMsg : string = 'User will not be able to access the system. Are you sure you want to continue?';
        const message : string = register ? registerMsg : unRegisterMsg;

        if(window.confirm(message)){
            switch(regType){
                case RegistrationType.NeedHelpInd:
                this.controller.registerUser(regType, id, email, register);
                break;
                case RegistrationType.NeedHelpOrg:
                this.controller.registerUser(regType, id, email, register);
                break;
                case RegistrationType.WantToHelp:
                this.controller.registerUser(regType, id, email, register);
                break;
            }
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
    
    ///
    /// Handles Physical Delete operation
    ///
    handleDeleteRegistration = (id : string, regType : RegistrationType) => {
        if(window.confirm('Are you sure you want to delete this registration?')){
            switch(regType){
                    case RegistrationType.NeedHelpInd:
                        this.controller.deleteRegistration(regType, id);
                        break;
                    case RegistrationType.NeedHelpOrg:
                        this.controller.deleteRegistration(regType, id);
                        break;
                    case RegistrationType.WantToHelp:
                        this.controller.deleteRegistration(regType, id);
                        break;
            }
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
                                                    onDeleteRegistration={() => {}}
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
                                                    onDeleteRegistration={() => {}}
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
                                                    onDeleteRegistration={() => {}}
                                                    onActivateRegistration={() => {}} />

                                            </div>
                                            <div className="tab-pane fade" id="archivedRegistrations">

                                                <div className="well">
                                                    All sorts of filters we can put in here to filter Need Cards below
                                                </div>                                            

                                                <ArchivedRegistrations 
                                                    filters={null} 
                                                    active={this.tabArchivedActive}
                                                    onDeleteRegistration={this.handleDeleteRegistration}
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

