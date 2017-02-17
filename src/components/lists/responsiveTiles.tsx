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

        <div key={index} className="col-xs-18 col-sm-6 col-md-3">
          <div className="thumbnail">
            
              <div className="caption">
                <h4>{item.fullName}</h4>
                <p>{item.email}</p>
                <p>{item.phoneNo}</p>
                <p>{item.addressLocation}</p>
                <a href="#" className="btn btn-default btn-xs pull-right" role="button">
                    <i className="glyphicon glyphicon-edit"></i>
                </a> 
                <a href="#" className="btn btn-info btn-xs" role="button">Button</a> 
                <a href="#" className="btn btn-default btn-xs" role="button">Button</a>
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