import * as React from 'react';
import { IRegistrationWantToHelp, RegistrationType } from '../../interfaces';

interface ICard{
    registration : IRegistrationWantToHelp;
    onEditRegistration : (id : string, registrationType : RegistrationType ) => void;
    onRegisterUser : (id : string, email : string, registrationType : RegistrationType, register : boolean) => void;
    onArchiveRegistration : (id : string, registrationType : RegistrationType ) => void;
    onActivateRegistration : (id : string, registrationType : RegistrationType) => void;
    onDeleteRegistration : (id : string, registrationType : RegistrationType) => void;
    isArchived : boolean; 
}

export class Card extends React.Component<ICard, {}>{

    constructor(props) {
        super(props);
    }

    archiveRegistration = (e) => {
        e.preventDefault();
        this.props.onArchiveRegistration(this.props.registration.ID, RegistrationType.WantToHelp);
    }

    editRegistration = (e) => {
        e.preventDefault();
        this.props.onEditRegistration(this.props.registration.ID,RegistrationType.WantToHelp);
    }

    registerUser = (e) => {
        e.preventDefault();
        this.props.onRegisterUser(this.props.registration.ID,this.props.registration.email, RegistrationType.WantToHelp, !this.props.registration.uid);
    }

    activateRegistration = (e) => {
        e.preventDefault();
        this.props.onActivateRegistration(this.props.registration.ID,RegistrationType.WantToHelp);
    } 

    deleteRegistration = (e) => {
        e.preventDefault();
        this.props.onDeleteRegistration(this.props.registration.ID,RegistrationType.WantToHelp);
    }

    renderRegisteredFlag = (val : string) => {
        let glyphiconColor : React.CSSProperties = null;
        if(val && val !== 'null'){
            glyphiconColor = { color : 'green'};     
            return(                
                <span className="glyphicon glyphicon-ok" style={glyphiconColor}></span>
            ) 
        }else{
            glyphiconColor = { color : 'red'}
            return(
                <span className="glyphicon glyphicon-remove" style={glyphiconColor}></span>
            ) 
        }       
    }

    renderArchiveButton = () =>{
        return(
            <div>
                <button className="btn btn-default btn-xs pull-right" onClick={this.activateRegistration}> 
                    <span className="glyphicon glyphicon-edit"></span> Activate
                </button>  
                <button className="btn btn-danger btn-xs pull-left" onClick={this.deleteRegistration}> 
                    <span className="glyphicon glyphicon-erase"></span> Erase
                </button>                         
            </div>
        )
    }

    renderActionButtons = () => {
        const userAction : string = !this.props.registration.uid ? 'Enable Access' : 'Disable Access';
        return(
            <div>
                <button className="btn btn-default btn-xs" onClick={this.editRegistration}> 
                    <span className="glyphicon glyphicon-edit"></span> Edit
                </button>
                
                <button className="btn btn-default btn-xs" onClick={this.registerUser}> 
                    <span className="glyphicon glyphicon-cog"></span> {userAction}
                </button>
                <button className="btn btn-danger btn-xs pull-right" onClick={this.archiveRegistration}>
                    <span className="glyphicon glyphicon-remove"></span> Remove
                </button>
            </div>   
        )
    }

    render() {

        const registration = this.props.registration;

        return (
            <div className="well well-sm need-card">
                <div className="row">
                    <div className="col-sm-12">
                        <h4>{registration.fullName}</h4>
                        <p>Email: {registration.email}</p>
                        <p>Phone: {registration.phoneNo}</p>
                        <p>PostCode: {registration.postCode}</p>
                        <p>City: {registration.citySuburb}</p>

                        <p>User registered: { this.renderRegisteredFlag(registration.uid) }</p>

                        {
                            this.props.isArchived ? 
                                this.renderArchiveButton()
                            :
                                this.renderActionButtons()
                        }
                                                                         
                    </div>
                </div>
            </div>
        )
    }
}