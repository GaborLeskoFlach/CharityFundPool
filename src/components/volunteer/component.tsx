import * as React from 'react';
import * as Scroll from 'react-scroll';

import { Link } from 'react-router'

const Element    = Scroll.Element;

export interface IVolunteerComponentProps{

}

export class VolunteerComponent extends React.Component<IVolunteerComponentProps,{}>{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Element name="our-members">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="section-title">
                                <h1>Our Members</h1>
                            </div>
                            <div id="member-carousel" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#member-carousel" data-slide-to="0" className="active"></li>
                                    <li data-target="#member-carousel" data-slide-to="1"></li>
                                    <li data-target="#member-carousel" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <div className="row">
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member1.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">John Doe 1</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member2.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">John Doe 2</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member3.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">John Doe 3</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member1.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">John Doe 4</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member4.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">John Doe 5</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member5.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">John Doe 6</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member6.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">John Doe 7</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member7.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">John Doe 8</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member1.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member2.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member3.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member4.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member4.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member6.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member7.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member1.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member1.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member7.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member2.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member3.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member4.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member5.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member6.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-3">
                                                <div className="single-member">
                                                    <div className="member-image">
                                                        <img className="img-responsive" src="templates/images/member/member1.jpg" alt="" />
                                                        <div className="member-info">
                                                            <p className="lead">Jim Tobalt</p>
                                                            <p>Campaign Coordinator</p>
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="become-volunteer">
                                <img className="img-responsive" src="templates/images/logo-icon.png" alt="" />
                                <h1><span>Become a</span>Volunteer</h1>
                                <p>This last point is important because there are some who advocate for democracy only when they are out of power.</p>
                                <Link to="/JoinUs/0" className="btn btn-default">Apply Now</Link>                                
                            </div>
                        </div>
                    </div>
                </div>
            </Element>
        )
    }

}