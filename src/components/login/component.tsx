import * as React from 'react';
import * as firebase from 'firebase';
import { Router, Route, browserHistory } from 'react-router';
import { _firebaseAuth, signIn } from '../firebaseAuth/component';
import { Link } from 'react-router';

import './styles.css';



export class LoginComponent extends React.Component<{}, {}>{

    constructor() {
        super();
    }
    
    signInUser = () => {
        let email: string = (this.refs['email'] as HTMLInputElement).value;
        let password: string = (this.refs['password'] as HTMLInputElement).value;     

        signIn(email, password).then(response => {
            if(response){
                browserHistory.push('/Home');
            }else{
                //TODO -> handle error
            }
        })
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
                        <div className="flip">
                            <div className="card">
                                <div className="face front">
                                    <div className="panel panel-default">
                                        <div className="form">
                                            <br/>
                                            <div className="text-center">
                                                <h3><i className="fa fa-sign-in fa-4x"></i></h3>
                                                <h2 className="text-center">Sign In</h2>                                              
                                            </div>
                                            <br/>

                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                                <input id="email" ref="email" name="email" placeholder="Email" className="form-control"  type="email"/>
                                            </div>

                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-lock color-blue"></i></span>
                                                <input id="password" ref="password" name="password" placeholder="Password" className="form-control"  type="password"/>
                                            </div>
                                            
                                            <p className="text-right"><Link to='/login/passwordReset'>Forgot your password?</Link></p>
                                            <button className="btn btn-default btn-block" onClick={this.signInUser}>LOG IN</button>
                                            <hr/>

                                            <p className="text-center">
                                                <Link to='/Home' className="fliper-btn">Create new account? Register!</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        )
    }
}