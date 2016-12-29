import * as React from 'react';
import { _firebaseApp, signOut } from '../../firebaseAuth/component';
import { browserHistory } from 'react-router';

export class SignOut extends React.Component<any,any>{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        signOut().then(response => {
            if(response){
                browserHistory.push('/home');
            }
        })
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Signing out...</h3>
                    </div>
                </div>
            </div>
        )
    }

}