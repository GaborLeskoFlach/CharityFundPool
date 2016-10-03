import * as React from 'react';
import * as Scroll from 'react-scroll';

import { Link } from 'react-router'

const Element    = Scroll.Element;

export interface IWhatWeDoComponentProps{

}

export class WhatWeDoComponent extends React.Component<IWhatWeDoComponentProps,{}>{

    constructor(props){
        super(props);
    }

    render(){


        let styleTemporary : React.CSSProperties = { color: "black" };

        return(
            <Element name="what-we-do">
                <div className="container">
                    <div className="section-title">
                        <h1>What we do</h1>				
                    </div>
                    <div className="text-center who-we-are padding-bottom-two padding-top-two">
                        <div className="row">
                            <Link to="/joinUs/1">
                                <div className="col-sm-4">
                                    <img className="img-responsive" src="templates/images/about/1.png" alt="" />
                                    <h2 style={styleTemporary}>I want to help (as an Organisation)</h2>
                                    <p style={styleTemporary} className="lead">There are 5 Non-profit organisations already registered</p>
                                </div>
                            </Link>
                            <Link to="/joinUs/3">
                                <div className="col-sm-4">
                                    <img className="img-responsive" src="templates/images/about/2.png" alt="" />
                                    <h2 style={styleTemporary}>I want to help (as a person)</h2>
                                    <p style={styleTemporary} className="lead">We have 250 registered members</p>
                                </div>
                            </Link>
                            <Link to="/joinUs/2">
                                <div className="col-sm-4">
                                    <img className="img-responsive" src="templates/images/about/3.png" alt="" />
                                    <h2 style={styleTemporary}>I need help</h2>
                                    <p style={styleTemporary} className="lead">Join us today! It won't cost you anything. We promise.</p>
                                </div>		
                            </Link>			
                        </div>
                    </div>
                </div>
            </Element>
        )
    }
}



