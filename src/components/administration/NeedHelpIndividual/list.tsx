import * as React from 'react';
import { Card } from './card';
import { IRegistrationNeedHelpInd } from '../../interfaces';

interface INeedHelpIndividualRegistrations{
    filters : Array<any>;
    active : boolean;
}

export class NeedHelpIndividualRegistrations extends React.Component<INeedHelpIndividualRegistrations,{}>{
    data : Array<IRegistrationNeedHelpInd>;
    
    constructor(props){
        super(props);
        this.data = [];
    }

    componentWillReceiveProps(newProps : INeedHelpIndividualRegistrations){
        
    }

    renderCard = (registration : IRegistrationNeedHelpInd, index : number) => {
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