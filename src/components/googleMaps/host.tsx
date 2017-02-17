import * as React from 'react';
import { GoogleMapSimple } from './simple';
import GoogleMapClickableMarkers from './clickableMarkers';
import AutoComplete from './autoComplete';
import AutoCompleteWithoutForm from './autoCompleteWithoutForm'
import { IMarker, IPosition } from '../interfaces';

export class GoogleMapHost extends React.Component<{},{}>{
    markers : Array<IMarker>;
    defaultPosition : IPosition;

    onMarkerClick = (e) => {
        console.log('Clicked on Marker => {0}', e);
    }

    constructor(){
        super();
        
        this.defaultPosition = {
            lat :  -37.81361100000001,
            lng : 144.96305600000005      
        }

        this.markers = [            
            {
                name : 'Marker 1',
                position : { lat: 37.778519, lng: -122.405640},
                extraInfo : '11'
            },
            {
                name : 'Marker 2',
                position : { lat: 37.759703, lng: -122.428093},
                extraInfo : '22'
            },
            {
                name : 'Marker 3',
                position : { lat : -37.809912, lng : 145.26118900000006 },
                extraInfo : '33'
            }                        
        ]
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
                                <GoogleMapClickableMarkers data={this.markers} defaultPosition={this.defaultPosition} />
                                {/*<AutoComplete />*/}
                                {/*<AutoCompleteWithoutForm />*/}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}