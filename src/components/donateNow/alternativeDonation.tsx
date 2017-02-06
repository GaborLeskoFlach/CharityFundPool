import * as React from 'react';

import './styles.css';

export class AlternativeDonation extends React.Component<{},{}>{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="donate-section">
                    <div className="container">
                        <div className="donate-section padding">
                            <div className="row section-title">
                                <div className="col-sm-8 col-sm-offset-2">
                                    <h1>Donate Now</h1>
                                    <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Praesent sapien massa, convallis a pellen tesque nec, egestas non nisi. Mauris blandit aliquet elit, eget tincidunt ni dictum porta.</p>
                                </div>
                            </div>				
                            <div className="donate-tab text-center">
                                <form id="donate" method="post" action="#">
                                    <ul className="tab-list list-inline" role="tablist">
                                        <li className="active"><a href="#onetime" role="tab" data-toggle="tab">One time</a></li>
                                        <li><a href="#monthly" role="tab" data-toggle="tab">Monthly Recurring </a></li>
                                        <li><a href="#gift" role="tab" data-toggle="tab">For Gift</a></li>
                                    </ul>
                                    <fieldset className="tab-content">
                                        <div className="tab-pane fade in active" id="onetime">
                                            <ul className="fancy-label row">
                                                <li className="col-sm-3">
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
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
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
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
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
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
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
                                                            <div className="amount">
                                                                <input autocomplete="off" id="amount" name="" placeholder="Enter Amount" size={30} type="text" aria-invalid="false" />
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
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
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
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
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
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
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
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
                                                            <div className="amount">
                                                                <input autocomplete="off" id="amount" name="" placeholder="Enter Amount" size={30} type="text" aria-invalid="false" />
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
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
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
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
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
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
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
                                                    <div className="payment-select">
                                                        <input type="radio" name="" value="" />
                                                        <label for="">
                                                            <div className="amount">
                                                                <input autocomplete="off" id="amount" name="" placeholder="Enter Amount" size={30} type="text" aria-invalid="false" />
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
                                                <img className="img-resposive" src="images/payment-method/visa.png" alt="" />
                                            </li>
                                            <li>
                                                <img className="img-resposive" src="images/payment-method/master-card.png" alt="" />
                                            </li>
                                            <li>
                                                <img className="img-resposive" src="images/payment-method/paypal.png" alt="" />
                                            </li>
                                            <li>
                                                <img className="img-resposive" src="images/payment-method/western.png" alt="" />
                                            </li>
                                            <li>
                                                <img className="img-resposive" src="images/payment-method/amarican.png" alt="" />
                                            </li>
                                            <li>
                                                <img className="img-resposive" src="images/payment-method/skrill.png" alt="" />
                                            </li>
                                            <li>
                                                <img className="img-resposive" src="images/payment-method/other.png" alt="" />
                                            </li>
                                        </ul>
                                    </fieldset>
                                    <button type="submit" className="btn btn-primary submit">Donate</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}