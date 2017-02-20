import * as React from 'react';
import { RegistrationType } from '../../interfaces';
import { AdministrationController } from '../controller';

import { NeedHelpIndividualRegistrations } from '../NeedHelpIndividual/list';
import { NeedHelpOrganisationRegistrations } from '../NeedHelpOrganization/list';
import { WantToHelpRegistrations } from '../WantToHelp/list';

import { convertData } from '../../../utils/utils';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

interface IArchivedRegistrations{
    filters : Array<any>;
    active : boolean;
    onActivateRegistration : (id : string, registrationType : RegistrationType ) => void;
}

@observer
export class ArchivedRegistrations extends React.Component<IArchivedRegistrations,{}>{
    controller : AdministrationController;
    @observable loaded : boolean;
    @observable tabIndActive : boolean;
    @observable tabOrgActive : boolean;
    @observable tabWantActive : boolean;    

    constructor(props){
        super(props);
        this.controller = new AdministrationController();
        this.loaded = false;
        this.tabIndActive = true;
        this.tabOrgActive = false;
        this.tabWantActive = false;      
    }

    componentWillReceiveProps(newProps : IArchivedRegistrations){
        if(newProps.active){
        }
     }

    componentDidMount = () =>{
        this.loaded = false;
        this.controller.getRegistrationsForNeedHelpInd().then(response =>{
            this.loaded = true;
            console.log('Loaded!');
        });         
    }

    shouldComponentUpdate(nextProps : IArchivedRegistrations, nextState){
        if (nextProps.active){
            return true;
        }else{
            return false;
        }
    }
 
    handleTabChange = (e) => {        

        switch(e.target.attributes[0].value)
        {
            case '#organizationsNeedHelpArchived':
                this.tabIndActive = false;
                this.tabOrgActive = true;
                this.tabWantActive = false;        
            break;
            case '#peopleNeedHelpArchived':
                this.tabIndActive = true;
                this.tabOrgActive = false;
                this.tabWantActive = false;         
            break;
            case '#peopleWantToHelpArchived':
                this.tabIndActive = false;
                this.tabOrgActive = false;
                this.tabWantActive = true;         
            break;
        }
    } 

    render(){
        if(this.props.active && this.loaded){

            return(
                <div className="container">
                    <div className="row">
                        <div id="donate-section">   
                            <div className="container">
                                <div className="donate-section padding">				
                                    <div className="donate-tab text-center">
                                        <div id="donate">
                                            <ul className="tab-list list-inline" role="tablist" >
                                                <li onClick={this.handleTabChange} className="active"><a href="#peopleNeedHelpArchived" role="tab" data-toggle="tab">People who need help</a></li>
                                                <li onClick={this.handleTabChange}><a href="#organizationsNeedHelpArchived" role="tab" data-toggle="tab">Organizations need help</a></li>
                                                <li onClick={this.handleTabChange}><a href="#peopleWantToHelpArchived" role="tab" data-toggle="tab">People who want to help</a></li>                   
                                            </ul>
                                        
                                            <fieldset className="tab-content">
                                                <div className="tab-pane fade in active" id="peopleNeedHelpArchived">                                                
                                                    
                                                    
                                                    <NeedHelpIndividualRegistrations 
                                                        filters={null}
                                                        showArchivedItemsOnly={true} 
                                                        active={this.tabIndActive}
                                                        onArchiveRegistration={() => {}}
                                                        onEditRegistration={() => {}}
                                                        onRegisterUser={() => {}}
                                                        onActivateRegistration={this.props.onActivateRegistration} />
                                                    
                                                </div>
                                                <div className="tab-pane fade " id="organizationsNeedHelpArchived">
                                                    
                                                    <NeedHelpOrganisationRegistrations 
                                                        filters={null}
                                                        showArchivedItemsOnly={true}
                                                        active={this.tabOrgActive}
                                                        onArchiveRegistration={() => {}}
                                                        onEditRegistration={() => {}}
                                                        onRegisterUser={() => {}}
                                                        onActivateRegistration={this.props.onActivateRegistration} />                                                 
                                                    
                                                </div>
                                                <div className="tab-pane fade" id="peopleWantToHelpArchived">                                                                                              
                                                    
                                                    <WantToHelpRegistrations 
                                                        filters={null}
                                                        showArchivedItemsOnly={true}
                                                        active={this.tabWantActive}
                                                        onArchiveRegistration={() => {}}
                                                        onEditRegistration={() => {}}
                                                        onRegisterUser={() => {}}
                                                        onActivateRegistration={this.props.onActivateRegistration} />
                                                    
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


        }else{
            return (
                <div className="container">
                    <div className="section-title">
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        }
    }
}