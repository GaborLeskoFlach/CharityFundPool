import * as React from 'react';
import * as DonationFields from './formFields';

export interface IDonateNowComponentProps{
    addDonation : (donation : IDonation) => void;
}

interface IDonation{
    name : string;
    price : string;
    status : string;
    desc : string;
}

export class DonateNowComponent extends React.Component<IDonateNowComponentProps,{}>{

    constructor(props){
        super(props);
    }

    addDonation(event:any) {
        // 1. Stop the form from submitting
        event.preventDefault();
        // 2. Take the data from the form and create an object
        let donation : IDonation = {
            name : (this.refs[DonationFields.name] as HTMLInputElement).value,
            price : (this.refs[DonationFields.price] as HTMLInputElement).value,
            status : (this.refs[DonationFields.status] as HTMLInputElement).value,
            desc : (this.refs[DonationFields.desc] as HTMLInputElement).value,            
        }

        // 3. Add the fish to the App State
        this.props.addDonation(donation);
        (this.refs[DonationFields.donationForm] as HTMLFormElement).reset();   
             
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
                        <form ref="fishForm" onSubmit={this.addDonation.bind(this)}>
                            
                            <div className="form-group">
                                <label htmlFor="fishName">Fish Name</label>
                                <input className="form-control" id="fishName" type="text" ref="name" placeholder="Fish Name"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="fishPrice">Fish Price</label>
                                <input className="form-control" id="fishPrice" type="text" ref="price" placeholder="Fish Price" />
                            </div>


                            <select className="form-control" ref="status">
                                <option value="available">Fresh!</option>
                                <option value="unavailable">Sold Out!</option>
                            </select>


                            <textarea className="form-control" type="text" ref="desc" placeholder="Desc"></textarea>

                            <button className="btn btn-primary" type="submit">Donate</button>
                        </form>
					</div>
				</div>
			</div>
		</div>




    )
  }

}