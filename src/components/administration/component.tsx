import * as React from 'react';
let DataTable = require('react-data-components').DataTable;

import { AdministrationController, RegistrationType } from './controller';
import { toJS } from 'mobx';
import {observer} from 'mobx-react';
import { map } from 'lodash';
import { IRegistrationNeedHelpInd, IRegistrationWantToHelp, IRegistrationNeedHelpOrg } from '../interfaces';
import { Link, browserHistory } from 'react-router';

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
    }

    deleteItem = (id : string, regType:RegistrationType, event : React.FormEvent) => {
        event.preventDefault();

        if(window.confirm('Are you sure you want to delete this item?')){
            switch(regType){
                case RegistrationType.NeedHelpInd:
                console.log('Deleting NeedHelpInd Item => ' + id);
                this.controller.deleteRegistration(RegistrationType.NeedHelpInd, id);
                break;
                case RegistrationType.NeedHelpOrg:
                console.log('Deleting NeedHelpOrg Item => ' + id);
                this.controller.deleteRegistration(RegistrationType.NeedHelpOrg,id);
                break;
                case RegistrationType.WantToHelp:
                console.log('Deleting WantToHelp Item => ' + id);
                this.controller.deleteRegistration(RegistrationType.WantToHelp,id);
                break;
            }
        }        
    }

    editItem = (id : string, regType : RegistrationType, event : React.FormEvent) => {
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
            <button onClick={this.deleteItem.bind(this, row.ID, RegistrationType.NeedHelpInd )}>Remove</button>
        )
    }

    render_Edit_Ind = (val : string, row : IRegistrationNeedHelpInd) => {
        return(
             <button onClick={this.editItem.bind(this, row.ID, RegistrationType.NeedHelpInd )}>Edit</button>
        )
    }

    render_User_Ind = (val : string, row : IRegistrationNeedHelpInd) => {
        return(
            <button onClick={this.deleteItem.bind(this, row.ID, RegistrationType.NeedHelpInd )}>User</button>
        )    
    }

    render_Remove_Org = (val : string, row : IRegistrationNeedHelpOrg) => {
        return(
            <button onClick={this.deleteItem.bind(this, row.ID, RegistrationType.NeedHelpOrg)}>Remove</button>
        )
    }

    render_Edit_Org = (val : string, row : IRegistrationNeedHelpOrg) => {
        return(
            <button onClick={this.editItem.bind(this, row.ID, RegistrationType.NeedHelpOrg )}>Edit</button>
        )
    }

    render_User_Org = (val : string, row : IRegistrationNeedHelpOrg) => {
        return(
            <button onClick={this.deleteItem.bind(this, row.ID, RegistrationType.NeedHelpOrg)}>User</button>
        ) 
    }

    render_Remove_WantToHelp = (val : string, row : IRegistrationWantToHelp) => {
        return(
            <button onClick={this.deleteItem.bind(this, row.ID, RegistrationType.WantToHelp)}>Remove</button>
        )
    }

    render_Edit_WantToHelp = (val : string, row : IRegistrationWantToHelp) => {
        return(
            <button onClick={this.editItem.bind(this, row.ID, RegistrationType.WantToHelp )}>Edit</button>
        )
    }

    render_User_WantToHelp = (val : string, row : IRegistrationWantToHelp) => {
         return(
            <button  onClick={this.deleteItem.bind(this, row.ID, RegistrationType.WantToHelp)}>User</button>
        )   
    }

    componentWillMount(){
        this.controller.isLoading = true;
        this.controller.getRegistrationsForNeedHelpInd().then(response => {
            this.controller.getRegistrationsForNeedHelpOrg().then(response => {
                this.controller.getRegistrationsForWantToHelp().then(response =>{                                                
                    this.controller.isLoading = false;
                })
            })
        });
    }
    
    convertData1 = (dataToConvert : Array<IRegistrationNeedHelpInd>) : Array<IRegistrationNeedHelpInd> => {
        let returnData : Array<IRegistrationNeedHelpInd> = [];
                
        map(toJS(dataToConvert), (data : IRegistrationNeedHelpInd, key) => (
            data.ID = key,
            returnData.push(data)
        ));

        return returnData;
    }

    convertData2 = (dataToConvert : Array<IRegistrationWantToHelp>) : Array<IRegistrationWantToHelp> => {
        let returnData : Array<IRegistrationWantToHelp> = [];
        
        map(toJS(dataToConvert), (data : IRegistrationWantToHelp, key) => (
            data.ID = key,
            returnData.push(data)
        ));

        return returnData;
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
                                        <li className="active"><a href="#IndividualRegistrationNeedHelp" role="tab" data-toggle="tab">Registration Requests (Need help) - Individuals</a></li>
                                        <li><a href="#OrganisationRegistrationNeedHelp" role="tab" data-toggle="tab">Registration Requests (Need help) - Organisations</a></li>
                                        <li><a href="#registrationWantToHelp" role="tab" data-toggle="tab">Registration Requests (Want to help)</a></li>
                                    </ul>

                                    <div className="tab-content">
                                        <div className="tab-pane fade in active" id="IndividualRegistrationNeedHelp">
                                            <DataTable                                            
                                                keys="ID"
                                                columns={this.registrationNeedHelpIndColumns}
                                                initialData={this.convertData1(this.controller.registrationsForNeedHelp_Ind)}
                                                initialPageLength={5}
                                                initialSortBy={{ prop: 'ID', order: 'descending' }}
                                            />
                                        </div>
                                        <div className="tab-pane fade" id="OrganisationRegistrationNeedHelp">
                                            <DataTable
                                                keys="ID"
                                                columns={this.registrationNeedHelpOrgColumns}
                                                initialData={this.convertData1(this.controller.registrationsForNeedHelp_Org)}
                                                initialPageLength={5}
                                                initialSortBy={{ prop: 'ID', order: 'descending' }}
                                            />
                                        </div>                                    
                                        <div className="tab-pane fade " id="registrationWantToHelp">
                                        <DataTable
                                                keys="ID"
                                                columns={this.registrationWantToHelpColumns}
                                                initialData={this.convertData2(this.controller.registrationsForWantToHelp)}
                                                initialPageLength={5}
                                                initialSortBy={{ prop: 'ID', order: 'descending' }}
                                            />                                       
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