import * as React from 'react';
import { Link } from 'react-router';
import { _firebaseApp, _firebaseAuth } from '../../firebaseAuth/component';
import { ICause, IConvertDataConstraint, DataSource } from '../../interfaces';
import * as CauseFields from '../formFields';
import { AddNewCauseController } from './controller';
import { browserHistory } from 'react-router';
import { StorageClass } from '../../../utils/storage';
import { Constants } from '../../constants';

export interface ICreateNewCauseComponent{
    saveCauseTo : DataSource;
    onChanged : (cause:ICause) => void;
    registrationId : string;
}

export class CreateNewCauseComponent extends React.Component<ICreateNewCauseComponent, any>{
    controller : AddNewCauseController;
    
    constructor(props) {
        super(props);
        this.controller = new AddNewCauseController();
    }

    resolveRefValue(element: React.ReactInstance): any {
        if (element !== undefined) {
            return (element as HTMLInputElement).value;
        } else {
            return '';
        }
    }

    register = (event: React.FormEvent) => {
        event.preventDefault();

        let cause: ICause = {
            ID: null,
            active : true,
            uid : _firebaseAuth.currentUser.uid,
            title: this.resolveRefValue((this.refs[CauseFields.title] as HTMLInputElement)),
            description: this.resolveRefValue((this.refs[CauseFields.description] as HTMLInputElement)),
            bestPrice: this.resolveRefValue((this.refs[CauseFields.bestPrice] as HTMLInputElement)),
            estimatedValue: this.resolveRefValue((this.refs[CauseFields.estimatedValue] as HTMLInputElement)),
            photoUrl: this.resolveRefValue((this.refs[CauseFields.photoUrl] as HTMLInputElement)),
            createDate: new Date().toString(),
            archiveDate : null
        };

        //Save into DB or LocalStorage
        if(this.props.saveCauseTo == DataSource.Firebase){
            this.controller.addCause(this.props.registrationId,cause).then(response => {
                (this.refs[CauseFields.title] as HTMLInputElement).value = '';
                (this.refs[CauseFields.description] as HTMLInputElement).value = '';
                (this.refs[CauseFields.bestPrice] as HTMLInputElement).value = '';
                (this.refs[CauseFields.estimatedValue] as HTMLInputElement).value = '';
                //(this.refs[CauseFields.photoUrl] as HTMLInputElement).value = '';
            });
        }        
    }

    render() {
        
        const style : React.CSSProperties = {
            textAlign : 'center'
        }

        if (_firebaseAuth.currentUser === null) {
            return(
                <div className="well" style={style}>
                    <h1>You need to be registered to be able create a new Need</h1>
                    <p>Please come back after you've received your registration from CFP</p>
                </div>
            )
        } else {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">

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

                        <button className="btn btn-default" onClick={this.register}>Add new Need</button>

                    </div>
                </div>
            )
        }
    }

}