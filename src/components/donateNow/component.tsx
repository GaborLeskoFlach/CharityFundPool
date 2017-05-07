import * as React from 'react';
import { Link } from 'react-router';
import { _firebaseApp, _firebaseAuth } from '../firebaseAuth/component';
import { IOrgNeedHelpWithListItem, IDonation, IConvertDataConstraint, DataFilter} from '../interfaces';
import * as CauseFields from './formFields';
import { DonationController } from './controller';
import { browserHistory } from 'react-router';
import * as DonationFields from './formFields';
import { convertData } from '../../utils/utils';
import {observer} from 'mobx-react';
import { map } from 'lodash';

import { DonationPaymentConfiguration, IPaymentSelect } from './donationPaymentConfiguration';

interface IRouteParams{
    causeId : string;
}

interface IDonateNowComponentProps{
    history : any;
    params : IRouteParams;
}

enum DonationType{
    Individual = 1,
    Organisation = 2,
    Other = 3
}

@observer
export class DonateNowComponent extends React.Component<IDonateNowComponentProps,{}>{
    controller : DonationController;

    constructor(props){
        super(props)
        this.controller = new DonationController();       
    }

    componentWillMount(){
        this.controller.isLoading = true;
        this.controller.getCauses().then(response => {           
            this.controller.isLoading = false;
        })
    }

    handleChange = (event : any) => {
        switch(event.target.id)
        {
            case DonationFields.email:   
                this.controller.donationRegistration.email = event.target.value;
                this.controller.donationFormState.email.fieldValidationError = '';
                break;
            case DonationFields.fullName:
                this.controller.donationRegistration.fullName = event.target.value;
                this.controller.donationFormState.fullName.fieldValidationError = '';
                break;
            case DonationFields.phoneNo:
                this.controller.donationRegistration.phoneNo = event.target.value;
                this.controller.donationFormState.phoneNo.fieldValidationError = '';
                break;
            case DonationFields.postCode:
                this.controller.donationRegistration.postCode = event.target.value;
                this.controller.donationFormState.postCode.fieldValidationError = '';
                break;
            /*
            case DonationFields.amountToDonate:
                this.controller.donationRegistration.amountToDonate = event.target.value;
                this.controller.donationFormState.amountToDonate.fieldValidationError = '';
                break;      
            */            
        }
    }

    validate = () => {
        const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
        const lettersOnlyPatter = /[a-zA-Z]+/;
        const numericOnlyPatter = /^[0-9]*$/;
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        
        this.controller.donationFormState.email.touched = true;
        this.controller.donationFormState.fullName.touched = true;
        this.controller.donationFormState.phoneNo.touched = true;
        //this.controller.donationFormState.amountToDonate.touched = true;
        this.controller.donationFormState.postCode.touched = true;

        //Email validation
        if(this.controller.donationRegistration.email.length == 0){
            this.controller.donationFormState.email.fieldValidationError = 'Required';
        }else if (!emailPattern.test(this.controller.donationRegistration.email)) {
            this.controller.donationFormState.email.fieldValidationError = 'Invalid email address';
        }else{
            this.controller.donationFormState.email.fieldValidationError = '';
        }

        //FullName
        if(this.controller.donationRegistration.fullName.length == 0){
            this.controller.donationFormState.fullName.fieldValidationError = 'Required';
        }else if (!lettersOnlyPatter.test(this.controller.donationRegistration.fullName)) {
            this.controller.donationFormState.fullName.fieldValidationError = 'Name can contain valid characters only';
        }else{
            this.controller.donationFormState.fullName.fieldValidationError = '';
        }        

        //Phone no
        if(this.controller.donationRegistration.phoneNo.length == 0){
            this.controller.donationFormState.phoneNo.fieldValidationError = 'Required';
        }else if (!numericOnlyPatter.test(this.controller.donationRegistration.phoneNo)) {
            this.controller.donationFormState.phoneNo.fieldValidationError = 'Phone No can contain numbers only';
        }else{
            this.controller.donationFormState.phoneNo.fieldValidationError = '';
        }       

        //PostCode
        if(this.controller.donationRegistration.postCode.length == 0){
            this.controller.donationFormState.postCode.fieldValidationError = 'Required';
        }else if (!numericOnlyPatter.test(this.controller.donationRegistration.postCode)) {
            this.controller.donationFormState.postCode.fieldValidationError = 'Post code can contain numbers only';
        }else{
            this.controller.donationFormState.postCode.fieldValidationError = '';
        }    

        //AmountToDonate        
        if(this.controller.donationRegistration.amountToDonate.length == 0){
            this.controller.donationFormState.amountToDonate.fieldValidationError = 'Required';
        }else if (!numericOnlyPatter.test(this.controller.donationRegistration.amountToDonate)) {
            this.controller.donationFormState.amountToDonate.fieldValidationError = 'Amount can contain numbers only';            
        }else{
            this.controller.donationFormState.amountToDonate.fieldValidationError = '';
        }                                                                                                                                                  
    }

    handleBlur = (event) => {
        switch(event.target.id)
        {
            case DonationFields.fullName:
                this.controller.donationFormState.fullName.touched = true;
                break;
            case DonationFields.phoneNo:
                this.controller.donationFormState.phoneNo.touched = true;
                break;
            case DonationFields.email:
                this.controller.donationFormState.email.touched = true;
                break;
            case DonationFields.postCode:
                this.controller.donationFormState.postCode.touched = true;
                break;
            case DonationFields.amountToDonate:
                this.controller.donationFormState.amountToDonate.touched = true;                
        }
    }

    shouldMarkError = (control:string) => {
        let hasError : boolean = false;
        let shouldShow : boolean = false;

        switch(control)
        {
            case DonationFields.fullName:
                hasError = this.controller.donationFormState.fullName.fieldValidationError.length > 0;
                shouldShow = this.controller.donationFormState.fullName.touched;
                break;
            case DonationFields.phoneNo:
                hasError  = this.controller.donationFormState.phoneNo.fieldValidationError.length > 0;
                shouldShow = this.controller.donationFormState.phoneNo.touched;
                break;
            case DonationFields.email:
                hasError  = this.controller.donationFormState.email.fieldValidationError.length > 0;
                shouldShow = this.controller.donationFormState.email.touched;
                break;
            case DonationFields.postCode:
                hasError  = this.controller.donationFormState.postCode.fieldValidationError.length > 0;
                shouldShow = this.controller.donationFormState.postCode.touched;
                break;
            case DonationFields.amountToDonate:
                hasError  = this.controller.donationFormState.amountToDonate.fieldValidationError.length > 0;
                shouldShow = this.controller.donationFormState.amountToDonate.touched;
                break;                
        }    
        return hasError ? shouldShow : false;
    };

    addDonation = (event:React.FormEvent) => {
        
        // 1. Stop the form from submitting
        event.preventDefault();
        
        this.validate();

        if(this.controller.donationFormState.amountToDonate.fieldValidationError.length == 0 &&
            this.controller.donationFormState.email.fieldValidationError.length == 0 &&
            this.controller.donationFormState.fullName.fieldValidationError.length == 0 &&
            this.controller.donationFormState.phoneNo.fieldValidationError.length == 0 &&
            this.controller.donationFormState.postCode.fieldValidationError.length == 0)
        {
            this.controller.addNewDonation().then(response => {
                this.props.history.push('/');       
            }).catch((error) => {
                this.controller.donationFormState.validationError = JSON.stringify(error);
            })
        }            
    }

    resetForm = (event) => {
        event.preventDefault();
        this.controller.resetForm();
        browserHistory.push('/home')
    }

    paymentTabConfigChange = (data : IPaymentSelect[]) => {
        //TODO here we have access to whatever user selected in DonationPayment control
    }

    render() {

        const { causeId } : any = this.props.params;  
        let btnFloatRight : React.CSSProperties = { float : 'right'}

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
                        <h1>Donate</h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="contact-form">
                                <form onSubmit={this.addDonation}>
                                    
                                    <div className="form-group">
                                        <label htmlFor="needs">Needs</label>
                                        <div>
                                            <select ref="needs" className="form-control" id="needs" defaultValue={causeId} >
                                                <option value="undefined">Please select a value...</option>

                                                    {map(convertData(this.controller.causes, DataFilter.ActiveOnly), (need : IOrgNeedHelpWithListItem, key) => (
                                                        <option key={key} value={need.title}>{need.title}</option>
                                                    ))}
                                            
                                            </select>
                                        </div>
                                    </div>
                                
                                    <div className={this.shouldMarkError('fullName') ? "form-group has-error has-feedback" : ""}>
                                        <label htmlFor="fullName">Name (*)</label>
                                        <input 
                                            className={this.shouldMarkError('fullName') ? "form-control error" : "form-control"}
                                            id="fullName" 
                                            type="text" 
                                            ref="fullName" 
                                            placeholder="Full Name" 
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlur}
                                            value={this.controller.donationRegistration.fullName}/>
                                            <span className={this.shouldMarkError('fullName') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>               
                                    </div>
                                    <p className='validationErrorMsg'>{this.controller.donationFormState.fullName.fieldValidationError}</p>  

                                    <div className={this.shouldMarkError('email') ? "form-group has-error has-feedback" : ""}>
                                        <label htmlFor="email">Email address (*)</label>
                                        <input 
                                            className={this.shouldMarkError('email') ? "form-control error" : "form-control"}
                                            id="email" 
                                            type="text" 
                                            ref="email" 
                                            placeholder="Email"
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlur}
                                            value={this.controller.donationRegistration.email}/>
                                            <span className={this.shouldMarkError('email') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>                     
                                    </div>
                                    <p className='validationErrorMsg'>{this.controller.donationFormState.email.fieldValidationError}</p> 

                                    <div className={this.shouldMarkError('phoneNo') ? "form-group has-error has-feedback" : ""}>
                                        <label htmlFor="phoneNo">Phone No (*)</label>
                                        <input 
                                            className={this.shouldMarkError('phoneNo') ? "form-control error" : "form-control"}
                                            id="phoneNo" 
                                            type="text" 
                                            ref="phoneNo" 
                                            placeholder="Phone no" 
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlur}
                                            value={this.controller.donationRegistration.phoneNo}/>
                                            <span className={this.shouldMarkError('phoneNo') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>
                                    </div>
                                    <p className='validationErrorMsg'>{this.controller.donationFormState.phoneNo.fieldValidationError}</p>
                                
                                    <div className={this.shouldMarkError('postCode') ? "form-group has-error has-feedback" : ""}>
                                        <label htmlFor="postCode">Postcode (*)</label>
                                        <input 
                                            className={this.shouldMarkError('postCode') ? "form-control error" : "form-control"}
                                            id="postCode" 
                                            type="text" 
                                            placeholder="Postcode" 
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlur}
                                            value={this.controller.donationRegistration.postCode} />
                                            <span className={this.shouldMarkError('postCode') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>
                                    </div>      
                                    <p className='validationErrorMsg'>{this.controller.donationFormState.postCode.fieldValidationError}</p>  



                                    <DonationPaymentConfiguration paymentTabConfigState={this.paymentTabConfigChange} />

                                    <button type="submit" className="btn btn-primary submit">Donate</button>
                                    <button style={btnFloatRight} className="btn btn-secondary" type="button" onClick={this.resetForm}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
