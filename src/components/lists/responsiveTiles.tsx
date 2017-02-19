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
            <li key={index} className="col-sm-3">
                <div className="well well-sm need-card">
                    <div className="row">
                        <div className="col-sm-12">
                            <h4>{item.fullName}</h4>
                            <p>Email: {item.email}</p>
                            <p>Phone No: {item.phoneNo} $</p>
                        
                            <div className="btn-group btn-group-sm">
                                <button onClick={() => this.navigateToMarker(this, item.addressLocation)} className="btn btn-default btn-xs pull-right" role="button">
                                    <i className="glyphicon glyphicon-edit"></i>
                                </button> 
                                <button onClick={this.showAvailability} className="btn btn-info btn-xs" role="button">Availability</button> 
                                <button onClick={this.showDetails} className="btn btn-default btn-xs" role="button">Show Details</button>                     
                            </div>                        
                        </div>
                    </div>
                </div>
            </li>
        )
    }

    render(){
        return(
            <div>
                <section id="portfolio" className="bg-light-gray">
                        <div className="container">
                            <div className="row">
                                <ul>
                                    { this.props.data.map((item : IRegistrationNeedHelpInd, index) => {
                                        return this.renderTile(item, index)
                                    })}
                                </ul>
                            </div>
                        </div>
                </section>                               
            </div>
        )
    }
}