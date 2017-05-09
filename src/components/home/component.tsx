import * as React from 'react';
import { Link } from 'react-router';
import { Dashboard } from './dashboard/dashboard'
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

                <section>
                    <div className="container">
                        <div className="section-title-center">
                            <h1>Welcome to Charity Fund Pool</h1>				
                        </div>
                        <div className="text-center who-we-are">
                            <div className="row">
                                <div className="col-sm-12">
                                    <img className="homepageimage" src="templates/images/home/CFPHomePageImage.png" alt="Logo" />                                    
                                </div>
                            </div>
                            <Dashboard />
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading">Bringing the community together</h2>
                                <hr className="primary"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="container text-center who-we-are">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 text-center">
                                <Link to="/register/NeedHelp">
                                    <div className="service-box">                                
                                        <img className="img-responsive" src="templates/images/glossy-green-circle-button-hi.png" alt="" />
                                        <h2 style={styleTemporary}>I need help</h2>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-6 col-md-6 text-center">
                                <Link to="/register/WantToHelp">
                                    <div className="service-box">
                                        <img className="img-responsive" src="templates/images/glossy-green-circle-button-hi.png" alt="" />
                                        <h2 style={styleTemporary}>I want to help</h2>   
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>


                </section>
          
            </div>                
        )
    }

}