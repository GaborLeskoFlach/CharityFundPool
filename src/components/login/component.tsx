import * as React from 'react';
import * as firebase from 'firebase';
import { Router, Route, browserHistory } from 'react-router';
import { _firebaseAuth, signIn } from '../firebaseAuth/component';
import { Link } from 'react-router';
import { IAuthValidationError } from '../interfaces';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import './styles.css';

interface IFieldValidation{
    fieldValue : string;
    fieldValidationError : string;
    touched : boolean;
}

interface ISignIn{
    email : IFieldValidation;
    password : IFieldValidation;
    validationError : string;
}


@observer
export class LoginComponent extends React.Component<{}, {}>{
    @observable formState : ISignIn;
    @observable isFormSubmitted : boolean = false;

    constructor() {
        super();

        this.formState = {
            email : {
                fieldValue : '',
                fieldValidationError : '',
                touched : false
            },
            password : {
                fieldValue : '',
                fieldValidationError : '',
                touched : false
            },
            validationError : ''
        }        
    }
    
    validate = (email : string, password : string) => {
        const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
        
        if(email.length == 0){
            this.formState.email.fieldValidationError = 'Email is mandatory';
        }else if (!emailPattern.test(email)) {
            this.formState.email.fieldValidationError = 'Invalid email address';
        }else{
            this.formState.email.fieldValidationError = '';
        }

        if(password.length == 0){
            this.formState.password.fieldValidationError = 'Password is mandatory';
        }else{
            this.formState.password.fieldValidationError = '';
        }
    }

    handleChange = (e) => {
        if(e.target.name === 'email'){
            this.formState.email.fieldValue = e.target.value;
            this.formState.email.fieldValidationError = '';
        }

        if(e.target.name === 'password'){
            this.formState.password.fieldValue = e.target.value;
            this.formState.password.fieldValidationError = '';            
        }

        this.formState.validationError = '';
    }

    handleBlur = (e) => {
        if(e.target.name === 'email'){
            this.formState.email.touched = true;
        }
        if(e.target.name === 'password'){
            this.formState.password.touched = true;
        }
    }

    handleKeyUp = (e) => {
        if(e.key === 'Enter'){
            this.signInUser()
        }
    }

    shouldMarkError = (control:string) => {
        if(control === 'email'){
            const hasError : boolean = this.formState.email.fieldValidationError.length > 0;
            const shouldShow = this.formState.email.touched;
            return hasError ? shouldShow : false;
        }
        if(control === 'password'){
            const hasError : boolean = this.formState.password.fieldValidationError.length > 0;
            const shouldShow = this.formState.password.touched;
            return hasError ? shouldShow : false;
        }
    };

    signInUser = () => {
        let email: string = this.formState.email.fieldValue;
        let password: string = this.formState.password.fieldValue;

        this.formState.email.touched = true;
        this.formState.password.touched = true;

        this.validate(email,password);
        
        if(this.formState.email.fieldValidationError.length == 0 && this.formState.password.fieldValidationError.length == 0){
            signIn(email, password).then(response => {
                if(response){
                    browserHistory.push('/Home');
                }else{
                    //Unable to Sign In
                }
            }).catch((error : IAuthValidationError) => {
                this.formState.validationError = error.message;
            })        
        }
    }

    render() {

        const imgStyle : React.CSSProperties ={
            width:'150px',
            height:'150px'
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="form">
                            <br/>
                            <div className="text-center">
                                <h3><i className="fa fa-sign-in fa-4x"></i></h3>
                                <h2 className="text-center">Sign In</h2>                                              
                            </div>
                            <br/>

                            <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                <input 
                                    id="email" 
                                    name="email" 
                                    placeholder="Email" 
                                    type="email"
                                    onChange={this.handleChange} 
                                    onBlur={this.handleBlur}
                                    value={this.formState.email.fieldValue}
                                    className={this.shouldMarkError('email') ? "form-control error" : "form-control"} /> 
                            </div>
                            <p className='validationErrorMsg'>{this.formState.email.fieldValidationError}</p>

                            <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-lock color-blue"></i></span>
                                <input
                                    onKeyUp={this.handleKeyUp}
                                    id="password" 
                                    name="password" 
                                    placeholder="Password"  
                                    type="password"
                                    onChange={this.handleChange} 
                                    onBlur={this.handleBlur}
                                    value={this.formState.password.fieldValue}
                                    className={this.shouldMarkError('password') ? "form-control error" : "form-control"} />                                                     
                            </div>
                            <p className='validationErrorMsg'>{this.formState.password.fieldValidationError}</p>
                            
                            <p className="text-right"><Link to='/login/passwordReset'>Forgot your password?</Link></p>
                            <button default className="btn btn-default btn-block" onClick={this.signInUser}>LOG IN</button>
                            <hr/>

                            <p className='validationErrorMsg'>{this.formState.validationError}</p>

                            <p className="text-center">
                                <Link to='/Home' className="fliper-btn">Create new account? Register!</Link>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        )
    }
}