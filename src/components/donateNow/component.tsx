import * as React from 'react';
import * as DonationFields from './formFields';
import { Router } from 'react-router';
 
interface IDonation{
    firstName : string;
    lastName : string;
    amountToDonate : string;   
    desc : string;
}

interface IDonateNowComponentProps{
    history : any;
}

export class DonateNowComponent extends React.Component<IDonateNowComponentProps,{}>{

    constructor(props){
        super(props);
    }

    addDonation(event:React.FormEvent) {
        
        // 1. Stop the form from submitting
        event.preventDefault();
        
        // 2. Take the data from the form and create an object
        let donation : IDonation = {
            firstName : (this.refs[DonationFields.firstName] as HTMLInputElement).value,
            lastName : (this.refs[DonationFields.lastName] as HTMLInputElement).value,
            amountToDonate : (this.refs[DonationFields.amountToDonate] as HTMLInputElement).value,            
            desc : (this.refs[DonationFields.desc] as HTMLInputElement).value   
        };

        //Save into DB?
        (this.refs[DonationFields.donationForm] as HTMLFormElement).reset();      

        //var transitionTo = Router.transitionTo;
        //transitionTo('your_route_name', query={keyword: input_value});  

        this.props.history.push('/');        
    }

  render() {

      console.log('rending');

    return (
		<div className="container">
			<div className="section-title">
				<h1>Contact Us</h1>
			</div>
			<div className="row">
				<div className="col-sm-10 col-sm-offset-1">
					<div className="contact-form">
                        <form ref="donationForm" onSubmit={this.addDonation.bind(this)}>
                            
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input className="form-control" id="firstName" type="text" ref="firstName" placeholder="First Name"/>
                            </div>

                          <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input className="form-control" id="lastName" type="text" ref="lastName" placeholder="Last Name"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="amountToDonate">Amount to donate</label>
                                <input className="form-control" id="amountToDonate" type="text" ref="amountToDonate" placeholder="amount" />
                            </div>

                            <div className="form-group">
                                <textarea className="form-control" type="text" ref="desc" placeholder="Desc"></textarea>
                            </div>

                            <button className="btn btn-primary" type="submit">Donate</button>
                        </form>
					</div>
				</div>
			</div>
		</div>
    )
  }
}