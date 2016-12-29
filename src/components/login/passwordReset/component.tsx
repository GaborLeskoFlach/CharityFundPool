import * as React from 'react';
import { _firebaseApp, resetPassword } from '../../firebaseAuth/component';
import { browserHistory } from 'react-router';

export class PasswordReset extends React.Component<any,any>{
    
    constructor(props){
        super(props);
    }

    resetPassword = () => {
        let email: string = (this.refs['email'] as HTMLInputElement).value;
        resetPassword(email).then(response => {
            if(response){
                //TODO => Re-sign the user
            }else{
                //TODO => handle here
                console.log('Unable to reset password');
            }
        })
    }

    render(){

        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="flip">
                            <div className="card">
                                <div className="face front">
                                    <div className="panel panel-default">
                                        <form className="form-horizontal">
                                            <br/>
                                            <div className="text-center">
                                                <h3><i className="fa fa-lock fa-4x"></i></h3>
                                                <h2 className="text-center">Forgot Password?</h2>
                                                <p>You can reset your password here.</p>
                               
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock color-blue"></i></span>
                                                    <input id="email" ref="email" name="email" placeholder="Email" className="form-control"  type="email"/>
                                                </div>
                                                <br/>
                                                <button className="btn btn-primary btn-block" onClick={this.resetPassword}>RESET</button>
                                                <hr/>
                                            
                                            </div>
                                        </form>
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