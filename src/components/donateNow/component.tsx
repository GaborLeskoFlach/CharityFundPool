import * as React from 'react';
import { Link } from 'react-router';
import { _firebaseApp, _firebaseAuth } from '../firebaseAuth/component';
import { ICause, IDonation, IConvertDataConstraint, DataFilter} from '../interfaces';
import * as CauseFields from './formFields';
import { DonationController } from './controller';
import { browserHistory } from 'react-router';
import * as DonationFields from './formFields';
import { convertData } from '../../utils/utils';
import {observer} from 'mobx-react';
import { map } from 'lodash';

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
            case DonationFields.amountToDonate:
                this.controller.donationRegistration.amountToDonate = event.target.value;
                this.controller.donationFormState.amountToDonate.fieldValidationError = '';
                break;                  
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
        this.controller.donationFormState.amountToDonate.touched = true;
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
                                <form ref="donationForm" onSubmit={this.addDonation}>
                                    
                                    <div className="form-group">
                                        <label htmlFor="needs">Needs</label>
                                        <div>
                                            <select ref="needs" className="form-control" id="needs" defaultValue={causeId} >
                                                <option value="undefined">Please select a value...</option>

                                                    {map(convertData(this.controller.causes, DataFilter.ActiveOnly), (need : ICause, key) => (
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


                                    <div className={this.shouldMarkError('amountToDonate') ? "form-group has-error has-feedback" : ""}>
                                        <label htmlFor="amountToDonate">Amount to donate</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">$</div>
                                            <input 
                                                type="text" 
                                                className={this.shouldMarkError('amountToDonate') ? "form-control error" : "form-control"}
                                                id="amountToDonate"
                                                onChange={this.handleChange}
                                                onBlur={this.handleBlur}                                                 
                                                placeholder="Amount" 
                                                value={this.controller.donationRegistration.amountToDonate}
                                            />
                                            <span className={this.shouldMarkError('amountToDonate') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>
                                        </div>
                                    </div>
                                    <p className='validationErrorMsg'>{this.controller.donationFormState.amountToDonate.fieldValidationError}</p>  
                            

                                    <div className="section-title">
                                        <h1>Payment Details</h1>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="credit-card-div">
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading">

                                                            <div className="row">
                                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                                    <h5 className="text-muted"> Credit Card Number</h5>
                                                                </div>
                                                                <div className="col-md-3 col-sm-3 col-xs-3">
                                                                    <input type="text" className="form-control" placeholder="0000" />
                                                                </div>
                                                                <div className="col-md-3 col-sm-3 col-xs-3">
                                                                    <input type="text" className="form-control" placeholder="0000" />
                                                                </div>
                                                                <div className="col-md-3 col-sm-3 col-xs-3">
                                                                    <input type="text" className="form-control" placeholder="0000" />
                                                                </div>
                                                                <div className="col-md-3 col-sm-3 col-xs-3">
                                                                    <input type="text" className="form-control" placeholder="0000" />
                                                                </div>
                                                            </div>
                                                            <div className="row ">
                                                                <div className="col-md-3 col-sm-3 col-xs-3">
                                                                    <span className="help-block text-muted small-font"> Expiry Month</span>
                                                                    <input type="text" className="form-control" placeholder="MM" ref="expiryDateMonth"/>
                                                                </div>
                                                                <div className="col-md-3 col-sm-3 col-xs-3">
                                                                    <span className="help-block text-muted small-font">  Expiry Year</span>
                                                                    <input type="text" className="form-control" placeholder="YY" ref="expiryDateYear"/>
                                                                </div>
                                                                <div className="col-md-3 col-sm-3 col-xs-3">
                                                                    <span className="help-block text-muted small-font">  CCV</span>
                                                                    <input type="text" className="form-control" placeholder="CCV" ref="securityCode"/>
                                                                </div>
                                                                <div className="col-md-3 col-sm-3 col-xs-3">
                                                                    <img src="data:image/png;base64,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" className="img-rounded" />
                                                                </div>
                                                            </div>
                                                            <div className="row ">
                                                                <div className="col-md-12 pad-adjust">
                                                                    <span className="help-block text-muted small-font">  Name on the card</span>
                                                                    <input type="text" className="form-control" placeholder="Name" ref="nameOnCard"/>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12 pad-adjust">
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox" defaultChecked className="text-muted"/> I want to make my gift an ongoing monthy donation and help change lives every day!<a href="#">Learn More</a>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn btn-default" type="submit">Donate</button>
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
