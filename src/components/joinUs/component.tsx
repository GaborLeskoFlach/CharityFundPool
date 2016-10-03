import * as React from 'react';
import { Constants } from '../constants';


export interface IJoinUsComponent{
    params : IRouteParams;
}

interface IRouteParams{
    type : string;
}

export class JoinUsComponent extends React.Component<IJoinUsComponent,{}>{

    constructor(props){
        super(props);
    }

    checkIdentity(type:string) : string{        
        let identity : string;

        switch(parseInt(type))
        {
            case Constants.SignInTypes.Helper:
                identity = 'Someone who wants to Help';
                break;
            case Constants.SignInTypes.Inneed:
                identity = 'Someone who might need Help';
                break;
            case Constants.SignInTypes.Organisation:
                identity = 'Organisation';
                break;
            case Constants.SignInTypes.Person:
                identity = 'Someone who is not sure what to do';
                break;
            default : 

        }

        return identity;
    }


    render(){

        const { type } : any = this.props.params;
        let identity : string = this.checkIdentity(type);

        return(
            <div>
                <h2>JOIN US!!!</h2>
                <p>You are trying to join our awesome website as {identity}</p>
            </div>
        )
    }
}