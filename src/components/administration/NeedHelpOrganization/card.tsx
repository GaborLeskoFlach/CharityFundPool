import * as React from 'react';
import { IRegistrationNeedHelpOrg } from '../../interfaces';

interface ICard{
    registration : IRegistrationNeedHelpOrg;
}

export class Card extends React.Component<ICard, {}>{

    constructor(props) {
        super(props);
    }

    render() {

        const registration = this.props.registration;

        return (
            <div className="well well-sm need-card">
                <div className="row">
                    <div className="col-sm-12">
                        <h4>Title</h4>
                        <p>Info 1: This is info 1</p>
                        <p>Info 2: This is info 2</p>
                        <p>Info 3: This is info 3</p>
                        <p>Info 4: This is info 4</p>

                    </div>
                </div>
            </div>
        )
    }
}