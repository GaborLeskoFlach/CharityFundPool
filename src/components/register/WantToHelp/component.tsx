import * as React from 'react';
import * as RegistrationFields from '../formFields';
import { Constants } from '../../constants';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { MultiSelectComponent } from '../../common/multiselect/component';
import { RegisterWantToHelpController } from './controller';

import { IRegistrationWantToHelp, IMultiSelect, DataFilter, IRouteParams_Registrations } from '../../interfaces';
import { convertData, convertFromObservable } from '../../../utils/utils';

import { Link } from 'react-router';

import './styles.css';

interface IRegisterWantToHelpComponent{
    params : IRouteParams_Registrations;
    history : any;
}

@observer
export class RegisterWantToHelpComponent extends React.Component<IRegisterWantToHelpComponent,{}>{
    controller : RegisterWantToHelpController;
    requestURL_ID : string;

    constructor(props){
        super(props);

        this.controller = new RegisterWantToHelpController();

        //check URL Query
        if(this.props.params){
            this.requestURL_ID = this.props.params.ID;
        }

        this.handleChange = this.handleChange.bind(this);   
    }

    componentWillMount(){
        this.controller.isLoading = true;    
        this.controller.getTradeOptions().then(response => {
            if(this.requestURL_ID){
                this.controller.getRegistrationByID(this.requestURL_ID).then(response => {                    
                    this.controller.isLoading = false;
                });
                
            }else{
                this.controller.isLoading = false;
            }
        });
    }
    
    resolveRefValue(element : React.ReactInstance) : string{
        if(element !== undefined){
           return (element as HTMLInputElement).value;
        }else{
            return '';
        }
    }

    register(event:React.FormEvent){
        event.preventDefault();
        this.controller.addNewRegistrationWantToHelp().then(response => {            
            browserHistory.push('/confirm');
        });    
    }

    handleTradeSelection(value : boolean){
       this.controller.hasTrade = value;
    }

    onTradeSelectionHasChanged = (obj : Array<IMultiSelect>) => {     
        this.controller.setCurrentTradeOptions(obj);
    }

    handleChange(event : any){
        switch(event.target.id)
        {
            case RegistrationFields.email:   
                this.controller.registerWantToHelp.email = event.target.value;
                break;
            case RegistrationFields.fullName:
                this.controller.registerWantToHelp.fullName = event.target.value;
                break;
            case RegistrationFields.phoneNo:
                this.controller.registerWantToHelp.phoneNo = event.target.value;
                break;
            case RegistrationFields.citySuburb:
                this.controller.registerWantToHelp.citySuburb = event.target.value;
                break;
            case RegistrationFields.postCode:
                this.controller.registerWantToHelp.postCode = event.target.value;
                break;
            case RegistrationFields.limitations:
                this.controller.registerWantToHelp.limitations = event.target.value;
                break;
            case RegistrationFields.hasTradeYes:
                this.controller.hasTrade = true;
                this.controller.registerWantToHelp.hasTrade = true;
                break;
            case RegistrationFields.hasTradeNo:
                this.controller.hasTrade = false;
                this.controller.registerWantToHelp.hasTrade = false;            
        }
    }

    render(){
        let styleTemporary : React.CSSProperties = { color: "black" };
        let btnFloatRight : React.CSSProperties = { float : 'right'}

        if(this.controller.isLoading)
        {
            return ( 
                <div className="container">
                    <div className="section-title">
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        }else{
            return (        
                <div className="container">
                    <div className="section-title">
                        <h1>Register (I want to help)</h1>
                        <h3>Fill in the form below and wait for a CFP consultant to contact you to arrange a visit and allocate membership number</h3>                 
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="contact-form">
                                <form ref="donationRegistrationForm" onSubmit={this.register.bind(this)}>

                                    <div className="form-group">
                                        <label htmlFor="fullName">Name</label>
                                        <input 
                                            className="form-control" 
                                            id="fullName" 
                                            type="text" 
                                            ref="fullName" 
                                            placeholder="Full Name" 
                                            onChange={this.handleChange}
                                            value={this.controller.registerWantToHelp.fullName}/>                         
                                    </div>                             

                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input 
                                            className="form-control" 
                                            id="email" 
                                            type="text" 
                                            ref="email" 
                                            placeholder="Email"
                                            onChange={this.handleChange}
                                            value={this.controller.registerWantToHelp.email}/>                         
                                    </div>     

                                    <div className="form-group">
                                        <label htmlFor="phoneNo">Phone No</label>
                                        <input 
                                            className="form-control" 
                                            id="phoneNo" 
                                            type="text" 
                                            ref="phoneNo" 
                                            placeholder="Phone no" 
                                            onChange={this.handleChange}
                                            value={this.controller.registerWantToHelp.phoneNo}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="citySuburb">City</label>
                                        <input 
                                            className="form-control"
                                            id="citySuburb" 
                                            type="text" 
                                            ref="citySuburb" 
                                            placeholder="City/Suburb" 
                                            onChange={this.handleChange}
                                            value={this.controller.registerWantToHelp.citySuburb}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="postCode">Postcode</label>
                                        <input 
                                            className="form-control" 
                                            id="postCode" 
                                            type="text" 
                                            ref="postCode" 
                                            placeholder="Postcode" 
                                            onChange={this.handleChange}
                                            value={this.controller.registerWantToHelp.postCode} />
                                    </div>           

                                    <div className="form-group">
                                        <label htmlFor="limitations">Limitations</label>
                                        <div>
                                            <select className="form-control" ref="limitations" id="limitations" onChange={this.handleChange} value={this.controller.registerWantToHelp.limitations} >
                                                <option value="">Please select an option...</option>
                                                <option value="lightDutyWork">Light duty work</option>
                                                <option value="mediumDutyWork">Medium duty work</option>
                                                <option value="heavyDutyWork">Heavy duty work</option>
                                            </select>
                                        </div>     
                                    </div>

                                    <div className="form-group" onChange={this.handleChange}>
                                        <label htmlFor="hasTrade" ref="hasTrade">Do you have trade/trades: </label>
                                        <label className="radio-inline"><input type="radio" name="optradio" id="hasTradeYes"  checked={this.controller.registerWantToHelp.hasTrade == true} />Yes</label>
                                        <label className="radio-inline"><input type="radio" name="optradio" id="hasTradeNo"   checked={this.controller.registerWantToHelp.hasTrade == false}/>No</label>                                            
                                    </div>

                                    { this.controller.hasTrade || this.controller.registerWantToHelp.hasTrade ? 
                                        <div className="form-group">
                                            <label htmlFor="listOfTrades">List options:</label>
                                            <MultiSelectComponent defaultData={convertData(this.controller.tradeOptions,DataFilter.All)} userSetOptions={this.controller.registerWantToHelp.listOfTrades} onChange={this.onTradeSelectionHasChanged}/>
                                        </div>

                                    :
                                        null
                                    }

                                    {/*
                                    <div className="form-group">
                                        <label htmlFor="imageUpload">Add photo</label>
                                        <div>
                                            <p>
                                                Proof of ID - 
                                                (option - a) send photo of drivers licence or passport *any ID with photo* to CFP for verification we reply with a registration number 
                                                (option - b) arrange to visit a CFP consultant at a designated place or c) arrange for a CFP consultant to visit you)                                        
                                            </p>
                                        </div>
                                        <div id="imageUpload">
                                            <ImageUpload />
                                        </div>
                                    </div>
                                    */}

                                    <button className="btn btn-default" type="submit">{this.controller.submitBtnCaption}</button>
                                    <button style={btnFloatRight} className="btn btn-secondary" type="submit">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>           
                            
                </div>          
            )
        }
    }
  
}
