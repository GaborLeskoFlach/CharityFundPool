import * as React from 'react';
import { Card } from './card';
import { IRegistrationNeedHelpOrg } from '../../interfaces';

interface INeedHelpOrganisationRegistrations{
    filters : Array<any>;
    active : boolean;
}

export class NeedHelpOrganisationRegistrations extends React.Component<INeedHelpOrganisationRegistrations,{}>{
    data : Array<IRegistrationNeedHelpOrg>;

    constructor(props){
        super(props);
        this.data = [];
    }

    componentWillReceiveProps(newProps : INeedHelpOrganisationRegistrations){
        
    }

    renderCard = (registration : IRegistrationNeedHelpOrg, index : number) => {
        return(
            <li key={index} className="col-sm-3">
                <Card registration={registration} />
            </li>
        )
    }

    render(){
        if(this.data && this.props.active){
            return(
                <ul className="fancy-label row">
                    {
                        this.data.map((registration, index) => {
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