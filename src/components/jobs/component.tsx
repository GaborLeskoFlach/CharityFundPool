import * as React from 'react';
let DataTable = require('react-data-components').DataTable;
import { JobSearchController } from './controller';
import { toJS } from 'mobx';
import {observer} from 'mobx-react';
import { map } from 'lodash';
import { IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg } from '../interfaces';
import { Link } from 'react-router';

interface IColumnData {
    title : string;
    prop : string;
    render? : (val,row) => void;
    className? : string;
}

@observer
export class Jobs extends React.Component<{},{}> {
    registrationNeedHelpIndColumns : Array<IColumnData>;
    controller : JobSearchController;

    constructor(props){
        super(props)

        this.controller = new JobSearchController();

        this.registrationNeedHelpIndColumns = [
            { title: '', prop: 'ID', render : this.renderEditRemoveUrl_RegNeedHelpInd, className : 'text-center'  },    
            { title: 'Need Help With', prop: 'whatINeedHelpWith'  },
            { title: 'When I Need Help', prop: 'whenINeedHelp'  },  
            { title: 'Name', prop: 'fullName'  },
            { title: 'Phone No', prop: 'phoneNo'  },
            { title: 'Email', prop: 'email'  },                     
            { title: 'Country', prop: 'country'  },
            { title: 'Address Line1', prop: 'addressLine1'  },
            { title: 'Address Line2', prop: 'addressLine2'  },
            { title: 'City/Suburb', prop: 'citySuburb'  },
            { title: 'PostCode', prop: 'postCode'  }
        ];        
    }

    componentWillMount(){
        this.controller.isLoading = true;
        this.controller.getRegistrationsForNeedHelpInd().then(response => {                                              
            this.controller.isLoading = false;
        });
    }

    registerForJob = (id : string, event : React.FormEvent) => {
        console.log('Registering for job => ' + id);
    }

    renderEditRemoveUrl_RegNeedHelpInd = (val : string, row : IRegistrationNeedHelpInd) => {
        return(
            <button onClick={this.registerForJob.bind(this, row.ID)}>Register</button>
        )
    }

    convertData1 = (dataToConvert : Array<IRegistrationNeedHelpInd>) : Array<IRegistrationNeedHelpInd> => {
        let returnData : Array<IRegistrationNeedHelpInd> = [];
                
        map(toJS(dataToConvert), (data : IRegistrationNeedHelpInd, key) => (
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
                        <h1>Search for Jobs</h1>                   
                    </div>            
                    <div className="row">
                        <section className="content">
                            <div className="col-sm-12">
                                <DataTable
                                    keys="ID"
                                    columns={this.registrationNeedHelpIndColumns}
                                    initialData={this.convertData1(this.controller.registrationsForNeedHelp_Ind)}
                                    initialPageLength={5}
                                    initialSortBy={{ prop: 'ID', order: 'descending' }}
                                />                                                 
                            </div>
                        </section>
                    </div>
                </div>
            )
        }
    }
}