import * as React from 'react';
let DataTable = require('react-data-components').DataTable;
import { JobSearchController } from './controller';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg, DataFilter } from '../interfaces';
import { convertData } from '../../utils/utils';
import { Link } from 'react-router';

import { ListView } from './../lists/simpleList'
import { ResponsiveTiles } from './../lists/responsiveTiles';

import './styles.css';

interface IColumnData {
    title : string;
    prop : string;
    render? : (val,row) => void;
    className? : string;
}

@observer
export class Jobs extends React.Component<{},{}> {
    @observable postCodeToSearch : string;
    controller : JobSearchController;

    constructor(props){
        super(props);
        this.postCodeToSearch = '';
        this.controller = new JobSearchController();
    }

    searchByPostCode = (e) => {
        e.preventDefault();
        this.validate();
        if(this.controller.registerIndividualFormState.postCode.fieldValidationError.length === 0){
            this.postCodeToSearch = this.controller.postCode;
        }
    }

    validate = () => {
        const numericOnlyPatter = /^[0-9]*$/;
        this.controller.registerIndividualFormState.postCode.touched = true;

        //PostCode
        if(this.controller.postCode.length == 0){
            this.controller.registerIndividualFormState.postCode.fieldValidationError = 'Required';
        }else if (!numericOnlyPatter.test(this.controller.postCode)) {
            this.controller.registerIndividualFormState.postCode.fieldValidationError = 'Post code can contain numbers only';
        }else{
            this.controller.registerIndividualFormState.postCode.fieldValidationError = '';
        }                                                                                                                                            
    }

    handleChange = (e) => {
        this.controller.postCode = e.target.value;
    }

    handleBlur = (e) => {
        this.controller.registerIndividualFormState.postCode.touched = true;
    }

    shouldMarkError = (control:string) => {
        let hasError : boolean = this.controller.registerIndividualFormState.postCode.fieldValidationError.length > 0;
        let shouldShow : boolean = this.controller.registerIndividualFormState.postCode.touched;

        return hasError ? shouldShow : false;
    };

    render() {
        return (
            <div>
                <div className="inner-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2 text">
                                <h1 className="wow fadeInLeftBig animated" style={{ visibility : 'visible', animationName : 'fadeInLeftBig' }}><strong>Job search Form</strong></h1>
                                <div className="description wow fadeInLeftBig animated" style={{ visibility: 'visible', animationName: 'fadeInLeftBig'}}>
                                    <p>
                                        Use this form to search for available jobs in your area.
                                        Type in your postcode in the box below and pick jobs from the results
                                    </p>
                                </div>
                                <div className="subscribe wow fadeInUp animated" style={{ visibility: 'visible', animationName: 'fadeInUp'}}>
                                    <form className="form-inline" onSubmit={this.searchByPostCode}>
                                        
                                        <div className={this.shouldMarkError('postcode') ? "form-group has-error has-feedback" : ""}>
                                            <label className="sr-only" htmlFor="searchByPostCode">Post code</label>
                                            <input 
                                                className={this.shouldMarkError('postCode') ? "form-control error" : "subscribe form-control"}
                                                id="searchByPostCode" 
                                                type="text" 
                                                placeholder="Enter post code..."
                                                onChange={this.handleChange}
                                                onBlur={this.handleBlur}
                                                value={this.controller.postCode}/>
                                                <span className={this.shouldMarkError('postCode') ? "glyphicon glyphicon-remove form-control-feedback" : ""}></span>
                                        </div>
                                        <button type="submit" className="btn btn-primary submit">Search</button>
                                        <p className='validationErrorMsg'>{this.controller.registerIndividualFormState.postCode.fieldValidationError}</p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SearchResults postCode={this.postCodeToSearch}/>

                </div>                
            </div>
        )
    }
    
}

interface ISearchResults {
    postCode : string;
}

@observer
export class SearchResults extends React.Component<ISearchResults,{}>{
    registrationNeedHelpIndColumns : Array<IColumnData>;
    controller : JobSearchController;

    constructor(){
        super();
        this.controller = new JobSearchController();
    }

    componentWillReceiveProps(nextProps : ISearchResults){        
        this.controller.isLoading = true;
        this.controller.getRegistrationsForNeedHelpInd(nextProps.postCode).then(response => {
            this.controller.isLoading = false;
        }).catch((e) => {
            this.controller.isLoading = false;
        })
    }

    render(){

        if(this.controller.isLoading){
            return (
                <div className="container">
                    <div className="section-title">
                        <h1>Searching...</h1>
                    </div>
                </div>
            )
        }else{

            if(this.props.postCode){

                let filteredData = convertData<IRegistrationNeedHelpInd>(this.controller.registrationsForNeedHelp_Ind, DataFilter.ActiveOnly)
                                    .filter(x => x.postCode === this.props.postCode) ;

                if(filteredData && filteredData.length > 0){
                    return (
                        <div className="container">
                            <div className="section-title">
                                <h1>Results</h1>                            
                            </div>                       
                            <ResponsiveTiles data={filteredData}/>
                        </div>                                         
                    )
                }else{
                    return(
                    <div className="container">
                        <div className="section-title">
                            <h1>No results...</h1>
                        </div>
                    </div>
                    )
                }


            }else{
                return(
                    <div className="container">
                        <div className="section-title">
                            <h1>No results...</h1>
                        </div>
                    </div>
                )
            }       
        }
    }
}