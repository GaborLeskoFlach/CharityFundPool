import * as React from 'react';
import { IRegistrationNeedHelpInd } from '../interfaces';

interface IResponsiveTiles{
    data : Array<IRegistrationNeedHelpInd>;
}

export class ResponsiveTiles extends React.Component<IResponsiveTiles,{}>{
    
    constructor(){
        super();
    }

    renderTile = (item : IRegistrationNeedHelpInd, index : number) => {
        return(
            <div key={index} className="col-md-4 col-sm-6 portfolio-item">
                <a className="portfolio-link">
                    <div className="portfolio-hover">
                        <div className="portfolio-hover-content">
                            <i className="fa fa-plus fa-3x"></i>
                        </div>
                    </div>
                </a>
                <div className="portfolio-caption">
                    <h4>{item.fullName}</h4>
                    <p className="text-muted">{item.email}</p>
                    <p className="text-phoneNo">{item.phoneNo}</p>
                    <p className="text-postCode">{item.postCode}</p>
                    <p className="text-citySuburb">{item.citySuburb}</p>
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