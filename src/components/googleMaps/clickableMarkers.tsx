import * as React from 'react'
import {observable } from 'mobx';
import {observer} from 'mobx-react';

let Map = require('google-maps-react').Map;
let Marker = require('google-maps-react').Marker;
let InfoWindow = require('google-maps-react').InfoWindow;
let GoogleApiWrapper = require('google-maps-react').GoogleApiWrapper;

interface IMapState {
    showingInfoWindow: boolean;
    activeMarker : any;
    selectedPlace? : any;
    markerExtraInfo : string;
}

interface IGoogleMapClickableMarkers{
    loaded : boolean;
    google : any;
}

interface IMarkerPosition{
    lat : number;
    lng : number;
}

interface IMarker {
    onClick : (props, marker, e) => void;
    position : IMarkerPosition;
    name : string;
    extraInfo : string;
}

export class GoogleMapClickableMarkers extends React.Component<IGoogleMapClickableMarkers,IMapState>{
    markers : Array<IMarker>;

    constructor(props){
        super(props);

        this.state = {
            showingInfoWindow : false,
            activeMarker : {},
            selectedPlace : {},
            markerExtraInfo : ''
        }    

        this.markers = [            
            {
                name : 'Marker 1',
                position : { lat: 37.778519, lng: -122.405640},
                onClick : this.onMarkerClick,
                extraInfo : '11'
            },
            {
                name : 'Marker 2',
                position : { lat: 37.759703, lng: -122.428093},
                onClick : this.onMarkerClick,
                extraInfo : '22'
            },
            {
                name : 'Marker 3',
                position : { lat : -37.809912, lng : 145.26118900000006 },
                onClick : this.onMarkerClick,
                extraInfo : '33'
            }                        
        ]           
    }

    getMarkerExtraDetails = (name : string) : string => {
        //TODO implement.
        return 'Fuck Ya => ' + name;
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            markerExtraInfo : this.getMarkerExtraDetails(props.name)
        });
    }

    onInfoWindowClose = () => {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            markerExtraInfo : ''
        });
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            markerExtraInfo : ''
            });
        }
    }

    renderMarker = (key: number, marker : IMarker) => {
        return(
        <Marker
            key={key}
            onClick={this.onMarkerClick}
            name={marker.name}
            position={marker.position}
        />            
        )
    }

    render() {
        return (
            <Map google={this.props.google}
                style={{width: '100%', height: '100%', position: 'relative'}}
                className={'map'}
                zoom={14}
                onClick={this.onMapClicked}>
            
            {
                this.markers.map((marker : IMarker, index) => {
                    return this.renderMarker(index,marker);
                })
            }


            { this.state.selectedPlace && 
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}>
                    <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                    <p>Details: {this.state.markerExtraInfo}</p>
                    </div>
                </InfoWindow>
            }
            </Map>
        )
    }

}

/*
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDu78RCANSS6KHwVX-uj6KTHUlzOIFqnjw',
})(GoogleMapClickableMarkers)*/