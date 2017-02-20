import * as React from 'react';
import { IRegistrationNeedHelpInd, RegistrationType } from '../../interfaces';

interface IListFilterIndividualRegistrations{

}

export class ListFilterIndividualRegistrations extends React.Component<IListFilterIndividualRegistrations, {}>{

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div className="well">
                    All sorts of filters we can put in here to filter Individual Registrations
                </div>

            </div>   
        )
    }
}