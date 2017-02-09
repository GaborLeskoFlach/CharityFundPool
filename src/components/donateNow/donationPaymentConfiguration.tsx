import * as React from 'react';

import './styles.css';

interface IDonationPaymentConfiguration {

}

export class DonationPaymentConfiguration extends React.Component<IDonationPaymentConfiguration,{}>{

    constructor(props){
        super(props);
    }

    handlePaymentSelect = (event) => {
        //TODO add class 'active' to current element so it gets highlighted
        console.log('Clicked this => {0}', event.target);
    }

    render(){
        return(
            <div id="donate-section">
                    <div className="container">
                        <div className="donate-section padding">				
                            <div className="donate-tab text-center">
                                <div id="donate">
                                    <ul className="tab-list list-inline" role="tablist">
                                        <li className="active"><a href="#onetime" role="tab" data-toggle="tab">One time</a></li>
                                        <li><a href="#monthly" role="tab" data-toggle="tab">Monthly Recurring </a></li>
                                        <li><a href="#gift" role="tab" data-toggle="tab">For Gift</a></li>
                                    </ul>
                                    <fieldset className="tab-content">
                                        <div className="tab-pane fade in active" id="onetime">
                                            <ul className="fancy-label row">
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <span>$50</span>
                                                            </div>
                                                            <div className="description">
                                                                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <span>$100</span>
                                                            </div>
                                                            <div className="description">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <span>$200</span>
                                                            </div>
                                                            <div className="description">
                                                                <p>Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <input id="amount" name="" placeholder="Enter Amount" size={30} type="text" aria-invalid="false" />
                                                            </div>
                                                            <div className="description">
                                                                <h4>Other Amount</h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade " id="monthly">								
                                            <ul className="fancy-label row">
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <span>$10</span>
                                                            </div>
                                                            <div className="description">
                                                                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <span>$20</span>
                                                            </div>
                                                            <div className="description">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <span>$30</span>
                                                            </div>
                                                            <div className="description">
                                                                <p>Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <input  id="amount" name="" placeholder="Enter Amount" size={30} type="text" aria-invalid="false" />
                                                            </div>
                                                            <div className="description">
                                                                <h4>Other Amount</h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade " id="gift">
                                            <ul className="fancy-label row">
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <span>$200</span>
                                                            </div>
                                                            <div className="description">
                                                                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <span>$300</span>
                                                            </div>
                                                            <div className="description">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <span>$400</span>
                                                            </div>
                                                            <div className="description">
                                                                <p>Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="payment-select" onClick={this.handlePaymentSelect}>
                                                        <input type="radio" name="" value="" />
                                                        <label >
                                                            <div className="amount">
                                                                <input  id="amount" name="" placeholder="Enter Amount" size={30} type="text" aria-invalid="false" />
                                                            </div>
                                                            <div className="description">
                                                                <h4>Other Amount</h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </fieldset>
                                    <fieldset className="payment-method">
                                        <p>Donate using a credit card, PayPal, or Other Option.</p>							
                                        <ul className="list-inline">
                                            <li>
                                                <img className="img-resposive" src="../../../templates/images/donation-bg/visa.png" alt="" />
                                            </li>
                                            <li>
                                                <img className="img-resposive" src="../../../templates/images/donation-bg/master-card.png" alt="" />
                                            </li>
                                            <li>
                                                <img className="img-resposive" src="../../../templates/images/donation-bg/paypal.png" alt="" />
                                            </li>
                                            <li>
                                                <img className="img-resposive" src="../../../templates/images/donation-bg/amarican.png" alt="" />
                                            </li>
                                        </ul>
                                    </fieldset>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}