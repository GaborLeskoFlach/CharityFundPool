import * as React from 'react';
import { Card } from './card';
import { IRegistrationWantToHelp, DataFilter } from '../../interfaces';
import { AdministrationController } from '../controller';
import { convertData } from '../../../utils/utils';

interface IWantToHelpRegistrations{
    filters : Array<any>;
    active : boolean;
}

export class WantToHelpRegistrations extends React.Component<IWantToHelpRegistrations,{}>{
    controller : AdministrationController;
    data : Array<IRegistrationWantToHelp>;

    constructor(props){
        super(props);
        this.controller = new AdministrationController();
        this.data = [];
    }

    componentWillReceiveProps(newProps : IWantToHelpRegistrations){
        console.log('WantToHelpRegistrations.componentWillReceiveProps => {0}', newProps.active);
        this.controller.isLoading = true;
        this.controller.getRegistrationsForWantToHelp().then(response =>{
            this.controller.isLoading = false;                                                                
        });      
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('should component update');
        return true;
    }

    renderCard = (registration : IRegistrationWantToHelp, index : number) => {
        return(
            <li key={index} className="col-sm-3">
                <Card registration={registration} />
            </li>
        )
    }

    render(){
        if(this.data && this.props.active && !this.controller.isLoading){
            return(
                <ul className="fancy-label row">
                    {
                        convertData(this.data, DataFilter.ActiveOnly).map((registration, index) => {
                            return this.renderCard(registration, index);
                        })
                    }              
                </ul>            
            )
        }else{
            return null;
        }
    }
}