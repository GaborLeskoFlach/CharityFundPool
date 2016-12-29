import * as React from 'react';
import { Link } from 'react-router';
import { _firebaseApp } from '../firebaseAuth/component';
import { ICause } from '../interfaces';
import * as CauseFields from './formFields';
import { CauseController } from './controller';
import { browserHistory } from 'react-router';

import { toJS } from 'mobx';
import {observer} from 'mobx-react';
import { map } from 'lodash';

let DataTable = require('react-data-components').DataTable;

interface IColumnData {
    title : string;
    prop : string;
    render? : (val,row) => void;
    className? : string;
}

@observer
export class CauseListComponent extends React.Component<{},{}>{
    controller : CauseController;
    causes : Array<ICause> = [];
    causeColumns : Array<IColumnData> = [];

    constructor(props){
        super(props)

        this.controller = new CauseController();

        this.causeColumns = [
            { title: 'Archive', prop: 'ID', render : this.renderArchive, className : 'text-center'  },    
            { title: 'Donate', prop: 'ID', render : this.renderDonate, className : 'text-center'  },
            { title: 'Edit', prop: 'ID', render : this.renderEdit, className : 'text-center'  },
            { title: 'Created', prop: 'created'},
            { title: 'Title', prop: 'title'  },  
            { title: 'Description', prop: 'description'  },
            { title: 'Estimate Value', prop: 'estimatedValue'  },
            { title: 'Best price', prop: 'bestPrice'  },
            { title: 'Donated', prop: 'ID', render : this.renderDonated, className : 'text-center'  },                     
            { title: 'To go', prop: 'ID', render : this.renderToGo, className : 'text-center'  },
        ];        
    }

    convertData = (dataToConvert : Array<ICause>) : Array<ICause> => {
        let returnData : Array<ICause> = [];
                
        map(toJS(dataToConvert), (data : ICause, key) => (
            data.ID = key,
            returnData.push(data)
        ));

        return returnData;
    }

    componentWillMount(){
        this.controller.isLoading = true;
        this.controller.getCauses().then(response => {
            this.causes = this.convertData(response);
            this.controller.isLoading = false;
        })
    }

    archiveCause = (id:string) => {
        event.preventDefault();
        console.log('Archiving Cause => {0}', id);
    }

    editCause = (id:string) => {
        event.preventDefault();
        console.log('Edit Cause => {0}', id);
    }

    renderDonated = (val : string, row : ICause) => {
        return(
            <div>
                55
            </div>
        )
    }

    renderToGo = (val : string, row : ICause) => {
        return(
            <div>
                66
            </div>
        )
    }    

    renderArchive = (val : string, row : ICause) => {
        return(
            <div>
                <div>
                    <a href="#" onClick={this.archiveCause.bind(this, row.ID)}>Archive</a>
                </div>
            </div>
        )
    }

    renderEdit = (val : string, row : ICause) => {
        return(
            <div>
                <div>
                    <a href="#" onClick={this.editCause.bind(this, row.ID)}>Edit</a>
                </div>
            </div>
        )
    }

    renderDonate = (val : string, row : ICause) => {
        let donateUrl : string = '/donate/' + row.ID;
        return(
            <div>
                <div>
                   <Link to={donateUrl} >Donate</Link>
                </div>
            </div>
        )
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
                <div>
                    <CauseCreateComponent controller={this.controller}/>

                    <div className="container">
                        <div className="section-title">
                            <h1>Needs</h1>                   
                        </div>            
                        <div className="row">
                            <section className="content">
                                <div className="col-sm-12">
                                    <DataTable
                                        keys="ID"
                                        columns={this.causeColumns}
                                        initialData={this.convertData(this.controller.causes)}
                                        initialPageLength={5}
                                        initialSortBy={{ prop: 'ID', order: 'descending' }}
                                    />                                                 
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

interface ICauseCreateComponent{
    controller : CauseController;
}

export class CauseCreateComponent extends React.Component<ICauseCreateComponent,{}>{

    constructor(props){
        super(props);
    }

    resolveRefValue(element : React.ReactInstance) : any{
        if(element !== undefined){
           return (element as HTMLInputElement).value;
        }else{
            return '';
        }
    }

    register = (event:React.FormEvent) => {
        event.preventDefault();
 
        let cause : ICause = {            
            title: this.resolveRefValue((this.refs[CauseFields.title] as HTMLInputElement)),
            description: this.resolveRefValue((this.refs[CauseFields.description] as HTMLInputElement)),
            bestPrice: this.resolveRefValue((this.refs[CauseFields.bestPrice] as HTMLInputElement)),
            estimatedValue : this.resolveRefValue((this.refs[CauseFields.estimatedValue] as HTMLInputElement)),
            photoUrl : this.resolveRefValue((this.refs[CauseFields.photoUrl] as HTMLInputElement)),
            createDate : new Date().toString()
        };

        //Save into DB?

        this.props.controller.addCause(cause).then(response => {            
            //browserHistory.push('/confirm');
        });
    }

    render(){
        //TODO -> implement and check is user is authorized to add new Need
        if(_firebaseApp.auth().currentUser.emailVerified){
            return null;
        }else{
            return(            
                <div className="container">
                    <div className="section-title">
                        <h1>Create a new Need</h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="contact-form">
                                <form ref="createCauseForm" onSubmit={this.register.bind(this)}>

                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input className="form-control" id="title" type="text" ref="title" placeholder="Title" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="form-control" ref="description" rows={5} id="description"></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="estimatedValue">Estimated value</label>
                                        <input className="form-control" id="estimatedValue" type="text" ref="estimatedValue" placeholder="Estimated value"/>
                                    </div>

                                   <div className="form-group">
                                        <label htmlFor="bestPrice">Best price</label>
                                        <input className="form-control" id="bestPrice" type="text" ref="bestPrice" placeholder="Best price"/>
                                    </div>

                                    <button className="btn btn-primary" type="submit">Add new Need</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

}