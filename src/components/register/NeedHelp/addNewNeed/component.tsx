import * as React from 'react';
import { Link } from 'react-router';
import { IWhatINeedHelpWith, INeedHelpWithListItem, IDateRange, DataFilter } from '../../../interfaces';
import { map } from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as FormFields from '../../formFields';
import { _firebaseAuth } from '../../../firebaseAuth/component';
import { RegisterNeedHelpController } from '../controller';
import { convertData } from '../../../../utils/utils';

import SingleDate from '../../../common/dateComponents/singleDate';
import DateRange from '../../../common/dateComponents/dateRange';

export interface ICreateNewNeedComponent{
    controller : RegisterNeedHelpController;
    onChanged : (any) => void;
}

@observer
export class CreateNewNeedComponent extends React.Component<ICreateNewNeedComponent, any>{
    needHelpWithListItem : INeedHelpWithListItem;
    @observable isLoading : boolean = false;

    constructor(props) {
        super(props);
        this.needHelpWithListItem = {
            active : true,
            whatINeedHelpWith : '',
            whenINeedHelp : {
                singleDate : { day : '', reoccurring : false },
                dateRange : { from : '', to : '', reoccurring : false},
                flexible : false
            },
            typeOfWork : ''
        }
    }

    addNewListItem = (e) => {
        e.preventDefault();
        this.isLoading = true;
        this.props.controller.addNeedHelpWithListItem(this.needHelpWithListItem).then((response) => {
            this.isLoading = false;
        })
    }

    removeNeedHelpWithListItem = (e, id : string) => {
        e.preventDefault();
        this.isLoading = true;
        this.props.controller.removeNeedHelpWithListItem(id).then((response) => {
            this.isLoading = false;
        })
    }

    handleChange = (e) => {
        switch(e.target.id){
            case FormFields.whatINeedHelpWith:
                this.needHelpWithListItem.whatINeedHelpWith = e.target.value;
                break;
            case FormFields.typeOfWork:
                this.needHelpWithListItem.typeOfWork = e.target.value;
                break;
        }
    }

    convertSingleDate = (day : string) : Date => {
        return new Date(day);
    }

    convertDateRange = (dateRange : { from : string, to : string}) : IDateRange => {
        let value : IDateRange = {
            from : dateRange.from ? new Date(dateRange.from) : null,
            to : dateRange.to ? new Date(dateRange.to) : null
        }
        return value;
    }

    handleDaySelection = (day : Date) => {
        this.needHelpWithListItem.whenINeedHelp.singleDate = { 
            day : day.toString(), 
            reoccurring : this.needHelpWithListItem.whenINeedHelp.singleDate.reoccurring 
        };
    }

    handleDateRangeSelection = (dateRange : IDateRange ) => {
        this.needHelpWithListItem.whenINeedHelp.dateRange = { 
            from : dateRange.from ? dateRange.from.toString() : '', 
            to : dateRange.to ? dateRange.to.toString() : '', 
            reoccurring : this.needHelpWithListItem.whenINeedHelp.dateRange.reoccurring 
        };
    }

    needHelpWithListItemSelected = (e, id : string) => {
        e.preventDefault();
    }

    renderNeedsForIndividual = (props : ICreateNewNeedComponent) => {   
        if(this.isLoading){
            return(
                <tr>
                    <td>Loading...</td>
                </tr>
            );
        }else{
            map(convertData(props.controller.individualRegistration.needHelpWithList,DataFilter.ActiveOnly),((item : INeedHelpWithListItem, index) => {
                return(
                    <tr key={index} onClick={(e) => this.needHelpWithListItemSelected(e,item.ID)}>
                        <td className="col-sm-1 col-md-1 text-center">{item.whatINeedHelpWith}</td>
                        <td className="col-sm-1 col-md-1 text-center">{item.typeOfWork}</td>
                        <td className="col-sm-1 col-md-1">
                            <button type="button" className="btn btn-danger" id="remove" onClick={(e) => this.removeNeedHelpWithListItem(e,item.ID)}>
                                <span className="glyphicon glyphicon-remove"></span> Remove
                            </button>
                        </td>
                    </tr>
                )
            }))
        }   
    }

    render() {
        const style : React.CSSProperties = {
            textAlign : 'center'
        }

        const { controller } = this.props;

        if (_firebaseAuth.currentUser === null) {
            return(               
                <div className="well" style={style}>
                    <h1>You need to be registered to be able create a new Need</h1>
                    <p>Please come back after you've received your registration from CFP</p>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="form-group">
                        <label htmlFor="whatINeedHelpWith">What I need help with</label>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div className="form-group">
                                    <label htmlFor="whatINeedHelpWith">What I need help with</label>
                                    <div>
                                        <select className="form-control" ref="whatINeedHelpWith" id="whatINeedHelpWith" onChange={this.handleChange} >
                                            <option value="">Please select an option...</option>
                                            
                                                {map(this.props.controller.whatINeedHelpWith, (need : IWhatINeedHelpWith, key) => (
                                                    <option key={key} value={need.name}>{need.name}</option>
                                                ))}

                                        </select>                                                
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="typeOfWork">Type of work (*)</label>
                                    <div>
                                        <select 
                                            className="form-control"
                                            id="typeOfWork" 
                                            onChange={this.handleChange}
                                        >
                                            <option value="">Please select an option...</option>
                                            <option value="Light duty work">Light duty work</option>
                                            <option value="Medium duty work">Medium duty work</option>
                                            <option value="Heavy duty work">Heavy duty work</option>
                                        </select>
                                    </div>     
                                </div>
                                <div className="form-group">
                                    <div className="container">
                                        <div className="our-details-tab text-center">
                                            <div className="row">

                                                <div className="col-sm-12 tab-section">

                                                    <ul className="tab-list list-inline" role="tablist">
                                                        <li className="active"><a href="#singleDate" role="tab" data-toggle="tab">Select a single date</a></li>
                                                        <li><a href="#dateRange" role="tab" data-toggle="tab">Select a date range</a></li>
                                                        <li><a href="#flexible" role="tab" data-toggle="tab">Flexible</a></li>
                                                    </ul>

                                                    <fieldset className="tab-content">
                                                        <div className="tab-pane fade in active" id="singleDate">
                                                            <SingleDate onDayClick={this.handleDaySelection} setSingleDate={this.convertSingleDate(controller.needHelpWithListItem.whenINeedHelp.singleDate.day) }/>
                                                            <label><input type="checkbox" id="singleDateReoccurring" onChange={this.handleChange} checked={controller.needHelpWithListItem.whenINeedHelp.singleDate.reoccurring}/> Reoccurring</label>
                                                        </div>
                                                        <div className="tab-pane fade " id="dateRange">								
                                                            <DateRange onDateRangeClick={this.handleDateRangeSelection} setDateRange={this.convertDateRange(controller.needHelpWithListItem.whenINeedHelp.dateRange) }/>
                                                            <br />
                                                            <label><input type="checkbox" id="dateRangeReoccurring" onChange={this.handleChange} checked={controller.needHelpWithListItem.whenINeedHelp.dateRange.reoccurring}/> Reoccurring</label>
                                                        </div>
                                                        <div className="tab-pane fade" id="flexible">
                                                            <label><input type="checkbox" id="flexibleDates" onChange={this.handleChange} checked={controller.needHelpWithListItem.whenINeedHelp.flexible}/> Flexible</label>
                                                        </div>                        
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary submit" onClick={this.addNewListItem}>Add</button>
                            </div>
                        </div>
                    </div>  
                    <div className="form-group">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center">Need help with</th>
                                        <th className="text-center">Type of Work</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody id="tbody">
                                    {
                                        this.renderNeedsForIndividual(this.props)
                                    }
                                </tbody>
                            </table>
                        </div>                                     
                    </div>    
                </div>       
            )
        }
    }

}