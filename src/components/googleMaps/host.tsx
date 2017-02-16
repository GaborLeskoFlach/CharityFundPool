import * as React from 'react';
import { GoogleMapSimple } from './simple';
import { GoogleMapClickableMarkers } from './clickableMarkers';
import AutoComplete from './autoComplete';
import AutoCompleteWithoutForm from './autoCompleteWithoutForm'

export class GoogleMapHost extends React.Component<{},{}>{
    
    constructor(){
        super();
    }

    render(){
        return(
                <div className="container">
                    <div className="section-title-center">
                        <h1>Google Maps</h1>				
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="contact-form">
                                {/*<GoogleMapSimple loaded={true} google={window['google']} />*/}
                                {/*<GoogleMapClickableMarkers google={window['google']} loaded={true} />*/}
                                {/*<AutoComplete />*/}
                                <AutoCompleteWithoutForm />
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}