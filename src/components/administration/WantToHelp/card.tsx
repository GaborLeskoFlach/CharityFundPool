import * as React from 'react';
import { IRegistrationWantToHelp, RegistrationType } from '../../interfaces';

interface ICard{
    registration : IRegistrationWantToHelp;
    onEditRegistration : (id : string, registrationType : RegistrationType ) => void;
    onRegisterUser : (id : string, email : string, registrationType : RegistrationType ) => void;
    onArchiveRegistration : (id : string, registrationType : RegistrationType ) => void;    
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
        this.props.onRegisterUser(this.props.registration.ID,this.props.registration.email, RegistrationType.WantToHelp);
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

    render() {

        const registration = this.props.registration;

        return (
            <div className="well well-sm need-card">
                <div className="row">
                    <div className="col-sm-12">
                        <h4>{registration.fullName}</h4>
                        <p>Info 1: This is info 1</p>
                        <p>Info 2: This is info 2</p>
                        <p>Info 3: This is info 3</p>
                        <p>Info 4: This is info 4</p>

                        <p>User registered: { this.renderRegisteredFlag(registration.uid) }</p>

                        <button className="btn btn-default btn-xs" onClick={this.editRegistration}> 
                            <span className="glyphicon glyphicon-edit"></span> Edit
                        </button>
                        
                        <button className="btn btn-default btn-xs" onClick={this.registerUser}> 
                            <span className="glyphicon glyphicon-cog"></span> User
                        </button>
                        <button className="btn btn-danger btn-xs pull-right" onClick={this.archiveRegistration}>
                            <span className="glyphicon glyphicon-remove"></span> Remove
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}