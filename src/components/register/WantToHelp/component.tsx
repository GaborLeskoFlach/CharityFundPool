import * as React from 'react';
import * as RegistrationFields from '../formFields';
import { Constants } from '../../constants';
import { browserHistory } from 'react-router';
import {observer} from 'mobx-react';

import { map } from 'lodash';
import { toJS } from 'mobx';

import { RegisterWantToHelpController } from './controller';
import { MultiSelectComponent } from '../../common/multiselect/component';

import { IRegistrationWantToHelp, IMultiSelect } from '../../interfaces';

import { Link } from 'react-router';

import './styles.css';

interface IRouteParams{
    requestType : string;
}

interface IRegisterWantToHelpComponent{
    params : IRouteParams;
    history : any;
}

@observer
export class RegisterWantToHelpComponent extends React.Component<IRegisterWantToHelpComponent,{}>{
    controller : RegisterWantToHelpController;
    _tradeOptions : Array<IMultiSelect> = [];
    
    constructor(props){
        super(props);

        this.controller = new RegisterWantToHelpController();
    }

    componentWillMount(){        
        this.controller.getTradeOptions().then(response => {
            this._tradeOptions = response;
        });
    }
    
    convertData = (dataToConvert : Array<IMultiSelect>) : Array<IMultiSelect> => {
        let returnData : Array<IMultiSelect> = [];
                
        map(toJS(dataToConvert), (data : IMultiSelect, key) => (
            returnData.push(data)
        ));

        return returnData;
    }

    resolveRefValue(element : React.ReactInstance) : string{
        if(element !== undefined){
           return (element as HTMLInputElement).value;
        }else{
            return '';
        }
    }

    register(event:React.FormEvent){

        // 1. Stop the form from submitting
        event.preventDefault();

        let registration : IRegistrationWantToHelp = {
            ID : null,
            active : true,          
            fullName : this.resolveRefValue((this.refs[RegistrationFields.fullName])),
            phoneNo : this.resolveRefValue((this.refs[RegistrationFields.phoneNo])),
            email : this.resolveRefValue((this.refs[RegistrationFields.email])),
            citySuburb : this.resolveRefValue((this.refs[RegistrationFields.citySuburb] as HTMLInputElement)),
            postCode : this.resolveRefValue((this.refs[RegistrationFields.postCode] as HTMLInputElement)),

            limitations : this.resolveRefValue((this.refs[RegistrationFields.limitations])),
            hasTrade : this.controller.hasTrade.toString(),

            listOfTrades : toJS(this.controller.getCurrentTradeOptions())

        };
        
        this.controller.addNewRegistrationWantToHelp(registration).then(response => {            
            browserHistory.push('/confirm');
        });    
    }

    handleTradeSelection(value : boolean){
       
       this.controller.hasTrade = value;
    }

    onTradeSelectionHasChanged = (obj : any) => {        
        this.controller.setCurrentTradeOptions(obj.value);
    }


    render(){
        let styleTemporary : React.CSSProperties = { color: "black" };

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
                                        <input className="form-control" id="fullName" type="text" ref="fullName" placeholder="Full Name"/>                         
                                    </div>                             

                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input className="form-control" id="email" type="text" ref="email" placeholder="Email"/>                         
                                    </div>     

                                    <div className="form-group">
                                        <label htmlFor="phoneNo">Phone No</label>
                                        <input className="form-control" id="phoneNo" type="text" ref="phoneNo" placeholder="Phone no" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="citySuburb">City</label>
                                        <input className="form-control" id="citySuburb" type="text" ref="citySuburb" placeholder="City/Suburb" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="postCode">Postcode</label>
                                        <input className="form-control" id="postCode" type="text" ref="postCode" placeholder="Postcode" />
                                    </div>           

                                    <div className="form-group">
                                        <label htmlFor="limitations">Limitations</label>
                                        <div>
                                            <select className="form-control" ref="limitations" id="limitations" >
                                                <option value="undefined">Please select a value...</option>
                                                <option value="lightDutyWork">Light duty work</option>
                                                <option value="mediumDutyWork">Medium duty work</option>
                                                <option value="heavyDutyWork">Heavy duty work</option>
                                            </select>
                                        </div>     
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="hasTrade" ref="hasTrade">Do you have trade/trades: </label>
                                        <label className="radio-inline"><input type="radio" name="optradio" onClick={this.handleTradeSelection.bind(this, true)} />Yes</label>
                                        <label className="radio-inline"><input type="radio" name="optradio" defaultChecked onClick={this.handleTradeSelection.bind(this, false)} />No</label>                                            
                                    </div>

                                    { this.controller.hasTrade ? 
                                        <div className="form-group">
                                            <label htmlFor="listOfTrades">List options:</label>
                                            <MultiSelectComponent data={this.convertData(this._tradeOptions)} onChange={this.onTradeSelectionHasChanged}/>
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

                                    <button className="btn btn-primary" type="submit">Save</button>
                                    <button className="btn btn-secondary" type="submit">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>           
                            
                </div>          
            )
        }
    }
  
}
