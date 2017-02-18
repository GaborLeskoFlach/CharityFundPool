import * as React from 'react';
import { IRegistrationNeedHelpInd, IPosition } from '../interfaces';

interface IResponsiveTiles{
    data : Array<IRegistrationNeedHelpInd>;
    navigateToMarker : () => void;
}

export class ResponsiveTiles extends React.Component<IResponsiveTiles,{}>{
    
    constructor(){
        super();
    }

    showAvailability = (e) => {
        e.preventDefault();
        alert('Show Availability of particular User');
    }

    showDetails = (e) => {
        e.preventDefault();
        alert('Show Details of particular user');
    }

    navigateToMarker = (e, addressLocation:IPosition) => {
        e.preventDefault();
        this.props.navigateToMarker();
    }

    renderTile = (item : IRegistrationNeedHelpInd, index : number) => {
        return(
            <div key={index} className="col-xs-18 col-sm-6 col-md-3">
            <div className="thumbnail">
                
                <div className="caption">
                    <h4>{item.fullName}</h4>
                    <p>{item.email}</p>
                    <p>{item.phoneNo}</p>
                    <button onClick={() => this.navigateToMarker(this, item.addressLocation)} className="btn btn-default btn-xs pull-right" role="button">
                        <i className="glyphicon glyphicon-edit"></i>
                    </button> 
                    <button onClick={this.showAvailability} className="btn btn-info btn-xs" role="button">Availability</button> 
                    <button onClick={this.showDetails} className="btn btn-default btn-xs" role="button">Show Details</button>
                </div>
            </div>
            </div>
        )
    }

    render(){
        return(
            <div>
                <section id="portfolio" className="bg-light-gray">
                        <div className="container">
                            <div className="row">
                            { this.props.data.map((item : IRegistrationNeedHelpInd, index) => {
                                return this.renderTile(item, index)
                            })}
                            </div>
                        </div>
                </section>                               
            </div>
        )
    }
}