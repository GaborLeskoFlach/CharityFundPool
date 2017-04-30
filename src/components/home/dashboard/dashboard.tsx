import * as React from 'react'
import { Link } from 'react-router';
import { DashboardController } from './controller'

export class Dashboard extends React.Component<{},{}>{
    controller : DashboardController

    constructor(){
        super()
        this.controller = new DashboardController()
    }

    render(){
        return(
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <div className="donate-tab text-center">
                        <div id="donate">                                    
                            <ul className="tab-list list-inline" role="tablist" >
                                <li className="active"><a href="#registrations" role="tab" data-toggle="tab">Registrations</a></li>
                                <li><a href="#notifications" role="tab" data-toggle="tab">Notifications </a></li>
                            </ul>                                            
                            <fieldset className="tab-content">
                                <div className="tab-pane fade in active" id="registrations">                                                    
                                    <div className="list-group">
                                        <a href="#" className="list-group-item active">
                                        You are currently registered as someone who:
                                        </a>
                                        <Link to="/register/NeedHelp" className="list-group-item">Needs help (Individual)</Link>
                                        <Link to="/register/NeedHelp" className="list-group-item">Needs help (Organisation)</Link>
                                        <Link to="/register/WantToHelp" className="list-group-item">Wants to help</Link>
                                    </div>                                                    
                                </div>
                                <div className="tab-pane fade " id="notifications">								
                                    <div className="list-group">
                                        <a href="#" className="list-group-item"><span className="badge">1</span>Job Requests approved</a>
                                        <a href="#" className="list-group-item"><span className="badge">2</span>Job Requests pending</a>
                                        <a href="#" className="list-group-item"><span className="badge">3</span>Job Requests cancelled</a>
                                    </div>
                                </div>                                
                            </fieldset>     
                        </div>  
                    </div>                             
                </div>
                <div className="col-sm-3"></div>
            </div>
        )
    }

}