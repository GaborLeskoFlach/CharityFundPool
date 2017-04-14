import * as React from 'react';
import { Link } from 'react-router';

import './styles.css';

export class HomeComponent extends React.Component<{},{}>{

    constructor(props)
    {
        super(props);
    }


    render(){

        let styleTemporary : React.CSSProperties = { color: "black" };

        return(
            <div>
                <div className="container">
                    <div className="section-title-center">
                        <h1>Welcome to Charity Fund Pool</h1>				
                    </div>
                    <div className="text-center who-we-are">
                        <div className="row">
                            <div className="col-sm-12">
                                <img className="img-responsive" src="templates/images/home/CFPHomePageImage.png" alt="Logo" />
                            </div>
                        </div>
                    </div>
                   
                    <div className="text-center who-we-are">
                        <div className="row">
                            <Link to="/register/NeedHelp">
                                <div className="col-sm-4">
                                    <img className="img-responsive" src="templates/images/glossy-green-circle-button-hi.png" alt="" />
                                    <h2 style={styleTemporary}>I need help</h2>
                                </div>
                            </Link>
                            <div className="col-sm-4">            
                                <div>                    
                                    <h2>Register now</h2>
                                </div>
                            </div>		                            
                            <Link to="/register/WantToHelp">
                                <div className="col-sm-4">
                                    <img className="img-responsive" src="templates/images/glossy-green-circle-button-hi.png" alt="" />
                                    <h2 style={styleTemporary}>I want to help</h2>                                    
                                </div>		
                            </Link>			
                        </div>
                    </div>
                    <div className="text-center who-we-are">
                        <div className="row">
                            <div className="col-sm-12">
                                <h1>Bringing the community together</h1>
                                <h2>Register today if you need some help or you are looking to help</h2>
                            </div>                                    
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <h1>*** We are currently developing our website ***</h1>
                            </div>
                        </div>
                    </div>            
                </div>             
            </div>                
        )
    }

}