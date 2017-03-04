import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './styles.css';

interface IDonationPaymentConfiguration {
    paymentTabConfigState : (configState : IPaymentSelect[]) => void;
}

export interface IPaymentSelect{
    optionOne : string;
    optionTwo : string;
    optionThree : string;
    optionOther : string;
}

@observer
export class DonationPaymentConfiguration extends React.Component<IDonationPaymentConfiguration,{}>{
    @observable paymentSelectionConfig : IPaymentSelect[];
    @observable tabIndex : number = 0;

    constructor(props){
        super(props);

        this.paymentSelectionConfig = [
            {
                optionOne : ' active',
                optionTwo : '',
                optionThree : '',
                optionOther : ''
            },
            {
                optionOne : ' active',
                optionTwo : '',
                optionThree : '',
                optionOther : ''
            },
            {
                optionOne : ' active',
                optionTwo : '',
                optionThree : '',
                optionOther : ''
            }
        ]
    }
    
    updatePaymentTabConfigState = () => {
        this.props.paymentTabConfigState(this.paymentSelectionConfig);
    }

    getPaymentSelectionConfig = (target : string) => {
        let classToReturn : string;
        switch(target){
            case 'optionOne':
                classToReturn = ('payment-select ' + this.paymentSelectionConfig[this.tabIndex].optionOne);
                break;
            case 'optionTwo':
                classToReturn = ('payment-select ' + this.paymentSelectionConfig[this.tabIndex].optionTwo);
                break;
            case 'optionThree':
                classToReturn = ('payment-select ' + this.paymentSelectionConfig[this.tabIndex].optionThree);
                break;
            case 'optionOther':
                classToReturn = ('payment-select ' + this.paymentSelectionConfig[this.tabIndex].optionOther);
                break;
        }

        this.updatePaymentTabConfigState();

        return classToReturn;
    }

    handlePaymentSelect = (event) => {
        switch(event.currentTarget.id)
        {
            case 'optionOne':
                this.paymentSelectionConfig[this.tabIndex].optionOne = 'active';
                this.paymentSelectionConfig[this.tabIndex].optionTwo = '';
                this.paymentSelectionConfig[this.tabIndex].optionThree = '';
                this.paymentSelectionConfig[this.tabIndex].optionOther = '';
                break;   
            case 'optionTwo':
                this.paymentSelectionConfig[this.tabIndex].optionOne = '';
                this.paymentSelectionConfig[this.tabIndex].optionTwo = 'active';
                this.paymentSelectionConfig[this.tabIndex].optionThree = '';
                this.paymentSelectionConfig[this.tabIndex].optionOther = '';
                break;
            case 'optionThree':
                this.paymentSelectionConfig[this.tabIndex].optionOne = '';
                this.paymentSelectionConfig[this.tabIndex].optionTwo = '';
                this.paymentSelectionConfig[this.tabIndex].optionThree = 'active';
                this.paymentSelectionConfig[this.tabIndex].optionOther = '';
                break;
            case 'optionOther':
                this.paymentSelectionConfig[this.tabIndex].optionOne = '';
                this.paymentSelectionConfig[this.tabIndex].optionTwo = '';
                this.paymentSelectionConfig[this.tabIndex].optionThree = '';
                this.paymentSelectionConfig[this.tabIndex].optionOther = 'active';
                break;
        }
        this.updatePaymentTabConfigState();       
    }

    tabSelectionChange = (event) => {
        this.tabIndex = parseInt(event.target.id);
        this.updatePaymentTabConfigState();
    }

    render(){

        return(
            <div id="donate-section">
                    <div className="container">
                        <div className="donate-section padding">				
                            <div className="donate-tab text-center">
                                <div id="donate">
                                    <ul className="tab-list list-inline" role="tablist" onClick={this.tabSelectionChange} >
                                        <li className="active"><a id="0" href="#onetime" role="tab" data-toggle="tab">One time</a></li>
                                        <li><a id="1" href="#monthly" role="tab" data-toggle="tab">Monthly Recurring </a></li>
                                        <li><a id="2" href="#gift" role="tab" data-toggle="tab">For Gift</a></li>
                                    </ul>
                                    <fieldset className="tab-content">
                                        <div className="tab-pane fade in active" id="onetime">
                                            <ul className="fancy-label row">
                                                <li className="col-sm-3">
                                                    <div id='optionOne' className={this.getPaymentSelectionConfig('optionOne')} onClick={this.handlePaymentSelect}>
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
                                                    <div id='optionTwo' className={this.getPaymentSelectionConfig('optionTwo')} onClick={this.handlePaymentSelect}>
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
                                                    <div id='optionThree' className={this.getPaymentSelectionConfig('optionThree')} onClick={this.handlePaymentSelect}>
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
                                                    <div id='optionOther' className={this.getPaymentSelectionConfig('optionOther')} onClick={this.handlePaymentSelect}>
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
                                                    <div id='optionOne' className={this.getPaymentSelectionConfig('optionOne')} onClick={this.handlePaymentSelect}>
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
                                                    <div id='optionTwo' className={this.getPaymentSelectionConfig('optionTwo')} onClick={this.handlePaymentSelect}>
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
                                                    <div id='optionThree' className={this.getPaymentSelectionConfig('optionThree')} onClick={this.handlePaymentSelect}>
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
                                                    <div id='optionOther' className={this.getPaymentSelectionConfig('optionOther')} onClick={this.handlePaymentSelect}>
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
                                                    <div id='optionOne' className={this.getPaymentSelectionConfig('optionOne')} onClick={this.handlePaymentSelect}>
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
                                                    <div id='optionTwo' className={this.getPaymentSelectionConfig('optionTwo')} onClick={this.handlePaymentSelect}>
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
                                                    <div id='optionThree' className={this.getPaymentSelectionConfig('optionThree')} onClick={this.handlePaymentSelect}>
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
                                                    <div id='optionOther' className={this.getPaymentSelectionConfig('optionOther')} onClick={this.handlePaymentSelect}>
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