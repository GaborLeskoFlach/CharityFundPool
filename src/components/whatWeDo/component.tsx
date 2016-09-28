import * as React from 'react';
import * as Scroll from 'react-scroll';

const Element    = Scroll.Element;

export interface IWhatWeDoComponentProps{

}

export class WhatWeDoComponent extends React.Component<IWhatWeDoComponentProps,{}>{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Element name="what-we-do">
                <div className="container">
                    <div className="section-title">
                        <h1>What we do</h1>				
                    </div>
                    <div className="text-center who-we-are padding-bottom-two padding-top-two">
                        <div className="row">
                            <a href="/joinUs/organisation">
                                <div className="col-sm-4">
                                    <img className="img-responsive" src="templates/images/about/1.png" alt="" />
                                    <h2>I want to help (as an Organisation)</h2>
                                    <p className="lead">There are 5 Non-profit organisations already registered</p>
                                </div>
                            </a>
                            <a href="/joinUs/helper">
                                <div className="col-sm-4">
                                    <img className="img-responsive" src="templates/images/about/2.png" alt="" />
                                    <h2>I want to help (as a person)</h2>
                                    <p className="lead">We have 250 registered members</p>
                                </div>
                            </a>
                            <a href="/joinUs/inneed">
                                <div className="col-sm-4">
                                    <img className="img-responsive" src="templates/images/about/3.png" alt="" />
                                    <h2>I need help</h2>
                                    <p className="lead">Join us today! It won't cost you anything. We promise.</p>
                                </div>		
                            </a>			
                        </div>
                    </div>
                </div>
            </Element>
        )
    }
}



