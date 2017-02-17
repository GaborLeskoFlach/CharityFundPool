import * as React from 'react'
import {observable } from 'mobx';
import {observer} from 'mobx-react';

import { IMarker, IPosition } from '../interfaces';

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
    google? : any;
    loaded? : boolean;
    data : Array<IMarker>;
    defaultPosition : IPosition;
}

export class GoogleMapClickableMarkers extends React.Component<IGoogleMapClickableMarkers,IMapState>{

    constructor(props){
        super(props);

        this.state = {
            showingInfoWindow : false,
            activeMarker : {},
            selectedPlace : {},
            markerExtraInfo : ''
        }        
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

        if(this.props.loaded){
            return (
                <Map google={this.props.google}
                    containerStyle={{ position:'relative', height : '300px', width : '100%'}}         
                    className={'map'}
                    zoom={14}
                    initialCenter={this.props.defaultPosition}
                    onClick={this.onMapClicked}>                
                {
                    this.props.data.map((marker : IMarker, index) => {
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
        }else{
            return <h1>Map is loading....</h1>
        }


    }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDu78RCANSS6KHwVX-uj6KTHUlzOIFqnjw'
})(GoogleMapClickableMarkers)