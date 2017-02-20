import * as React from 'react';
import { IRegistrationNeedHelpOrg, RegistrationType } from '../../interfaces';

interface IListFilterOrganisationRegistrations{

}

export class ListFilterOrganisationRegistrations extends React.Component<IListFilterOrganisationRegistrations, {}>{

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div className="well">
                    All sorts of filters we can put in here to filter Organisation Registrations
                </div>

            </div>   
        )
    }
}