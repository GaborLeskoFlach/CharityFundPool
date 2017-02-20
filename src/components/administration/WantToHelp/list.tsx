import * as React from 'react';
import { Card } from './card';
import { IRegistrationWantToHelp, DataFilter, RegistrationType } from '../../interfaces';
import { AdministrationController } from '../controller';
import { convertData } from '../../../utils/utils';
import { observable } from 'mobx';
import { observer } from 'mobx-react';


interface IWantToHelpRegistrations{
    filters : Array<any>;
    active : boolean;
    showArchivedItemsOnly : boolean;
    onEditRegistration : (id : string, registrationType : RegistrationType ) => void;
    onRegisterUser : (id : string, email : string, registrationType : RegistrationType ) => void;
    onArchiveRegistration : (id : string, registrationType : RegistrationType ) => void;
    onActivateRegistration : (id : string, registrationType : RegistrationType ) => void;
}

@observer
export class WantToHelpRegistrations extends React.Component<IWantToHelpRegistrations,{}>{
    controller : AdministrationController;
    data : Array<IRegistrationWantToHelp>;
    @observable loaded : boolean;

    constructor(props){
        super(props);
        this.controller = new AdministrationController();
        this.data = [];
        this.loaded = false;
    }

    componentWillReceiveProps(newProps : IWantToHelpRegistrations){
        if(newProps.active){
            this.loaded = false;
            this.controller.getRegistrationsForWantToHelp().then(response =>{
                this.loaded = true;
            }); 
        }
     }

    shouldComponentUpdate(nextProps : IWantToHelpRegistrations, nextState){
        if (nextProps.active){
            return true;
        }else{
            return false;
        }
    }

    renderCard = (registration : IRegistrationWantToHelp, index : number) => {
        return(
            <li key={index} className="col-sm-3">
                <Card 
                    registration={registration} 
                    onArchiveRegistration={this.props.onArchiveRegistration}
                    onEditRegistration={this.props.onEditRegistration}
                    onRegisterUser={this.props.onRegisterUser} />
            </li>
        )
    }

    dataFilterConfig = () : DataFilter => {
        if(this.props.showArchivedItemsOnly){
            return DataFilter.InActiveOnly;
        }else{
            return DataFilter.ActiveOnly;
        }
    }

    render(){
        if(this.data && this.props.active && this.loaded){
            return(
                <ul className="fancy-label row">
                    {
                        convertData(this.controller.registrationsForWantToHelp, this.dataFilterConfig()).map((registration, index) => {
                            return this.renderCard(registration, index);
                        })
                    }              
                </ul>            
            )
        }else{
            return (
                <div className="container">
                    <div className="section-title">
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        }
    }
}