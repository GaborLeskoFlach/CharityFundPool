import * as React from 'react';
import * as Scroll from 'react-scroll';

const Element    = Scroll.Element;

export interface ICauseListComponentProps{

}

export class CauseListComponent extends React.Component<ICauseListComponentProps, {}>{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <Element name="cause-list">
                <div className="container">	
                    <div className="section-title">
                        <h1>Cause List</h1>				
                    </div>
                    <div id="cause-list-carousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#cause-list-carousel" data-slide-to="0" className="active"></li>
                            <li data-target="#cause-list-carousel" data-slide-to="1"></li>
                            <li data-target="#cause-list-carousel" data-slide-to="2"></li>
                        </ol>			
                        <div className="carousel-inner">
                            <div className="item active">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="list-image border-one">
                                            <img className="img-responsive" src="templates/images/cause-list/1.jpg" alt="" />
                                        </div>
                                        <div className="list-info">
                                            <h2>Please Help Refugees</h2>
                                            <p><span>85%</span> Donated / <span>$7,291</span> To Go</p>
                                            <p>On the other hand, we denounce with righteous indignation and dislike.</p>
                                            <a href="#" className="btn btn-primary">Donate Now</a>
                                        </div>								
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="list-image border-two">
                                            <img className="img-responsive" src="templates/images/cause-list/2.jpg" alt="" />
                                        </div>
                                        <div className="list-info">
                                            <h2>Children Hunger</h2>
                                            <p><span>25%</span> Donated / <span>$7,891</span> To Go</p>
                                            <p>On the other hand, we denounce with righteous indignation and dislike.</p>
                                            <a href="#" className="btn btn-primary">Donate Now</a>
                                        </div>								
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="list-image border-three">
                                            <img className="img-responsive" src="templates/images/cause-list/3.jpg" alt="" />
                                        </div>
                                        <div className="list-info">
                                            <h2>Domestic violence</h2>
                                            <p><span>56%</span> Donated / <span>$6,000</span> To Go</p>
                                            <p>On the other hand, we denounce with righteous indignation and dislike.</p>
                                            <a href="#" className="btn btn-primary">Donate Now</a>
                                        </div>								
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="list-image border-one">
                                            <img className="img-responsive" src="templates/images/cause-list/1.jpg" alt="" />
                                        </div>
                                        <div className="list-info">
                                            <h2>Please Help Refugees</h2>
                                            <p><span>85%</span> Donated / <span>$7,291</span> To Go</p>
                                            <p>On the other hand, we denounce with righteous indignation and dislike.</p>
                                            <a href="#" className="btn btn-primary">Donate Now</a>
                                        </div>								
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="list-image border-two">
                                            <img className="img-responsive" src="templates/images/cause-list/2.jpg" alt="" />
                                        </div>
                                        <div className="list-info">
                                            <h2>Children Hunger</h2>
                                            <p><span>25%</span> Donated / <span>$7,891</span> To Go</p>
                                            <p>On the other hand, we denounce with righteous indignation and dislike.</p>
                                            <a href="#" className="btn btn-primary">Donate Now</a>
                                        </div>								
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="list-image border-three">
                                            <img className="img-responsive" src="templates/images/cause-list/3.jpg" alt="" />
                                        </div>
                                        <div className="list-info">
                                            <h2>Domestic violence</h2>
                                            <p><span>56%</span> Donated / <span>$6,000</span> To Go</p>
                                            <p>On the other hand, we denounce with righteous indignation and dislike.</p>
                                            <a href="#" className="btn btn-primary">Donate Now</a>
                                        </div>								
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="list-image border-one">
                                            <img className="img-responsive" src="templates/images/cause-list/1.jpg" alt="" />
                                        </div>
                                        <div className="list-info">
                                            <h2>Please Help Refugees</h2>
                                            <p><span>85%</span> Donated / <span>$7,291</span> To Go</p>
                                            <p>On the other hand, we denounce with righteous indignation and dislike.</p>
                                            <a href="#" className="btn btn-primary">Donate Now</a>
                                        </div>								
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="list-image border-two">
                                            <img className="img-responsive" src="templates/images/cause-list/2.jpg" alt="" />
                                        </div>
                                        <div className="list-info">
                                            <h2>Children Hunger</h2>
                                            <p><span>25%</span> Donated / <span>$7,891</span> To Go</p>
                                            <p>On the other hand, we denounce with righteous indignation and dislike.</p>
                                            <a href="#" className="btn btn-primary">Donate Now</a>
                                        </div>								
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="list-image border-three">
                                            <img className="img-responsive" src="templates/images/cause-list/3.jpg" alt="" />
                                        </div>
                                        <div className="list-info">
                                            <h2>Domestic violence</h2>
                                            <p><span>56%</span> Donated / <span>$6,000</span> To Go</p>
                                            <p>On the other hand, we denounce with righteous indignation and dislike.</p>
                                            <a href="#" className="btn btn-primary">Donate Now</a>
                                        </div>								
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