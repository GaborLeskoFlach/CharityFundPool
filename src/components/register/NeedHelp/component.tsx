import * as React from 'react';
import * as RegistrationFields from '../formFields';
import { Constants } from '../../constants';
import { browserHistory } from 'react-router';
import {observer} from 'mobx-react';
import { map } from 'lodash';

import { RegisterNeedHelpController } from './controller';
import { CauseCreateComponent } from '../../causes/addNewCause/component';

import { ImageUpload } from '../../imageUpload/component';
const Calendar =  require('react-input-calendar').default;
import { Link } from 'react-router';

import './styles.css';

import SingleDate from '../../common/dateComponents/singleDate';
import DateRange from '../../common/dateComponents/dateRange';

import { MultiSelectComponent } from '../../common/multiselect/component';

import { IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg, IRegistrationWantToHelp, IWhatWeNeed, IWhatINeedHelpWith } from '../../interfaces';

interface IRouteParams{
    requestType : string;
}


interface IRegisterNeedHelpComponentProps{
    params : IRouteParams;
    history : any;
}

@observer
export class RegisterNeedHelpComponent extends React.Component<IRegisterNeedHelpComponentProps,{}>{
    controller : RegisterNeedHelpController;
    //whatWeNeed : Array<IWhatWeNeed>;
    whatINeedHelpWith : Array<IWhatINeedHelpWith>;

    constructor(props){
        super(props);

        this.controller = new RegisterNeedHelpController();
    }

    componentWillMount(){
        this.controller.isLoading = true;
        this.controller.getWhatINeedHelpWith().then(response => {
            this.whatINeedHelpWith = response;
            this.controller.isLoading = false;
        })                     
    }

    resolveRefValue(element : React.ReactInstance) : string{
        if(element !== undefined){
           return (element as HTMLInputElement).value;
        }else{
            return '';
        }
    }

    register = (event:React.FormEvent) => {
        switch(this.controller.registrationType){
            case "Individual":
                this.registerIndividual(event);
                break;
            case "Org":
                this.registerOrganisation(event);
                break;
        }
    }

    registerIndividual = (event:React.FormEvent) => {

        // 1. Stop the form from submitting
        event.preventDefault();

        // 2. Take the data from the form and create an object
        let registration : IRegistrationNeedHelpInd = {
            ID:null,
            active : true,
            uid:null,
            registrationType : (this.refs[RegistrationFields.registrationType] as HTMLInputElement).value,
            
            fullName : this.resolveRefValue((this.refs[RegistrationFields.fullName])),
            phoneNo : this.resolveRefValue((this.refs[RegistrationFields.phoneNo])),
            email : this.resolveRefValue((this.refs[RegistrationFields.email])),
            whatINeedHelpWith : this.resolveRefValue((this.refs[RegistrationFields.whatINeedHelpWith])),     
            
            country: this.resolveRefValue((this.refs[RegistrationFields.country] as HTMLInputElement)),
            addressLine1: this.resolveRefValue((this.refs[RegistrationFields.addressLine1] as HTMLInputElement)),
            addressLine2: this.resolveRefValue((this.refs[RegistrationFields.addressLine2] as HTMLInputElement)),
            citySuburb : this.resolveRefValue((this.refs[RegistrationFields.citySuburb] as HTMLInputElement)),
            postCode : this.resolveRefValue((this.refs[RegistrationFields.postCode] as HTMLInputElement))
        };


        //Save into DB?

        this.controller.addNewRegistrationNeedHelpInd(registration).then(response => {
            (this.refs[RegistrationFields.registrationForm] as HTMLFormElement).reset();      
            browserHistory.push('/confirm');
        });
    }

    registerOrganisation = (event:React.FormEvent) => {

        // 1. Stop the form from submitting
        event.preventDefault();

        // 2. Take the data from the form and create an object
        let registration : IRegistrationNeedHelpOrg = {
            ID : null,
            active : true,
            uid:null,
            registrationType : (this.refs[RegistrationFields.registrationType] as HTMLInputElement).value,
            
            charityName : this.resolveRefValue((this.refs[RegistrationFields.charityName])),
            fullName : this.resolveRefValue((this.refs[RegistrationFields.fullName])),
            phoneNo : this.resolveRefValue((this.refs[RegistrationFields.phoneNo])),
            email : this.resolveRefValue((this.refs[RegistrationFields.email])),

            websiteLink : this.resolveRefValue((this.refs[RegistrationFields.websiteLink])),
            whatWeDo : this.resolveRefValue((this.refs[RegistrationFields.whatWeDo])),            
            whatWeNeed : this.resolveRefValue((this.refs[RegistrationFields.whatWeNeed]))            
        };


        //Save into DB?

        this.controller.addNewRegistrationNeedHelpOrg(registration).then(response => {
            (this.refs[RegistrationFields.registrationForm] as HTMLFormElement).reset();      
            browserHistory.push('/confirm');
        });
    }


    handleRegistrationTypeChange = (e) => {
        this.controller.setRegistrationType(e.target.value);
    }

    render(){

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

            return(
                <div className="container">
                    <div className="section-title">
                        <h1>Register (I need help)</h1>
                        <h3>Fill in the form below and wait for a CFP consultant to contact you to arrange a visit and allocate membership number</h3>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="contact-form">
                                <form ref="registrationForm" onSubmit={this.register.bind(this)}>

                                    <div className="form-group">
                                        <label htmlFor="registrationTion">Registration Type</label>
                                        <div>
                                            <select className="form-control" ref="registrationType" id="registrationType" 
                                                    defaultValue={this.controller.registrationType}                                                     
                                                    onChange={this.handleRegistrationTypeChange.bind(this)}>                                                
                                                <option value="Org">I need help for my charity</option>
                                                <option value="Individual">I need help for myself</option>
                                            </select>
                                        </div>                                
                                    </div>

                                    {this.controller.registrationType === 'Org' ? 
                                        <div className="form-group">
                                            <label htmlFor="charityName">Charity Name</label>
                                            <input className="form-control" id="charityName" type="text" ref="charityName" placeholder="Charity Name"/>
                                        </div>
                                        :
                                        null
                                    }

                                    <div className="form-group">
                                        <label htmlFor="fullName">Your Name</label>
                                        <input className="form-control" id="fullName" type="text" ref="fullName" placeholder="Full Name"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneNo">Phone No</label>
                                        <input className="form-control" id="phoneNo" type="text" ref="phoneNo" placeholder="Phone no" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control" id="email" type="text" ref="email" placeholder="Email" />
                                    </div>

                                    {this.controller.registrationType === 'Org' ? 
                                        <div>
                                            <div className="form-group">
                                                <label htmlFor="websiteLink">Website Link</label>
                                                <input className="form-control" id="websiteLink" type="text" ref="websiteLink" placeholder="Website Link" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="whatWeDo">What we do</label>
                                                <textarea className="form-control" ref="whatWeDo" rows={5} id="whatWeDo"></textarea>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="whatWeNeed">What we need</label>
                                                <div>
                                                    <CauseCreateComponent  />
                                                </div>     
                                            </div>
                                        </div>
                                    :
                                        null
                                    }

                                    {this.controller.registrationType === 'Individual' ?
                                        <div>

                                            <div>
                                                <div className="form-group">
                                                    <label htmlFor="country">Country</label>
                                                    <div>
                                                        <select ref="country" className="form-control" id="country" defaultValue="Australia" >
                                                            <option value="Afganistan">Afghanistan</option>
                                                            <option value="Albania">Albania</option>
                                                            <option value="Algeria">Algeria</option>
                                                            <option value="American Samoa">American Samoa</option>
                                                            <option value="Andorra">Andorra</option>
                                                            <option value="Angola">Angola</option>
                                                            <option value="Anguilla">Anguilla</option>
                                                            <option value="Argentina">Argentina</option>
                                                            <option value="Armenia">Armenia</option>
                                                            <option value="Aruba">Aruba</option>
                                                            <option defaultValue="Australia">Australia</option>
                                                            <option value="Austria">Austria</option>
                                                            <option value="Azerbaijan">Azerbaijan</option>
                                                            <option value="Bahamas">Bahamas</option>
                                                            <option value="Bahrain">Bahrain</option>
                                                            <option value="Bangladesh">Bangladesh</option>
                                                            <option value="Barbados">Barbados</option>
                                                            <option value="Belarus">Belarus</option>
                                                            <option value="Belgium">Belgium</option>
                                                            <option value="Belize">Belize</option>
                                                            <option value="Benin">Benin</option>
                                                            <option value="Bermuda">Bermuda</option>
                                                            <option value="Bhutan">Bhutan</option>
                                                            <option value="Bolivia">Bolivia</option>
                                                            <option value="Bonaire">Bonaire</option>
                                                            <option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</option>
                                                            <option value="Botswana">Botswana</option>
                                                            <option value="Brazil">Brazil</option>
                                                            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                                            <option value="Brunei">Brunei</option>
                                                            <option value="Bulgaria">Bulgaria</option>
                                                            <option value="Burkina Faso">Burkina Faso</option>
                                                            <option value="Burundi">Burundi</option>
                                                            <option value="Cambodia">Cambodia</option>
                                                            <option value="Cameroon">Cameroon</option>
                                                            <option value="Canada">Canada</option>
                                                            <option value="Canary Islands">Canary Islands</option>
                                                            <option value="Cape Verde">Cape Verde</option>
                                                            <option value="Cayman Islands">Cayman Islands</option>
                                                            <option value="Central African Republic">Central African Republic</option>
                                                            <option value="Chad">Chad</option>
                                                            <option value="Channel Islands">Channel Islands</option>
                                                            <option value="Chile">Chile</option>
                                                            <option value="China">China</option>
                                                            <option value="Christmas Island">Christmas Island</option>
                                                            <option value="Cocos Island">Cocos Island</option>
                                                            <option value="Colombia">Colombia</option>
                                                            <option value="Comoros">Comoros</option>
                                                            <option value="Congo">Congo</option>
                                                            <option value="Cook Islands">Cook Islands</option>
                                                            <option value="Costa Rica">Costa Rica</option>
                                                            <option value="Cote DIvoire">Cote D'Ivoire</option>
                                                            <option value="Croatia">Croatia</option>
                                                            <option value="Cuba">Cuba</option>
                                                            <option value="Curaco">Curacao</option>
                                                            <option value="Cyprus">Cyprus</option>
                                                            <option value="Czech Republic">Czech Republic</option>
                                                            <option value="Denmark">Denmark</option>
                                                            <option value="Djibouti">Djibouti</option>
                                                            <option value="Dominica">Dominica</option>
                                                            <option value="Dominican Republic">Dominican Republic</option>
                                                            <option value="East Timor">East Timor</option>
                                                            <option value="Ecuador">Ecuador</option>
                                                            <option value="Egypt">Egypt</option>
                                                            <option value="El Salvador">El Salvador</option>
                                                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                            <option value="Eritrea">Eritrea</option>
                                                            <option value="Estonia">Estonia</option>
                                                            <option value="Ethiopia">Ethiopia</option>
                                                            <option value="Falkland Islands">Falkland Islands</option>
                                                            <option value="Faroe Islands">Faroe Islands</option>
                                                            <option value="Fiji">Fiji</option>
                                                            <option value="Finland">Finland</option>
                                                            <option value="France">France</option>
                                                            <option value="French Guiana">French Guiana</option>
                                                            <option value="French Polynesia">French Polynesia</option>
                                                            <option value="French Southern Ter">French Southern Ter</option>
                                                            <option value="Gabon">Gabon</option>
                                                            <option value="Gambia">Gambia</option>
                                                            <option value="Georgia">Georgia</option>
                                                            <option value="Germany">Germany</option>
                                                            <option value="Ghana">Ghana</option>
                                                            <option value="Gibraltar">Gibraltar</option>
                                                            <option value="Great Britain">Great Britain</option>
                                                            <option value="Greece">Greece</option>
                                                            <option value="Greenland">Greenland</option>
                                                            <option value="Grenada">Grenada</option>
                                                            <option value="Guadeloupe">Guadeloupe</option>
                                                            <option value="Guam">Guam</option>
                                                            <option value="Guatemala">Guatemala</option>
                                                            <option value="Guinea">Guinea</option>
                                                            <option value="Guyana">Guyana</option>
                                                            <option value="Haiti">Haiti</option>
                                                            <option value="Hawaii">Hawaii</option>
                                                            <option value="Honduras">Honduras</option>
                                                            <option value="Hong Kong">Hong Kong</option>
                                                            <option value="Hungary">Hungary</option>
                                                            <option value="Iceland">Iceland</option>
                                                            <option value="India">India</option>
                                                            <option value="Indonesia">Indonesia</option>
                                                            <option value="Iran">Iran</option>
                                                            <option value="Iraq">Iraq</option>
                                                            <option value="Ireland">Ireland</option>
                                                            <option value="Isle of Man">Isle of Man</option>
                                                            <option value="Israel">Israel</option>
                                                            <option value="Italy">Italy</option>
                                                            <option value="Jamaica">Jamaica</option>
                                                            <option value="Japan">Japan</option>
                                                            <option value="Jordan">Jordan</option>
                                                            <option value="Kazakhstan">Kazakhstan</option>
                                                            <option value="Kenya">Kenya</option>
                                                            <option value="Kiribati">Kiribati</option>
                                                            <option value="Korea North">Korea North</option>
                                                            <option value="Korea Sout">Korea South</option>
                                                            <option value="Kuwait">Kuwait</option>
                                                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                            <option value="Laos">Laos</option>
                                                            <option value="Latvia">Latvia</option>
                                                            <option value="Lebanon">Lebanon</option>
                                                            <option value="Lesotho">Lesotho</option>
                                                            <option value="Liberia">Liberia</option>
                                                            <option value="Libya">Libya</option>
                                                            <option value="Liechtenstein">Liechtenstein</option>
                                                            <option value="Lithuania">Lithuania</option>
                                                            <option value="Luxembourg">Luxembourg</option>
                                                            <option value="Macau">Macau</option>
                                                            <option value="Macedonia">Macedonia</option>
                                                            <option value="Madagascar">Madagascar</option>
                                                            <option value="Malaysia">Malaysia</option>
                                                            <option value="Malawi">Malawi</option>
                                                            <option value="Maldives">Maldives</option>
                                                            <option value="Mali">Mali</option>
                                                            <option value="Malta">Malta</option>
                                                            <option value="Marshall Islands">Marshall Islands</option>
                                                            <option value="Martinique">Martinique</option>
                                                            <option value="Mauritania">Mauritania</option>
                                                            <option value="Mauritius">Mauritius</option>
                                                            <option value="Mayotte">Mayotte</option>
                                                            <option value="Mexico">Mexico</option>
                                                            <option value="Midway Islands">Midway Islands</option>
                                                            <option value="Moldova">Moldova</option>
                                                            <option value="Monaco">Monaco</option>
                                                            <option value="Mongolia">Mongolia</option>
                                                            <option value="Montserrat">Montserrat</option>
                                                            <option value="Morocco">Morocco</option>
                                                            <option value="Mozambique">Mozambique</option>
                                                            <option value="Myanmar">Myanmar</option>
                                                            <option value="Nambia">Nambia</option>
                                                            <option value="Nauru">Nauru</option>
                                                            <option value="Nepal">Nepal</option>
                                                            <option value="Netherland Antilles">Netherland Antilles</option>
                                                            <option value="Netherlands">Netherlands (Holland, Europe)</option>
                                                            <option value="Nevis">Nevis</option>
                                                            <option value="New Caledonia">New Caledonia</option>
                                                            <option value="New Zealand">New Zealand</option>
                                                            <option value="Nicaragua">Nicaragua</option>
                                                            <option value="Niger">Niger</option>
                                                            <option value="Nigeria">Nigeria</option>
                                                            <option value="Niue">Niue</option>
                                                            <option value="Norfolk Island">Norfolk Island</option>
                                                            <option value="Norway">Norway</option>
                                                            <option value="Oman">Oman</option>
                                                            <option value="Pakistan">Pakistan</option>
                                                            <option value="Palau Island">Palau Island</option>
                                                            <option value="Palestine">Palestine</option>
                                                            <option value="Panama">Panama</option>
                                                            <option value="Papua New Guinea">Papua New Guinea</option>
                                                            <option value="Paraguay">Paraguay</option>
                                                            <option value="Peru">Peru</option>
                                                            <option value="Phillipines">Philippines</option>
                                                            <option value="Pitcairn Island">Pitcairn Island</option>
                                                            <option value="Poland">Poland</option>
                                                            <option value="Portugal">Portugal</option>
                                                            <option value="Puerto Rico">Puerto Rico</option>
                                                            <option value="Qatar">Qatar</option>
                                                            <option value="Republic of Montenegro">Republic of Montenegro</option>
                                                            <option value="Republic of Serbia">Republic of Serbia</option>
                                                            <option value="Reunion">Reunion</option>
                                                            <option value="Romania">Romania</option>
                                                            <option value="Russia">Russia</option>
                                                            <option value="Rwanda">Rwanda</option>
                                                            <option value="St Barthelemy">St Barthelemy</option>
                                                            <option value="St Eustatius">St Eustatius</option>
                                                            <option value="St Helena">St Helena</option>
                                                            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                                                            <option value="St Lucia">St Lucia</option>
                                                            <option value="St Maarten">St Maarten</option>
                                                            <option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</option>
                                                            <option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</option>
                                                            <option value="Saipan">Saipan</option>
                                                            <option value="Samoa">Samoa</option>
                                                            <option value="Samoa American">Samoa American</option>
                                                            <option value="San Marino">San Marino</option>
                                                            <option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</option>
                                                            <option value="Saudi Arabia">Saudi Arabia</option>
                                                            <option value="Senegal">Senegal</option>
                                                            <option value="Serbia">Serbia</option>
                                                            <option value="Seychelles">Seychelles</option>
                                                            <option value="Sierra Leone">Sierra Leone</option>
                                                            <option value="Singapore">Singapore</option>
                                                            <option value="Slovakia">Slovakia</option>
                                                            <option value="Slovenia">Slovenia</option>
                                                            <option value="Solomon Islands">Solomon Islands</option>
                                                            <option value="Somalia">Somalia</option>
                                                            <option value="South Africa">South Africa</option>
                                                            <option value="Spain">Spain</option>
                                                            <option value="Sri Lanka">Sri Lanka</option>
                                                            <option value="Sudan">Sudan</option>
                                                            <option value="Suriname">Suriname</option>
                                                            <option value="Swaziland">Swaziland</option>
                                                            <option value="Sweden">Sweden</option>
                                                            <option value="Switzerland">Switzerland</option>
                                                            <option value="Syria">Syria</option>
                                                            <option value="Tahiti">Tahiti</option>
                                                            <option value="Taiwan">Taiwan</option>
                                                            <option value="Tajikistan">Tajikistan</option>
                                                            <option value="Tanzania">Tanzania</option>
                                                            <option value="Thailand">Thailand</option>
                                                            <option value="Togo">Togo</option>
                                                            <option value="Tokelau">Tokelau</option>
                                                            <option value="Tonga">Tonga</option>
                                                            <option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>
                                                            <option value="Tunisia">Tunisia</option>
                                                            <option value="Turkey">Turkey</option>
                                                            <option value="Turkmenistan">Turkmenistan</option>
                                                            <option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</option>
                                                            <option value="Tuvalu">Tuvalu</option>
                                                            <option value="Uganda">Uganda</option>
                                                            <option value="Ukraine">Ukraine</option>
                                                            <option value="United Arab Erimates">United Arab Emirates</option>
                                                            <option value="United Kingdom">United Kingdom</option>
                                                            <option value="United States of America">United States of America</option>
                                                            <option value="Uraguay">Uruguay</option>
                                                            <option value="Uzbekistan">Uzbekistan</option>
                                                            <option value="Vanuatu">Vanuatu</option>
                                                            <option value="Vatican City State">Vatican City State</option>
                                                            <option value="Venezuela">Venezuela</option>
                                                            <option value="Vietnam">Vietnam</option>
                                                            <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                                                            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                                                            <option value="Wake Island">Wake Island</option>
                                                            <option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</option>
                                                            <option value="Yemen">Yemen</option>
                                                            <option value="Zaire">Zaire</option>
                                                            <option value="Zambia">Zambia</option>
                                                            <option value="Zimbabwe">Zimbabwe</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="addressLine1">Address Line 1</label>
                                                    <input className="form-control" id="addressLine1" type="text" ref="addressLine1" placeholder="Address Line 1"/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="addressLine2">Address Line 2</label>
                                                    <input className="form-control" id="addressLine2" type="text" ref="addressLine2" placeholder="Address Line 2"/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="citySuburb">City/Suburb</label>
                                                    <input className="form-control" id="citySuburb" type="text" ref="citySuburb" placeholder="City/Suburb"/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="state">State/Province</label>
                                                    <div>
                                                        <select className="form-control" ref="state" id="state">
                                                            <option value="VIC">VIC</option>
                                                            <option value="NSW">NSW</option>
                                                            <option value="QLD">QLD</option>
                                                            <option value="WA">WA</option>
                                                            <option value="SA">SA</option>
                                                            <option value="ACT">ACT</option>
                                                            <option value="TAS">TAS</option>
                                                            <option value="NT">NT</option>
                                                            <option value="OTHER">OTHER</option>
                                                        </select>
                                                    </div>                                
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="postCode">Zip/Postcode</label>
                                                    <input className="form-control" id="postCode" type="text" ref="postCode" placeholder="PostCode/postCode"/>
                                                </div>  

                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="whatINeedHelpWith">What I need help with</label>
                                                <div>
                                                    <select className="form-control" ref="whatINeedHelpWith" id="whatINeedHelpWith">
                                                        <option value="undefined">Please select an option...</option>
                                                        
                                                            {map(this.whatINeedHelpWith, (need : IWhatINeedHelpWith, key) => (
                                                                <option key={key} value={need.name}>{need.name}</option>
                                                            ))}

                                                    </select>                                                
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="whenINeedHelp">When I need help</label>

                                                <div className="container">
                                                    <div className="our-details-tab">
                                                        <div className="row">

                                                            <div className="col-sm-12 tab-section">

                                                                <ul className="nav nav-tabs nav-justified" role="tablist">
                                                                    <li className="active"><a href="#singleDate" role="tab" data-toggle="tab">Select a single date</a></li>
                                                                    <li><a href="#dateRange" role="tab" data-toggle="tab">Select a date range</a></li>
                                                                    <li><a href="#flexible" role="tab" data-toggle="tab">Flexible</a></li>
                                                                </ul>

                                                                <div className="tab-content">
                                                                    <div className="tab-pane fade in active" id="singleDate">
                                                                        <SingleDate />
                                                                    </div>
                                                                    <div className="tab-pane fade " id="dateRange">								
                                                                        <DateRange />
                                                                    </div>
                                                                    <div className="tab-pane fade " id="flexible">
                                                                        <label><input type="checkbox" value=''/>Flexible</label>			                                                                       
                                                                    </div>                                
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        
                                        </div>
                                    :
                                        null
                                    }

                                    {
                                        this.controller.hasRegistered &&
                                        <div className="section-title">
                                            <h3>As you are now registered as someone needing help, you are also eligible to help if you would like</h3>
                                        </div>
                                    }

                                    <button className="btn btn-primary" type="submit">Register</button>
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
