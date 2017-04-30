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
                            { /*<Dashboard />*/}
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
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 text-center">
                                <Link to="/register/NeedHelp">
                                    <div className="service-box">                                
                                        <i className="fa fa-4x fa-group text-primary sr-icons img-responsive"></i>                                   
                                        <h3>I need help</h3>
                                        <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    </div>
                                </Link>
                            </div>
                            {/*
                            <div className="col-lg-4 col-md-6 text-center">
                                <Link to="/donate">
                                    <div className="service-box">
                                        <i className="fa fa-4x fa-money text-primary sr-icons img-responsive"></i>
                                        <h3>Donate</h3>
                                        <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    </div>
                                </Link>
                            </div>
                            */}
                            <div className="col-lg-6 col-md-6 text-center">
                                <Link to="/register/WantToHelp">
                                    <div className="service-box">
                                        <i className="fa fa-4x fa-group text-primary sr-icons img-responsive"></i>
                                        <h3>I want to help</h3>
                                        <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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