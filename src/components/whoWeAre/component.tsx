import * as React from 'react';
import * as Scroll from 'react-scroll';

const Element    = Scroll.Element;

export interface IWhoWeAreComponentProps{

}

export class WhoWeAreComponent extends React.Component<IWhoWeAreComponentProps,{}>{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Element name="who-we-are">
                <div className="container">
                    <div className="section-title">
                        <h1>Who we are</h1>				
                    </div>
                    <div className="our-details-tab padding-bottom">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div id="about-carousel" className="carousel slide carousel-fade" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            <img className="img-responsive" src="templates/images/about/p1.jpg" alt="" />
                                        </div>
                                        <div className="item">
                                            <img className="img-responsive" src="templates/images/about/p2.jpg" alt="" />
                                        </div>
                                        <div className="item">
                                            <img className="img-responsive" src="templates/images/about/p3.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 tab-section">

                                <ul className="nav nav-tabs nav-justified" role="tablist">
                                    <li className="active"><a href="#story" role="tab" data-toggle="tab">Our Story</a></li>
                                    <li><a href="#mission" role="tab" data-toggle="tab">Mission</a></li>
                                    <li><a href="#activity" role="tab" data-toggle="tab">Our Activity</a></li>
                                </ul>

                                <div className="tab-content">
                                    <div className="tab-pane fade in active" id="story">
                                        <h4>Give the Life-changing Gift of Education in Citytown.</h4>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> <p>I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth,</p>
                                    </div>
                                    <div className="tab-pane fade " id="mission">								
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    </div>
                                    <div className="tab-pane fade " id="activity">								
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> <p>I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth,</p>
                                    </div>                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Element>
        )
    }

}