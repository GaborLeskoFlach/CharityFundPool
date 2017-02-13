import * as React from 'react'
import {observable } from 'mobx';
import {observer} from 'mobx-react';


let Map = require('google-maps-react').Map;
//let GoogleApiWrapper = require('google-maps-react').GoogleApiWrapper;

interface IMapState {
      showingInfoWindow: boolean;
      activeMarker? : any;
      selectedPlace? : any;
}

interface IGoogleMapSimple{
    loaded : boolean;
    google : any;
}

@observer
export class GoogleMapSimple extends React.Component<IGoogleMapSimple,{}>{
    @observable mapState : IMapState;

    constructor(){
        super();

        this.mapState = {
            showingInfoWindow : false,
            activeMarker : {},
            selectedPlace : {}
        }
    }

  onMapMoved = (props, map) => {
    const center = map.center;
  }

  onMarkerClick = (props, marker, e) => {
    this.mapState = {
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    };
  }

  onInfoWindowClose = () => {
    this.mapState = {
      showingInfoWindow: false,
      activeMarker: null
    };
  }

  onMapClicked = (props) => {
    if (this.mapState.showingInfoWindow) {
      this.mapState = {
        showingInfoWindow: false,
        activeMarker: null
      }
    }
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <Map google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}
          containerStyle={{}}
          centerAroundCurrentLocation={true}
          onClick={this.onMapClicked}
          onDragend={this.onMapMoved} />
    )
  }
}

