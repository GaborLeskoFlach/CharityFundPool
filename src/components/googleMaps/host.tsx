import * as React from 'react';
import { GoogleMapSimple } from './simple';
import { GoogleMapClickableMarkers } from './clickableMarkers';

export class GoogleMapHost extends React.Component<{},{}>{
    
    constructor(){
        super();
    }

    render(){
        return(
            /*<GoogleMapSimple loaded={true} google={window['google']} />*/
            <GoogleMapClickableMarkers loaded={true} google={window['google']} />
        )
    }
}