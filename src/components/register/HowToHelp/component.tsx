import * as React from 'react';
import { Link } from 'react-router';
import { RegistrationRoles } from '../../interfaces'
import { _firebaseAuth, _currentRegistrationRole } from '../../firebaseAuth/component'


export class HowToHelpComponent extends React.Component<{},{}>{

    constructor(props){
        super(props);
    }

    render(){

        let styleTemporary : React.CSSProperties = { color: "black" };

        return (
            <div className="container">
                <div className="section-title-center">
                    <h1>How would you like to help</h1>				
                </div>
                <div className="text-center who-we-are">
                    <div className="row">
                        
                        {
                            _currentRegistrationRole !== RegistrationRoles.UnAuthenticated &&

                            <Link to="/donate">
                                <div className="col-sm-4">
                                    <img className="img-responsive" src="../templates/images/about/2.png" alt="" />
                                    <h2 style={styleTemporary}>Donate to the pool</h2>
                                </div>
                            </Link>
                        }
                        
                        <div className="col-sm-4">            
                        </div>		                            
                        <Link to="/register/WantToHelp">
                            <div className="col-sm-4">
                                <img className="img-responsive" src="../templates/images/about/3.png" alt="" />
                                <h2 style={styleTemporary}>Donate money/goods/time</h2>
                            </div>		
                        </Link>			
                    </div>
                </div>                                 
            </div>     
        )
    } 
}