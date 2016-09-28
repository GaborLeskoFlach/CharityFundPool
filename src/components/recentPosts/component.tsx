import * as React from 'react';
import * as Scroll from 'react-scroll';

const Element    = Scroll.Element;

export interface IRecentPostsComponentProps{

}

export class RecentPostsComponent extends React.Component<IRecentPostsComponentProps,{}>{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <Element name="recent-posts">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3">
                            <div className="section-title event-title">
                                <h1>Events</h1>
                            </div>
                            <div id="event-carousel" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#event-carousel" data-slide-to="0" className="active"></li>
                                    <li data-target="#event-carousel" data-slide-to="1"></li>
                                    <li data-target="#event-carousel" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Aug <span>01</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">10:00 am - 12:00 am</p>
                                                <p>Empowerment & Leadership</p>
                                            </div>
                                        </a>
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Jul <span>25</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">10:00 am - 12:00 am</p>
                                                <p>Our Children Matter</p>
                                            </div>
                                        </a>
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Jul <span>21</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">10:00 am - 12:00 am</p>
                                                <p>A Standard Post Format &  Solve it</p>
                                            </div>
                                        </a>
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Jul <span>17</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">12:00 am - 5:00 pm</p>
                                                <p>Care for Children</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Aug <span>01</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">10:00 am - 12:00 am</p>
                                                <p>Empowerment & Leadership</p>
                                            </div>
                                        </a>
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Jul <span>27</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">10:00 am - 12:00 am</p>
                                                <p>Our Children Matter</p>
                                            </div>
                                        </a>
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Jul <span>24</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">10:00 am - 12:00 am</p>
                                                <p>A Standard Post Format &  Solve it</p>
                                            </div>
                                        </a>
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Jul <span>13</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">12:00 am - 5:00 pm</p>
                                                <p>Care for Children</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Aug <span>16</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">10:00 am - 12:00 am</p>
                                                <p>Empowerment & Leadership</p>
                                            </div>
                                        </a>
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Jul <span>25</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">10:00 am - 12:00 am</p>
                                                <p>Our Children Matter</p>
                                            </div>
                                        </a>
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Jul <span>15</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">10:00 am - 12:00 am</p>
                                                <p>A Standard Post Format &  Solve it</p>
                                            </div>
                                        </a>
                                        <a href="#" className="single-event">
                                            <div className="pull-left event-date">
                                                <p>Jul <span>17</span></p>									
                                            </div>
                                            <div className="event-info">
                                                <p className="event-time">12:00 am - 5:00 pm</p>
                                                <p className="event-details">Care for Children</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-9">
                            <div className="section-title">
                                <h1>Most Recent Post</h1>
                            </div>					
                            <div id="recent-post-carousel" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#recent-post-carousel" data-slide-to="0" className="active"></li>
                                    <li data-target="#recent-post-carousel" data-slide-to="1"></li>
                                    <li data-target="#recent-post-carousel" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post1.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post2.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post3.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post4.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post3.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post1.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post4.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post2.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post4.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post1.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post3.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="single-post">
                                                    <div className="pull-left post-image">
                                                        <a href="#">
                                                            <img className="img-responsive" src="templates/images/recent-post/post2.jpg" alt="" />
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                    <div className="pull-right post-details">
                                                        <p className="post-date">03 Dec 2014</p>
                                                        <a href="#"><h5>Donec luctus imperdiet</h5></a>
                                                        <span>John doe</span>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </div>
                                                </div>
                                            </div>
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