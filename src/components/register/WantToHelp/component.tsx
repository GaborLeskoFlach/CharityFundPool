import * as React from 'react';
import * as RegistrationFields from '../formFields';
import { Constants } from '../../constants';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { MultiSelectComponent } from '../../common/multiselect/component';
import { RegisterWantToHelpController } from './controller';
import { _firebaseAuth } from '../../firebaseAuth/component';
import { IRegistrationWantToHelp, IMultiSelect, DataFilter, IRouteParams_Registrations } from '../../interfaces';
import { convertData, convertFromObservable } from '../../../utils/utils';

import { Link } from 'react-router';
const Mask = require('react-masking').default
import './styles.css';

interface IRegisterWantToHelpComponent{
    params : IRouteParams_Registrations;
    history : any;
}

@observer
export class RegisterWantToHelpComponent extends React.Component<IRegisterWantToHelpComponent,{}>{
    controller : RegisterWantToHelpController;
    requestURL_ID : string;

    constructor(props){
        super(props);

        this.controller = new RegisterWantToHelpController();

        //check URL Query
        if(this.props.params){
            this.requestURL_ID = this.props.params.ID;
        }
    }

    componentWillMount(){
        this.controller.isLoading = true;    
        this.controller.getTradeOptions().then(response => {
            if(this.requestURL_ID){
                this.controller.getRegistrationByID(this.requestURL_ID).then(response => {                    
                    this.controller.isLoading = false;
                });
            }else if(_firebaseAuth.currentUser !== null){
                this.controller.getUserRegistrationLocationByUID(_firebaseAuth.currentUser.uid).then((location) => {
                    if(location && location.length > 0){
                        this.controller.getRegistrationByLocation(location).then((response) => {
                            this.controller.isLoading = false
                        })
                    }else{
                        this.controller.isLoading = false
                    }
                })    
            }else{
                this.controller.isLoading = false;
            }
        });
    }

    register(event:React.FormEvent){
        event.preventDefault();

        this.validate();

        if(this.controller.registerWantToHelpFormState.email.fieldValidationError.length == 0 &&
            this.controller.registerWantToHelpFormState.fullName.fieldValidationError.length == 0 &&
            this.controller.registerWantToHelpFormState.phoneNo.fieldValidationError.length == 0 &&
            this.controller.registerWantToHelpFormState.citySuburb.fieldValidationError.length == 0 &&
            this.controller.registerWantToHelpFormState.phoneNo.fieldValidationError.length == 0 &&
            this.controller.registerWantToHelpFormState.limitations.fieldValidationError.length == 0){
                
                if(this.controller.isExistingRegistration && this.controller.submitBtnCaption === 'Save'){
                    this.controller.updateNewRegistrationWantToHelp().then(response => {            
                        browserHistory.push('/confirm');
                    }).catch((error) => {
                        this.controller.registerWantToHelpFormState.validationError = JSON.stringify(error);
                    }) 
                }else{
                    this.controller.addNewRegistrationWantToHelp().then(response => {            
                        browserHistory.push('/confirm');
                    }).catch((error) => {
                        this.controller.registerWantToHelpFormState.validationError = JSON.stringify(error);
                    }) 
                }
            }
    }

    handleTradeSelection(value : boolean){
       this.controller.hasTrade = value;
    }

    onTradeSelectionHasChanged = (obj : Array<IMultiSelect>) => {     
        this.controller.setCurrentTradeOptions(obj);
    }

    handleChange = (event : any) => {
        switch(event.target.id)
        {
            case RegistrationFields.email:   
                this.controller.registerWantToHelp.email = event.target.value;
                this.controller.registerWantToHelpFormState.email.fieldValidationError = '';
                break;
            case RegistrationFields.fullName:
                this.controller.registerWantToHelp.fullName = event.target.value;
                this.controller.registerWantToHelpFormState.fullName.fieldValidationError = '';
                break;
            case RegistrationFields.phoneNo:
                this.controller.registerWantToHelp.phoneNo = event.target.value;
                this.controller.registerWantToHelpFormState.phoneNo.fieldValidationError = '';
                break;
            case RegistrationFields.citySuburb:
                this.controller.registerWantToHelp.citySuburb = event.target.value;
                this.controller.registerWantToHelpFormState.citySuburb.fieldValidationError = '';
                break;
            case RegistrationFields.postCode:
                this.controller.registerWantToHelp.postCode = event.target.value;
                this.controller.registerWantToHelpFormState.postCode.fieldValidationError = '';
                break;
            case RegistrationFields.limitations:
                this.controller.registerWantToHelp.limitations = event.target.value;
                this.controller.registerWantToHelpFormState.limitations.fieldValidationError = '';
                break;
            case RegistrationFields.hasTradeYes:
                this.controller.hasTrade = true;
                this.controller.registerWantToHelp.hasTrade = true;
                break;
            case RegistrationFields.hasTradeNo:
                this.controller.hasTrade = false;
                this.controller.registerWantToHelp.hasTrade = false;            
        }
    }

    validate = () => {
        const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
        const lettersOnlyPatter = /[a-zA-Z]+/;
        const numericOnlyPatter = /^[0-9]*$/;
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        
        this.controller.registerWantToHelpFormState.email.touched = true;
        this.controller.registerWantToHelpFormState.fullName.touched = true;
        this.controller.registerWantToHelpFormState.phoneNo.touched = true;
        this.controller.registerWantToHelpFormState.citySuburb.touched = true;
        this.controller.registerWantToHelpFormState.limitations.touched = true;
        this.controller.registerWantToHelpFormState.postCode.touched = true;

        //Email validation
        if(this.controller.registerWantToHelp.email.length == 0){
            this.controller.registerWantToHelpFormState.email.fieldValidationError = 'Required';
        }else if (!emailPattern.test(this.controller.registerWantToHelp.email)) {
            this.controller.registerWantToHelpFormState.email.fieldValidationError = 'Invalid email address';
        }else{
            this.controller.registerWantToHelpFormState.email.fieldValidationError = '';
        }

        //FullName
        if(this.controller.registerWantToHelp.fullName.length == 0){
            this.controller.registerWantToHelpFormState.fullName.fieldValidationError = 'Required';
        }else if (!lettersOnlyPatter.test(this.controller.registerWantToHelp.fullName)) {
            this.controller.registerWantToHelpFormState.fullName.fieldValidationError = 'Name can contain valid characters only';
        }else{
            this.controller.registerWantToHelpFormState.fullName.fieldValidationError = '';
        }        

        //Phone no
        if(this.controller.registerWantToHelp.phoneNo.length == 0){
            this.controller.registerWantToHelpFormState.phoneNo.fieldValidationError = 'Required';
        //}else if (!numericOnlyPatter.test(this.controller.registerWantToHelp.phoneNo)) {
        //    this.controller.registerWantToHelpFormState.phoneNo.fieldValidationError = 'Phone No can contain numbers only';
        }else{
            this.controller.registerWantToHelpFormState.phoneNo.fieldValidationError = '';
        }       

        //City/Suburb
        if(this.controller.registerWantToHelp.citySuburb.length == 0){
            this.controller.registerWantToHelpFormState.citySuburb.fieldValidationError = 'Required';
        }else{
            this.controller.registerWantToHelpFormState.citySuburb.fieldValidationError = '';
        }          

        //PostCode
        if(this.controller.registerWantToHelp.postCode.length == 0){
            this.controller.registerWantToHelpFormState.postCode.fieldValidationError = 'Required';
        }else if (!numericOnlyPatter.test(this.controller.registerWantToHelp.postCode)) {
            this.controller.registerWantToHelpFormState.postCode.fieldValidationError = 'Post code can contain numbers only';
        }else{
            this.controller.registerWantToHelpFormState.postCode.fieldValidationError = '';
        }    

        //Limitations
        if(this.controller.registerWantToHelp.limitations.length == 0){
            this.controller.registerWantToHelpFormState.limitations.fieldValidationError = 'Required';
        }else{
            this.controller.registerWantToHelpFormState.limitations.fieldValidationError = '';
        }                                                                                                                                                  
    }

    handleBlur = (event) => {
        switch(event.target.id)
        {
            case RegistrationFields.fullName:
                this.controller.registerWantToHelpFormState.fullName.touched = true;
                break;
            case RegistrationFields.phoneNo:
                this.controller.registerWantToHelpFormState.phoneNo.touched = true;
                break;
            case RegistrationFields.email:
                this.controller.registerWantToHelpFormState.email.touched = true;
                break;
            case RegistrationFields.citySuburb:
                this.controller.registerWantToHelpFormState.citySuburb.touched = true;
                break;
            case RegistrationFields.postCode:
                this.controller.registerWantToHelpFormState.postCode.touched = true;
                break;
            case RegistrationFields.limitations:
                this.controller.registerWantToHelpFormState.limitations.touched = true;                
        }
    }

    handleKeyPress = (event) => {
        const re = /[0-9A-F:]+/g;
        if (!re.test(event.key)) {
            event.preventDefault();
        }        
    }    

    shouldMarkError = (control:string) => {
        let hasError : boolean = false;
        let shouldShow : boolean = false;

        switch(control)
        {
            case RegistrationFields.fullName:
                hasError = this.controller.registerWantToHelpFormState.fullName.fieldValidationError.length > 0;
                shouldShow = this.controller.registerWantToHelpFormState.fullName.touched;
                break;
            case RegistrationFields.phoneNo:
                hasError  = this.controller.registerWantToHelpFormState.phoneNo.fieldValidationError.length > 0;
                shouldShow = this.controller.registerWantToHelpFormState.phoneNo.touched;
                break;
            case RegistrationFields.email:
                hasError  = this.controller.registerWantToHelpFormState.email.fieldValidationError.length > 0;
                shouldShow = this.controller.registerWantToHelpFormState.email.touched;
                break;
            case RegistrationFields.citySuburb:
                hasError  = this.controller.registerWantToHelpFormState.citySuburb.fieldValidationError.length > 0;
                shouldShow = this.controller.registerWantToHelpFormState.citySuburb.touched;
                break;
            case RegistrationFields.postCode:
                hasError  = this.controller.registerWantToHelpFormState.postCode.fieldValidationError.length > 0;
                shouldShow = this.controller.registerWantToHelpFormState.postCode.touched;
                break;
            case RegistrationFields.limitations:
                hasError  = this.controller.registerWantToHelpFormState.limitations.fieldValidationError.length > 0;
                shouldShow = this.controller.registerWantToHelpFormState.limitations.touched;
                break;                
        }    
        return hasError ? shouldShow : false;
    }

    resetForm = (event) => {
        event.preventDefault()
        this.controller.resetForm()
        browserHistory.push('/home')
    }

    render(){
        let styleTemporary : React.CSSProperties = { color: "black" };
        let btnFloatRight : React.CSSProperties = { float : 'right'}

        if(this.controller.isLoading)
        {
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
                        <h1>Register (I want to help)</h1>
                        {
                            !this.controller.isExistingRegistration &&
                            <h3>Please fill in the form below and wait for a C.F.P. Member to contact you to arrange access to the site</h3>                 
                        }
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="contact-form">
                                <form ref="donationRegistrationForm" onSubmit={this.register.bind(this)}>

                                    <p className='validationErrorMsg'>{this.controller.registerWantToHelpFormState.validationError}</p>

                                    <div className={this.shouldMarkError('fullName') ? "form-group has-error has-feedback" : ""}>
                                        <span className="mandatory-asterix"><label htmlFor="fullName">Name</label></span>
                                        <input
                                            autoComplete="off" 
                                            className={this.shouldMarkError('fullName') ? "form-control error" : "form-control"}
                                            id="fullName" 
                                            type="text" 
                                            ref="fullName" 
                                            placeholder="Full Name" 
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlur}
                                            value={this.controller.registerWantToHelp.fullName}/>
                                            <span className={this.shouldMarkError('fullName') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>               
                                    </div>
                                    <p className='validationErrorMsg'>{this.controller.registerWantToHelpFormState.fullName.fieldValidationError}</p>                        

                                    <div className={this.shouldMarkError('email') ? "form-group has-error has-feedback" : ""}>
                                        <span className="mandatory-asterix"><label htmlFor="email">Email address</label></span>
                                        <input
                                            autoComplete="off"
                                            className={this.shouldMarkError('email') ? "form-control error" : "form-control"}
                                            id="email" 
                                            type="text" 
                                            ref="email" 
                                            placeholder="Email"
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlur}
                                            disabled={this.controller.isExistingRegistration}
                                            value={this.controller.registerWantToHelp.email}/>
                                            <span className={this.shouldMarkError('email') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>                     
                                    </div>
                                    <p className='validationErrorMsg'>{this.controller.registerWantToHelpFormState.email.fieldValidationError}</p>  

                                    <div className={this.shouldMarkError('phoneNo') ? "form-group has-error has-feedback" : ""}>
                                        <span className="mandatory-asterix"><label htmlFor="phoneNo">Phone No</label></span>
                                        <Mask mask="(09)99 999 999" maskCharacter="_" onChange={this.handleChange}>
                                            <input
                                                autoComplete="off"
                                                className={this.shouldMarkError('phoneNo') ? "form-control error" : "form-control"}
                                                id="phoneNo" 
                                                type="text" 
                                                ref="phoneNo" 
                                                placeholder="Phone no" 
                                                onChange={this.handleChange}
                                                onBlur={this.handleBlur}
                                                value={this.controller.registerWantToHelp.phoneNo}/>
                                        </Mask>
                                            <span className={this.shouldMarkError('phoneNo') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>
                                    </div>
                                    <p className='validationErrorMsg'>{this.controller.registerWantToHelpFormState.phoneNo.fieldValidationError}</p>

                                    <div className={this.shouldMarkError('citySuburb') ? "form-group has-error has-feedback" : ""}>
                                        <span className="mandatory-asterix"><label htmlFor="citySuburb">City</label></span>
                                        <input
                                            autoComplete="off"
                                            className={this.shouldMarkError('citySuburb') ? "form-control error" : "form-control"}
                                            id="citySuburb" 
                                            type="text" 
                                            ref="citySuburb" 
                                            placeholder="City/Suburb" 
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlur}
                                            value={this.controller.registerWantToHelp.citySuburb}/>
                                            <span className={this.shouldMarkError('citySuburb') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>
                                    </div>
                                    <p className='validationErrorMsg'>{this.controller.registerWantToHelpFormState.citySuburb.fieldValidationError}</p>

                                    <div className={this.shouldMarkError('postCode') ? "form-group has-error has-feedback" : ""}>
                                        <span className="mandatory-asterix"><label htmlFor="postCode">Postcode</label></span>
                                        <input
                                            autoComplete="off"
                                            className={this.shouldMarkError('postCode') ? "form-control error" : "form-control"}
                                            id="postCode" 
                                            type="text" 
                                            ref="postCode" 
                                            placeholder="Postcode" 
                                            onKeyPress={(e) => this.handleKeyPress(e)}
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlur}
                                            value={this.controller.registerWantToHelp.postCode} />
                                            <span className={this.shouldMarkError('postCode') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>
                                    </div>      
                                    <p className='validationErrorMsg'>{this.controller.registerWantToHelpFormState.postCode.fieldValidationError}</p>     

                                    <div className={this.shouldMarkError('limitations') ? "form-group has-error has-feedback" : ""}>
                                        <span className="mandatory-asterix"><label htmlFor="limitations">Limitations</label></span>
                                        <div>
                                            <select 
                                                className={this.shouldMarkError('limitations') ? "form-control error" : "form-control"}
                                                ref="limitations" 
                                                id="limitations" 
                                                onChange={this.handleChange}
                                                onBlur={this.handleBlur}
                                                value={this.controller.registerWantToHelp.limitations} 
                                            >
                                                <option value="">Please select an option...</option>
                                                <option value="lightDutyWork">Light duty work</option>
                                                <option value="mediumDutyWork">Medium duty work</option>
                                                <option value="heavyDutyWork">Heavy duty work</option>
                                            </select>
                                        </div>     
                                    </div>
                                    <p className='validationErrorMsg'>{this.controller.registerWantToHelpFormState.limitations.fieldValidationError}</p>

                                    <div className="form-group" onChange={this.handleChange}>
                                        <label htmlFor="hasTrade" ref="hasTrade">Do you have trade/trades: </label>
                                        <label className="radio-inline"><input type="radio" name="optradio" id="hasTradeYes"  defaultChecked={this.controller.registerWantToHelp.hasTrade == true} />Yes</label>
                                        <label className="radio-inline"><input type="radio" name="optradio" id="hasTradeNo"   defaultChecked={this.controller.registerWantToHelp.hasTrade == false}/>No</label>                                            
                                    </div>

                                    { this.controller.hasTrade || this.controller.registerWantToHelp.hasTrade ? 
                                        <div className="form-group">
                                            <label htmlFor="listOfTrades">List options:</label>
                                            <MultiSelectComponent defaultData={convertData(this.controller.tradeOptions,DataFilter.All)} userSetOptions={convertFromObservable(this.controller.registerWantToHelp.listOfTrades)} onChange={this.onTradeSelectionHasChanged}/>
                                        </div>

                                    :
                                        null
                                    }

                                    <button className="btn btn-primary submit" type="submit">{this.controller.submitBtnCaption}</button>
                                    <button style={btnFloatRight} className="btn btn-secondary" type='button' onClick={this.resetForm}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>           
                            
                </div>          
            )
        }
    }
  
}
