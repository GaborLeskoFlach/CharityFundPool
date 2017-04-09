import * as React from 'react';
import { Link } from 'react-router';
import { _firebaseApp, _firebaseAuth } from '../../../firebaseAuth/component';
import { IOrgNeedHelpWithListItem, IConvertDataConstraint, DataSource, DataFilter } from '../../../interfaces';
import { browserHistory } from 'react-router';
import { Constants } from '../../../constants';
import { map } from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { convertData } from '../../../../utils/utils';
import { RegisterNeedHelpController } from '../controller'
import * as RegistrationFields from '../../formFields'

export interface ICreateNewNeedForOrgsComponent{
    onChanged : (cause:IOrgNeedHelpWithListItem) => void
    controller : RegisterNeedHelpController
}

@observer
export class CreateNewNeedForOrgsComponent extends React.Component<ICreateNewNeedForOrgsComponent, any>{
    needHelpWithListItem : IOrgNeedHelpWithListItem;
    @observable isLoading : boolean = false;

    constructor(props) {
        super(props);
        this.needHelpWithListItem = {
            active : true,
            bestPrice : 0,
            createDate : '',
            description : '',
            estimatedValue : 0,
            photoUrl : '',
            title : ''
        }
    }

    addNewListItem = (e) => {
        e.preventDefault();
        this.isLoading = true;
        this.props.controller.addNeedHelpForOrgsListItem(this.needHelpWithListItem).then((response) => {
            this.isLoading = false;
            this.forceUpdate()
        })
    }

    removeNeedHelpWithListItem = (e, id : string) => {
        e.preventDefault();
        this.isLoading = true;
        this.props.controller.removeNeedHelpForOrgsListItem(id).then((response) => {
            this.isLoading = false;
            this.forceUpdate()
        })
    }

    needHelpWithListItemSelected = (e, id : string) => {
        e.preventDefault();
        console.log('Item selected => ', id)
    }

    handleChange = (event:any) => {
        switch(event.target.id)
        {
            case RegistrationFields.title: 
                this.props.controller.needHelpForOrgsListItem.title = event.target.value;
                this.props.controller.orgNeedHelpListItemFormState.title.fieldValidationError = '';
                break;
            case RegistrationFields.description:
                this.props.controller.needHelpForOrgsListItem.description = event.target.value;
                this.props.controller.orgNeedHelpListItemFormState.description.fieldValidationError = '';
                break;
            case RegistrationFields.estimatedValue:
                this.props.controller.needHelpForOrgsListItem.estimatedValue = event.target.value;
                this.props.controller.orgNeedHelpListItemFormState.estimatedValue.fieldValidationError = '';
                break;
            case RegistrationFields.bestPrice:
                this.props.controller.needHelpForOrgsListItem.bestPrice = event.target.value;
                this.props.controller.orgNeedHelpListItemFormState.bestPrice.fieldValidationError = '';
                break;
        }
    }

    handleBlur = (event) => {
       switch(event.target.id)
        {
            case RegistrationFields.title: 
                this.props.controller.orgNeedHelpListItemFormState.title.touched = true;
                break;
            case RegistrationFields.description:
                this.props.controller.orgNeedHelpListItemFormState.description.touched = true;
                break;
            case RegistrationFields.estimatedValue:
                this.props.controller.orgNeedHelpListItemFormState.estimatedValue.touched = true;
                break;
            case RegistrationFields.bestPrice:
                this.props.controller.orgNeedHelpListItemFormState.bestPrice.touched = true;
                break;
        }
    }

    shouldMarkError = (control:string) => {
        let hasError : boolean = false;
        let shouldShow : boolean = false;
        
        switch(control){
            case RegistrationFields.charityName: 
                hasError = this.props.controller.registerOrganisationFormState.charityName.fieldValidationError.length > 0;
                shouldShow = this.props.controller.registerOrganisationFormState.charityName.touched;
                break;
            case RegistrationFields.fullName:
                hasError = this.props.controller.registerOrganisationFormState.fullName.fieldValidationError.length > 0;
                shouldShow = this.props.controller.registerOrganisationFormState.fullName.touched;
                break;
            case RegistrationFields.phoneNo:
                hasError = this.props.controller.registerOrganisationFormState.phoneNo.fieldValidationError.length > 0;
                shouldShow = this.props.controller.registerOrganisationFormState.phoneNo.touched;
                break;
            case RegistrationFields.email:
                hasError = this.props.controller.registerOrganisationFormState.email.fieldValidationError.length > 0;
                shouldShow = this.props.controller.registerOrganisationFormState.email.touched;
                break      
        }

        return hasError ? shouldShow : false;
    }

    render() {
        
        const { controller } = this.props

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
                <div>
                    <div className="panel panel-default">
                        <div className="panel-heading">

                            <div className={this.shouldMarkError('title') ? "form-group has-error has-feedback" : ""}>
                                <label htmlFor="websiteLink">Title</label>
                                <input 
                                    className={this.shouldMarkError('title') ? "form-control error" : "form-control"}
                                    id="title" 
                                    type="text" 
                                    placeholder="Title" 
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    value={this.props.controller.needHelpForOrgsListItem.title}/>
                                    <span className={this.shouldMarkError('title') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>
                            </div>
                            <p className='validationErrorMsg'>{controller.orgNeedHelpListItemFormState.title.fieldValidationError}</p>

                            <div className={this.shouldMarkError('description') ? "form-group has-error has-feedback" : ""}>
                                <label htmlFor="websiteLink">Description</label>
                                <textarea 
                                    className={this.shouldMarkError('description') ? "form-control error" : "form-control"}
                                    rows={5} 
                                    id="description"
                                    onChange={this.handleChange} 
                                    onBlur={this.handleBlur}
                                    value={this.props.controller.needHelpForOrgsListItem.description}></textarea>
                                <span className={this.shouldMarkError('description') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>
                            </div>
                            <p className='validationErrorMsg'>{controller.orgNeedHelpListItemFormState.description.fieldValidationError}</p>

                            <div className={this.shouldMarkError('estimatedValue') ? "form-group has-error has-feedback" : ""}>
                                <label htmlFor="websiteLink">Estimated value</label>
                                <input 
                                    className={this.shouldMarkError('estimatedValue') ? "form-control error" : "form-control"}
                                    id="estimatedValue" 
                                    type="text" 
                                    placeholder="Estimated Value" 
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    value={this.props.controller.needHelpForOrgsListItem.estimatedValue}/>
                                    <span className={this.shouldMarkError('estimatedValue') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>
                            </div>
                            <p className='validationErrorMsg'>{controller.orgNeedHelpListItemFormState.estimatedValue.fieldValidationError}</p>

                            <div className={this.shouldMarkError('bestPrice') ? "form-group has-error has-feedback" : ""}>
                                <label htmlFor="bestPrice">Best price</label>
                                <input 
                                    className={this.shouldMarkError('bestPrice') ? "form-control error" : "form-control"}
                                    id="bestPrice" 
                                    type="text" 
                                    placeholder="Best Price" 
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    value={this.props.controller.needHelpForOrgsListItem.bestPrice}/>
                                    <span className={this.shouldMarkError('bestPrice') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>
                            </div>
                            <p className='validationErrorMsg'>{controller.orgNeedHelpListItemFormState.bestPrice.fieldValidationError}</p>


                            <button className="btn btn-default" onClick={this.addNewListItem}>Add new Need</button>

                        </div>
                    </div>

                    <div className="form-group">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center">Title</th>
                                        <th className="text-center">Description</th>
                                        <th className="text-center">Estimated Value</th>
                                        <th className="text-center">Best Price</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody id="tbody">

                                    {
                                        map(convertData(controller.causes,DataFilter.ActiveOnly),((cause : IOrgNeedHelpWithListItem, index) => {
                                            return(
                                                <tr key={index}  onClick={(e) => this.needHelpWithListItemSelected(e,cause.ID)}>
                                                    <td className="col-sm-1 col-md-1 text-center">{cause.title}</td>
                                                    <td className="col-sm-1 col-md-1 text-center">{cause.description}</td>
                                                    <td className="col-sm-1 col-md-1 text-center"><strong>{cause.estimatedValue}</strong></td>
                                                    <td className="col-sm-1 col-md-1 text-center"><strong>{cause.bestPrice}</strong></td>
                                                    <td className="col-sm-1 col-md-1">
                                                        <button type="button" className="btn btn-danger" id="remove" onClick={(id) => controller.archiveCause(cause.ID)}>
                                                            <span className="glyphicon glyphicon-remove"></span> Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}

                                </tbody>
                            </table>
                        </div>                                     
                    </div>
                </div>
            )
        }
    }
}