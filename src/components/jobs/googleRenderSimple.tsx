import * as _ from "lodash";
import * as React from "react";

let withGoogleMap = require('react-google-maps').withGoogleMap;
let GoogleMap = require('react-google-maps').GoogleMap;
let Marker = require('react-google-maps').Marker;

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={5}
    center={{ lat: -25.363882, lng: 131.044922 }}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

export class GoogleRenderSimple extends React.Component<{},{}> {
    _mapComponent : any;
  
    state = {
        markers: [{
            position: {
            lat: 25.0112183,
            lng: 121.52067570000001,
            },
            key: `Taiwan`,
            defaultAnimation: 2,
        }],
    };

    constructor(){
        super();
    }

    handleMapLoad = (map) => {
        
        this._mapComponent = map;
        if (map) {
        console.log(map.getZoom());
        }
    }

    handleMapClick = (event) => {
        const nextMarkers = [
        ...this.state.markers,
        {
            position: event.latLng,
            defaultAnimation: 2,
            key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
        ];
        this.setState({
        markers: nextMarkers,
        });
    }

    handleMarkerRightClick = (targetMarker) => {
        /*
        * All you modify is data, and the view is driven by data.
        * This is so called data-driven-development. (And yes, it's now in
        * web front end and even with google maps API.)
        */
        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
        markers: nextMarkers,
        });
    }

    render() {

        return (
            <div className="container">
                <div className="section-title-center">
                    <h1>Welcome to Charity Fund Pool</h1>				
                </div>
                <div className="text-center">
                    <div className="row">
                        <div className="col-sm-12">
                            <div style={{height: '500px'}}>
                                <GettingStartedGoogleMap
                                    containerElement={
                                    <div style={{ height: '500px' }} />
                                    }
                                    mapElement={
                                    <div style={{ height: '500px' }} />
                                    }
                                    onMapLoad={this.handleMapLoad}
                                    onMapClick={this.handleMapClick}
                                    markers={this.state.markers}
                                    onMarkerRightClick={this.handleMarkerRightClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}