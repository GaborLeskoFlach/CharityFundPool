import * as React from 'react';
import { IRegistrationNeedHelpInd, RegistrationType } from '../../interfaces';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ImageUpload } from '../../imageUpload/component';

let ModalContainer = require('react-modal-dialog').ModalContainer;
let ModalDialog = require('react-modal-dialog').ModalDialog;


interface ICard{
    registration : IRegistrationNeedHelpInd;
    onEditRegistration : (id : string, registrationType : RegistrationType ) => void;
    onRegisterUser : (id : string, email : string, registrationType : RegistrationType, register : boolean) => void;
    onArchiveRegistration : (id : string, registrationType : RegistrationType ) => void;
    onActivateRegistration : (id : string, registrationType : RegistrationType) => void;
    onDeleteRegistration : (id : string, registrationType : RegistrationType) => void;
    isArchived : boolean;
}

@observer
export class Card extends React.Component<ICard, {}>{
    @observable isShowingModal : boolean = false;

    constructor(props) {
        super(props);
    }

    archiveRegistration = (e) => {
        e.preventDefault();
        this.props.onArchiveRegistration(this.props.registration.ID, RegistrationType.NeedHelpInd);
    }

    editRegistration = (e) => {
        e.preventDefault();
        this.props.onEditRegistration(this.props.registration.ID,RegistrationType.NeedHelpInd);
    }

    registerUser = (e) => {
        e.preventDefault();
        this.props.onRegisterUser(this.props.registration.ID,this.props.registration.email, RegistrationType.NeedHelpInd, !this.props.registration.uid);
    }

    activateRegistration = (e) => {
        e.preventDefault();
        this.props.onActivateRegistration(this.props.registration.ID,RegistrationType.NeedHelpInd);
    } 

    deleteRegistration = (e) => {
        e.preventDefault();
        this.props.onDeleteRegistration(this.props.registration.ID,RegistrationType.NeedHelpInd);
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


    handleClick = () =>{
        this.isShowingModal = true;
    }

    handleClose = () => {
        this.isShowingModal = false;
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
                        <button className="btn-btn-default btn-xs" onClick={this.handleClick}>
                            <span className="glyphicon glyphicon-upload"></span> Upload Image
                        </button>                        
                        <p>User registered: { this.renderRegisteredFlag(registration.uid) }</p>

                        {
                            this.props.isArchived ? 
                                this.renderArchiveButton()
                            :
                                this.renderActionButtons()
                        }


                        {
                            this.isShowingModal &&
                            <ModalContainer onClose={this.handleClose}>
                                <ModalDialog onClose={this.handleClose}>
                                    <h1>Dialog Content</h1>
                                    <p>More Content. Anything goes here</p>
                                    <div>
                                        <ImageUpload />
                                    </div>
                                </ModalDialog>
                            </ModalContainer>                            
                        }
                    </div>
                </div>
            </div>
        )
    }
}