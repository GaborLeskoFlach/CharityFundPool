import * as React from 'react';
let DataTable = require('react-data-components').DataTable;

import { AdministrationController, RegistrationType } from './controller';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { map } from 'lodash';
import { IRegistrationNeedHelpInd, IRegistrationWantToHelp, IRegistrationNeedHelpOrg, DataFilter } from '../interfaces';
import { Link, browserHistory } from 'react-router';
import { convertData } from '../../utils/utils';


interface IColumnData {
    title : string;
    prop : string;
    render? : (val,row) => void;
    className? : string;
}

@observer
export class Administration extends React.Component<{},{}> {
    registrationNeedHelpIndColumns : Array<IColumnData>;
    registrationNeedHelpOrgColumns : Array<IColumnData>;
    registrationWantToHelpColumns : Array<IColumnData>;

    registrationNeedHelpIndColumnsArc : Array<IColumnData>;
    registrationNeedHelpOrgColumnsArc : Array<IColumnData>;
    registrationWantToHelpColumnsArc : Array<IColumnData>;    
    @observable registrationsDynamic : Array<IColumnData>;

    controller : AdministrationController;

    constructor(props){
        super(props)
        
        this.controller = new AdministrationController();

        this.registrationNeedHelpIndColumns = [
            { title: '', prop: 'ID', render : this.render_Remove_Ind, className : 'text-center' },
            { title: '', prop: 'ID', render : this.render_Edit_Ind, className : 'text-center' },
            { title: '', prop: 'ID', render : this.render_User_Ind, className : 'text-center' },
            { title: 'Email', prop: 'email' },
            { title: 'Name', prop: 'fullName' },
            { title: 'Phone No', prop: 'phoneNo' },
            { title: 'Country', prop: 'country' },
            { title: 'Address Line1', prop: 'addressLine1'  },
            { title: 'Address Line2', prop: 'addressLine2'  },
            { title: 'City/Suburb', prop: 'citySuburb'  },
            { title: 'PostCode', prop: 'postCode'  },
            { title: 'Need Help With', prop: 'whatINeedHelpWith'  },
            { title: 'When I Need Help', prop: 'whenINeedHelp'  }
        ];

        this.registrationNeedHelpOrgColumns = [
            { title: '', prop: 'ID', render : this.render_Remove_Org, className : 'text-center'  },
            { title: '', prop: 'ID', render : this.render_Edit_Org, className : 'text-center'  },
            { title: '', prop: 'ID', render : this.render_User_Org, className : 'text-center'  },
            { title: 'Email', prop: 'email'  },
            { title: 'Charity', prop: 'charityName'},
            { title: 'Name', prop: 'fullName'  },
            { title: 'Phone No', prop: 'phoneNo'  },            
        ];

        this.registrationWantToHelpColumns = [
            { title: '', prop: 'ID', render : this.render_Remove_WantToHelp, className : 'text-center'  },
            { title: '', prop: 'ID', render : this.render_Edit_WantToHelp, className : 'text-center'  },
            { title: '', prop: 'ID', render : this.render_User_WantToHelp, className : 'text-center'  },
            { title: 'Email', prop: 'email' },
            { title: 'Name', prop: 'fullName' },
            { title: 'PhoneNo', prop: 'phoneNo' },
            { title: 'City/Suburb', prop: 'citySuburb' },
            { title: 'Postcode', prop: 'postCode'  },
            { title: 'Limitations', prop: 'limitations' },
            { title: 'HasTrade', prop: 'hasTrade' },
            //{ title: 'ListOfTrades', prop: 'listOfTrades' }            
        ];

        this.registrationNeedHelpIndColumnsArc = [
            { title: '', prop: 'ID', render : this.render_Activate_Ind, className : 'text-center' },
            { title: 'Email', prop: 'email' },
            { title: 'Name', prop: 'fullName' },
            { title: 'Phone No', prop: 'phoneNo' },
            { title: 'Country', prop: 'country' },
            { title: 'Address Line1', prop: 'addressLine1'  },
            { title: 'Address Line2', prop: 'addressLine2'  },
            { title: 'City/Suburb', prop: 'citySuburb'  },
            { title: 'PostCode', prop: 'postCode'  },
            { title: 'Need Help With', prop: 'whatINeedHelpWith'  },
            { title: 'When I Need Help', prop: 'whenINeedHelp'  }
        ];

        this.registrationNeedHelpOrgColumnsArc = [
            { title: '', prop: 'ID', render : this.render_Activate_Org, className : 'text-center'  },
            { title: 'Email', prop: 'email'  },
            { title: 'Charity', prop: 'charityName'},
            { title: 'Name', prop: 'fullName'  },
            { title: 'Phone No', prop: 'phoneNo'  },            
        ];

        this.registrationWantToHelpColumnsArc = [
            { title: '', prop: 'ID', render : this.render_Activate_WantToHelp, className : 'text-center'  },
            { title: 'Email', prop: 'email' },
            { title: 'Name', prop: 'fullName' },
            { title: 'PhoneNo', prop: 'phoneNo' },
            { title: 'City/Suburb', prop: 'citySuburb' },
            { title: 'Postcode', prop: 'postCode'  },
            { title: 'Limitations', prop: 'limitations' },
            { title: 'HasTrade', prop: 'hasTrade' },
            //{ title: 'ListOfTrades', prop: 'listOfTrades' }            
        ];

        this.registrationsDynamic = [];
    }

    ///
    /// DeActivating a User (should not be already registered) setting Active and ArchiveDate Flags
    ///
    archiveRegistration = (id : string, regType:RegistrationType, event : React.FormEvent) => {
        event.preventDefault();

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
    activateRegistration = (id : string, regType:RegistrationType, event : React.FormEvent) => {
        event.preventDefault();

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
    registerUser = (id : string, regType : RegistrationType, event : React.FormEvent) => {
        event.preventDefault();

        switch(regType){
            case RegistrationType.NeedHelpInd:
            console.log('Activating NeedHelpInd Item => ' + id);
            this.controller.registerUser(RegistrationType.NeedHelpInd, id);
            break;
            case RegistrationType.NeedHelpOrg:
            console.log('Activating NeedHelpOrg Item => ' + id);
            this.controller.registerUser(RegistrationType.NeedHelpOrg,id);
            break;
            case RegistrationType.WantToHelp:
            console.log('Activating WantToHelp Item => ' + id);
            this.controller.registerUser(RegistrationType.WantToHelp,id);
            break;
        }   
    }

    ///
    /// Redirects to particular Registation page to edit details and Save
    ///
    editRegistration = (id : string, regType : RegistrationType, event : React.FormEvent) => {
        event.preventDefault();
        switch(regType){
                case RegistrationType.NeedHelpInd:
                    browserHistory.push('/register/NeedHelp/Ind/ID=' + id);
                    break;
                case RegistrationType.NeedHelpOrg:
                    browserHistory.push('/register/NeedHelp/Org/ID=' + id);
                    break;
                case RegistrationType.WantToHelp:
                    browserHistory.push('/register/WantToHelp/ID=' + id);
                    break;
            }                
    }

    render_Remove_Ind = (val : string, row : IRegistrationNeedHelpInd) => {
        return(
            <button className="btn btn-danger" onClick={this.archiveRegistration.bind(this, row.ID, RegistrationType.NeedHelpInd )}>
                <span className="glyphicon glyphicon-remove"></span> Remove
            </button>
        )
    }

    render_Edit_Ind = (val : string, row : IRegistrationNeedHelpInd) => {
        return(
             <button className="btn btn-default" onClick={this.editRegistration.bind(this, row.ID, RegistrationType.NeedHelpInd )}> 
                <span className="glyphicon glyphicon-edit"></span> Edit
             </button>
        )
    }

    render_User_Ind = (val : string, row : IRegistrationNeedHelpInd) => {
        return(
            <button className="btn btn-default" onClick={this.registerUser.bind(this, row.email, RegistrationType.NeedHelpInd )}> 
                <span className="glyphicon glyphicon-cog"></span> User
            </button>
        )    
    }

    render_Remove_Org = (val : string, row : IRegistrationNeedHelpOrg) => {
        return(
            <button className="btn btn-danger" onClick={this.archiveRegistration.bind(this, row.ID, RegistrationType.NeedHelpOrg)}>
                <span className="glyphicon glyphicon-remove"></span> Remove
            </button>
        )
    }

    render_Edit_Org = (val : string, row : IRegistrationNeedHelpOrg) => {
        return(
            <button className="btn btn-default" onClick={this.editRegistration.bind(this, row.ID, RegistrationType.NeedHelpOrg )}>
                <span className="glyphicon glyphicon-edit"></span> Edit
            </button>
        )
    }

    render_User_Org = (val : string, row : IRegistrationNeedHelpOrg) => {
        return(
            <button className="btn btn-default" onClick={this.registerUser.bind(this, row, RegistrationType.NeedHelpOrg)}>
                <span className="glyphicon glyphicon-cog"></span> User
            </button>
        ) 
    }

    render_Remove_WantToHelp = (val : string, row : IRegistrationWantToHelp) => {
        return(
            <button className="btn btn-danger" onClick={this.archiveRegistration.bind(this, row.ID, RegistrationType.WantToHelp)}>
                <span className="glyphicon glyphicon-remove"></span> Remove
            </button>
        )
    }

    render_Edit_WantToHelp = (val : string, row : IRegistrationWantToHelp) => {
        return(
            <button className="btn btn-default" onClick={this.editRegistration.bind(this, row.ID, RegistrationType.WantToHelp )}>
                <span className="glyphicon glyphicon-edit"></span> Edit
            </button>
        )
    }

    render_User_WantToHelp = (val : string, row : IRegistrationWantToHelp) => {
         return(
            <button className="btn btn-default" onClick={this.registerUser.bind(this, row, RegistrationType.WantToHelp)}>
                <span className="glyphicon glyphicon-cog"></span> User
            </button>
        )   
    }

    render_Activate_Ind = (val : string, row : IRegistrationNeedHelpInd) => {
        return(
            <button className="btn btn-success" onClick={this.activateRegistration.bind(this, row.ID, RegistrationType.NeedHelpInd )}>
                <span className="glyphicon glyphicon-ok"></span> Activate
            </button>
        )
    }

    render_Activate_Org = (val : string, row : IRegistrationNeedHelpOrg) => {
        return(
            <button className="btn btn-success" onClick={this.activateRegistration.bind(this, row.ID, RegistrationType.NeedHelpOrg)}>
                <span className="glyphicon glyphicon-ok"></span> Activate
            </button>
        )
    }

    render_Activate_WantToHelp = (val : string, row : IRegistrationWantToHelp) => {
        return(
            <button className="btn btn-success" onClick={this.activateRegistration.bind(this, row.ID, RegistrationType.WantToHelp)}>
                <span className="glyphicon glyphicon-ok"></span> Activate
            </button>
        )
    }

    componentWillMount(){
        this.controller.isLoading = true;
        this.controller.getRegistrationsForNeedHelpInd().then(response => {
            this.controller.getRegistrationsForNeedHelpOrg().then(response => {
                this.controller.getRegistrationsForWantToHelp().then(response =>{
                    this.controller.getArchivedRegistrations(RegistrationType.NeedHelpInd).then(response => {
                        this.controller.isLoading = false;
                    })                                                                    
                })
            })
        });
    }

    handleRegistrationTypeChange = (e : any) => {
        let regType : RegistrationType;
        let registrationDynamicColumns : any; 

        switch(e.target.value){
            case 'NeedHelpInd':
                regType = RegistrationType.NeedHelpInd
                registrationDynamicColumns = this.registrationNeedHelpIndColumnsArc;
                break;
            case 'NeedHelpOrg':
                regType = RegistrationType.NeedHelpOrg;
                registrationDynamicColumns = this.registrationNeedHelpOrgColumnsArc;
                break;
            case 'WantToHelp':
                regType = RegistrationType.WantToHelp;
                registrationDynamicColumns = this.registrationWantToHelpColumnsArc;
                break;
        }
        
        this.controller.getArchivedRegistrations(regType).then(response => {
            this.registrationsDynamic = registrationDynamicColumns;            
        });
    }   

    render() {

        if(this.controller.isLoading){
            return (
                <div className="container">
                    <div className="section-title">
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        }else{
            return (

                <div className="container">
                    <div className="section-title">
                        <h1>Administration</h1>				
                    </div>
                    <div className="our-details-tab padding-bottom">
                        <div className="row">
                            <section className="content">
                                <div className="col-sm-12 tab-section">

                                    <ul className="nav nav-tabs nav-justified" role="tablist">
                                        <li className="active"><a href="#IndividualRegistrationNeedHelp" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-user"></span> Registration (Need help)</a></li>
                                        <li><a href="#OrganisationRegistrationNeedHelp" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-home"></span> Registration (Need help)</a></li>
                                        <li><a href="#registrationWantToHelp" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-wrench"></span> Registration (Want to help)</a></li>
                                        <li><a href="#archives" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-trash"></span> Archives</a></li>
                                    </ul>

                                    <div className="tab-content">
                                        <div className="tab-pane fade in active" id="IndividualRegistrationNeedHelp">
                                            <div className="table-responsive">
                                                <DataTable                                            
                                                    keys="ID"
                                                    columns={this.registrationNeedHelpIndColumns}
                                                    initialData={convertData(this.controller.registrationsForNeedHelp_Ind, DataFilter.ActiveOnly)}
                                                    initialPageLength={5}
                                                    initialSortBy={{ prop: 'ID', order: 'descending' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="OrganisationRegistrationNeedHelp">
                                            <div className="table-responsive">
                                                <DataTable
                                                    keys="ID"
                                                    columns={this.registrationNeedHelpOrgColumns}
                                                    initialData={convertData(this.controller.registrationsForNeedHelp_Org, DataFilter.ActiveOnly)}
                                                    initialPageLength={5}
                                                    initialSortBy={{ prop: 'ID', order: 'descending' }}
                                                />
                                            </div>
                                        </div>                                    
                                        <div className="tab-pane fade " id="registrationWantToHelp">
                                            <div className="table-responsive">
                                                <DataTable
                                                    keys="ID"
                                                    columns={this.registrationWantToHelpColumns}
                                                    initialData={convertData(this.controller.registrationsForWantToHelp, DataFilter.ActiveOnly)}
                                                    initialPageLength={5}
                                                    initialSortBy={{ prop: 'ID', order: 'descending' }}
                                                />
                                            </div>       
                                        </div>
                                        <div className="tab-pane fade " id="archives">
                                            <div className="container">
                                                <div className="row">
                                                    <section className="content">                                                        
                                                        <div className="col-sm-6">
                                                            <select className="form-control" ref="registrationType" id="registrationType" 
                                                                defaultValue="Individual"
                                                                onChange={this.handleRegistrationTypeChange.bind(this)}>
                                                                <option value=''>Please select an option...</option>
                                                                <option value="NeedHelpInd">Registration - Individuals (Need help)</option>
                                                                <option value="NeedHelpOrg">Registration - Organisations (Need help)</option>
                                                                <option value="WantToHelp">Registration (Want to help)</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-sm-6"></div>
                                                    </section>                                                     
                                                </div>
                                            </div>                            
  
                                            <div className="table-responsive">
                                                <DataTable
                                                    keys="ID"
                                                    columns={this.registrationsDynamic}
                                                    initialData={convertData(this.controller.archivedRegistrations, DataFilter.InActiveOnly)}
                                                    initialPageLength={5}
                                                    initialSortBy={{ prop: 'ID', order: 'descending' }}
                                                />
                                            </div>       
                                        </div>                                                                                        
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )
        }
    }
}