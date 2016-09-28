import * as React from 'react';
import * as Scroll from 'react-scroll';

const Element    = Scroll.Element;

export interface IContactUsComponentProps{

}

export class ContactUsComponent extends React.Component<IContactUsComponentProps,{}>{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Element name="contact-us">
               		<div className="container">
                        <div className="section-title">
                            <h1>Contact Us</h1>
                        </div>
                        <div className="row">
                            <div className="col-sm-10 col-sm-offset-1">
                                <div className="row contact-details">
                                    <div className="col-sm-4">
                                        <span><i className="fa fa-map-marker"></i></span>
                                        <p className="contact-info">1234 Street Name, City Name</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <span><i className="fa fa-phone"></i></span>
                                        <p className="contact-info">+(123) 456-7890 </p>
                                    </div>
                                    <div className="col-sm-4">
                                        <span><i className="fa fa-envelope"></i></span>
                                        <a className="contact-info" href="#">contact@humanity.com</a>
                                    </div>
                                </div>
                                <div className="contact-form">
                                    <form id="contact-form" className="contact-form" name="contact-form" method="post" action="send-mail.php">
                                        <div className="row">
                                            <div className="form-group col-sm-6">
                                                <input type="text" name="name" className="form-control" required="required" placeholder="Name" />
                                                <input type="text" name="company" className="form-control" placeholder="Company" />
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <input type="email" name="email" className="form-control" required="required" placeholder="Email Address" />
                                                <input type="email" name="website" className="form-control" required="required" placeholder="Website" />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <textarea name="message" id="message" required="required" className="form-control" rows="8" placeholder="Message"></textarea>
                                            </div> 
                                        </div>				                                   
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">Send Your Message</button>
                                        </div>
                                    </form>	
                                </div>
                            </div>
                        </div>
                    </div>
            </Element>
        )
    }

}