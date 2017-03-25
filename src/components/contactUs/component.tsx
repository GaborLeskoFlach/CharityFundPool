import * as React from 'react';


export interface IContactUsComponentProps{

}

export class ContactUsComponent extends React.Component<IContactUsComponentProps,{}>{

    constructor(props){
        super(props);
    }

    render(){

        return(
            <div className="container">
                <div className="section-title">
                    <h1>Contact Us</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Enter name" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Email Address</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><span className="glyphicon glyphicon-envelope"></span>
                                            </span>
                                            <input type="email" className="form-control" id="email" placeholder="Enter email" required /></div>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Subject</label>
                                        <select id="subject" name="subject" className="form-control">
                                            <option value="na">Please select an option...</option>
                                            <option value="service">General Customer Service</option>
                                            <option value="suggestions">Suggestions</option>
                                            <option value="product">Product Support</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label >
                                            Message</label>
                                        <textarea name="message" id="message" className="form-control" rows={9} cols={25} required
                                            placeholder="Message"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary submit pull-right" id="btnContactUs">
                                        Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }

}