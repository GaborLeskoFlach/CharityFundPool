import * as React from 'react'
import {render, findDOMNode} from 'react-dom'

let Map = require('google-maps-react').Map;
let Marker = require('google-maps-react').Marker;
let GoogleApiWrapper = require('google-maps-react').GoogleApiWrapper;

import { IAddressDetails } from '../interfaces';

import { Constants } from '../constants';

const styles = require('./autocomplete.module.css');

interface IContents{
  google : any;
  map : any;
}

interface IPosition{
  lat : number;
  lng : number
}

interface IState{
  initialPosition : IPosition;
  position: IPosition;
  place : any;
  places : Array<any>;
  selectedPlaces : Array<IAddressDetails>;
}

class Contents extends React.Component<IContents,IState>{
  
  constructor(){
    super();

    this.state = {
      place : null,
      initialPosition : {
        lat :  -37.81361100000001,
        lng : 144.96305600000005
      },
      position : null,
      places : [],
      selectedPlaces : []
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  componentDidMount = () => {
    this.renderAutoComplete();
  }

  componentDidUpdate = (prevProps : IContents) => {
    const {google, map} = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }

  renderAutoComplete = () => {
    const {google, map} = this.props;

    if (!google || !map) return;

    const aref = this.refs['autocomplete'];
    const node = findDOMNode(aref);
    var autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({
        place: place,
        position: place.geometry.location,
        places : [...this.state.places, ...place],
        selectedPlaces : [...this.state.selectedPlaces, this.extractAddressDetails(place.address_components)],
        initialPosition : null
      })
    })
  }

  extractAddressDetails = (addressComponents : Array<any>) : IAddressDetails => {
      let addressDetails : IAddressDetails = {
        streetNumber : '',
        route : '',
        postalCode : '',
        locality : '',
        country : '',
        administrativeAreaLevel1 : '',
        administrativeAreaLevel2 : '',
        position : {
          lng : null,
          lat : null
        }
      };

      addressComponents.map((addressComponent) => {
        const value : string = addressComponent.long_name;
        const type : string = addressComponent.types[0];

        switch(type){
            case Constants.googleAddressDetails_streetNumber :
                addressDetails.streetNumber = value;
                break;
            case Constants.googleAddressDetails_route :
                addressDetails.route = value;
                break;
            case Constants.googleAddressDetails_postalCode :
                addressDetails.postalCode = value;
                break;
            case Constants.googleAddressDetails_locality :
                addressDetails.locality = value;
                break;
            case Constants.googleAddressDetails_country : 
                addressDetails.country = value;
                break;
            case Constants.googleAddressDetails_adminAreaLevel1 :
                addressDetails.administrativeAreaLevel1 = value;
                break;
            case Constants.googleAddressDetails_adminAreaLevel2 :
                addressDetails.administrativeAreaLevel2 = value;
                break;
        }
      });

      return addressDetails;
  }

  renderSelectedPlaces = (selectedPlace : IAddressDetails, index : number) => {
    return <li key={index}>StreetNo: {selectedPlace.streetNumber}</li>
  }

  render() {
    const props = this.props;
    const {position} = this.state;

    return (
      <div className={styles.flexWrapper}>
        <div className={styles.left}>
          <form>
            <input                
                ref='autocomplete'
                type="text"
                placeholder="Enter a location" />
            {/*
            <input
              className={styles.button}
              type='submit'
              value='Go' />*/}
          </form>
          {/*
          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div>
          */}
          <div>
            <ul>
                {
                    this.state.selectedPlaces.map((selectedPlace, index) => {
                        return  this.renderSelectedPlaces(selectedPlace, index)
                    })
                }
            </ul>
          </div>

        </div>
        <div className={styles.right}>
          <Map {...props}
              containerStyle={{
                position: 'relative',
                height: '100vh',
                width: '100%'
              }}
              initialCenter={this.state.initialPosition}
              center={position}
              centerAroundCurrentLocation={false}>
                {
                  this.state.places.map((place, index) => {
                    return <Marker key={index} position={place.geometry.location} />
                  })
                }
          </Map>
        </div>
      </div>
    )
  }
}

class MapWrapper extends React.Component<any,{}>{
  
  constructor(props){
    super(props);
  }
  
  render() {
    const props = this.props;
    const {google} = this.props;

    if(props.loaded){
      return (
        <Map google={google}
            className={'map'}
            visible={false}>
              <Contents {...props} />
        </Map>
      );
    }else{
      return <h1>Map is loading....</h1>
    }
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyDu78RCANSS6KHwVX-uj6KTHUlzOIFqnjw',
  libraries: ['places','visualization']
})(MapWrapper)