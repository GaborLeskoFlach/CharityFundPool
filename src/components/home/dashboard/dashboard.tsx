import * as React from 'react'
import { Link } from 'react-router';
import { DashboardController } from './controller'
import { _firebaseAuth, _firebaseApp } from '../../firebaseAuth/component'
import { observer } from 'mobx-react';
import { observable } from 'mobx'
import './styles.css'

@observer
export class Dashboard extends React.Component<{}, {}>{
    controller: DashboardController

    constructor() {
        super()
        this.controller = new DashboardController()
    }

    componentWillMount = () => {
        _firebaseApp.auth().onAuthStateChanged((user) => {
            if (_firebaseAuth.currentUser !== null) {
                this.controller.isLoading = true
                this.controller.getUserRegistrationLocationByUID(_firebaseAuth.currentUser.uid).then((response) => {
                    this.controller.isLoading = false
                    this.forceUpdate()
                })
            }
        })
    }

    renderRegistrationLinks = (): any => {
        if (this.controller.userRegistrations.length > 0) {
            return (
                this.controller.userRegistrations.map((item, i) => {
                    return <Link key={i} to={item.redirectLink} className="list-group-item">{item.displayText}</Link>
                })
            )
        } else {
            return <a className="list-group-item">Currently no registration</a>
        }
    }

    render() {

        const registrations = this.renderRegistrationLinks()

        if (!_firebaseAuth.currentUser || !this.controller.userRegistrations) {
            return null
        } else if (this.controller.isLoading) {
            return (
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">Loading...</div>
                    <div className="col-sm-3"></div>
                </div>
            )
        } else {

            const innerStyle : React.CSSProperties = {
                marginBottom : 0
            }

            return (
                <div className="row">
                    <div className="col-sm-3" />
                    <div className="col-sm-6">
                        <div className="donate-tab text-center">
                            <div id="donate">
                                <ul className="tab-list list-inline" role="tablist" >
                                    <li className="active"><a href="#registrations" role="tab" data-toggle="tab">Registrations</a></li>
                                    <li><a href="#notifications" role="tab" data-toggle="tab">Notifications </a></li>
                                </ul>
                                <fieldset className="tab-content" style={innerStyle}>
                                    <div className="tab-pane fade in active" id="registrations">
                                        <div className="list-group">
                                            <div className="list-group-item active">
                                                You are currently registered as someone who:
                                            </div>
                                            { registrations }
                                        </div>
                                    </div>
                                    <div className="tab-pane fade " id="notifications">                                        
                                        <div className="list-group-custom">
                                            <a href="#" className="list-group-item"><span className="badge">0</span><i className="glyphicon glyphicon-ok" /> Job Requests approved </a>
                                            <a href="#" className="list-group-item"><span className="badge">0</span><i className="glyphicon glyphicon-hourglass" /> Job Requests pending </a>
                                            <a href="#" className="list-group-item"><span className="badge">0</span><i className="glyphicon glyphicon-remove" /> Job Requests cancelled </a>
                                        </div>                                                                  
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3" />
                </div>
            )
        }
    }

}