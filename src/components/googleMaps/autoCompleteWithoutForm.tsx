import * as React from 'react'
import {render, findDOMNode} from 'react-dom'
import {observer} from 'mobx-react';
import {observable} from 'mobx';
let Map = require('google-maps-react').Map;
let Marker = require('google-maps-react').Marker;
let GoogleApiWrapper = require('google-maps-react').GoogleApiWrapper;

import { IAddressDetails, IPosition } from '../interfaces';
import { Constants } from '../constants';

const styles = require('./autocomplete.module.css');

interface IContents{
  google : any;
  map : any;
  onPlaceSelected : (place : IAddressDetails) => void;
}

interface IState{
  initialPosition : IPosition;
  position: IPosition;
  place : any;
  places : Array<any>;
  //selectedPlaces : Array<IAddressDetails>;
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
      //selectedPlaces : []
    }
  }

  onPlaceSelected = (place : IAddressDetails) => {
    this.props.onPlaceSelected(place);
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
            
      this.setState({
        place: place,
        position: place.geometry.location,
        places : [...this.state.places, ...place],
        //selectedPlaces : [...this.state.selectedPlaces, selectedPlace],
        initialPosition : null
      });

      let selectedPlace = this.extractAddressDetails(place.address_components);

      this.onPlaceSelected(selectedPlace);
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
          lat : null,
          lng : null
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

      addressDetails.position = {
        lng : this.state.position.lng(),
        lat : this.state.position.lat()
      }

      return addressDetails;
  }

  renderSelectedPlaces = (selectedPlace : IAddressDetails, index : number) => {
    return (
      <div key={index} className="form-inline">
        <div className="form-group">
            <label htmlFor="fullName">Street No</label> 
            <input 
                className="form-control"
                id="fullName" 
                type="text" 
                ref="fullName" 
                placeholder="Full Name"
                value={selectedPlace.streetNumber}/>               
        </div>
        <div className="form-group">
            <label htmlFor="fullName">Street</label> 
            <input 
                className="form-control"
                id="fullName" 
                type="text" 
                ref="fullName" 
                placeholder="Full Name"
                value={selectedPlace.route}/>               
        </div>
        <div className="form-group">
            <label htmlFor="fullName">PostCode</label> 
            <input 
                className="form-control"
                id="fullName" 
                type="text" 
                ref="fullName" 
                placeholder="Full Name"
                value={selectedPlace.postalCode}/>               
        </div>
        <div className="form-group">
            <label htmlFor="fullName">Suburb</label> 
            <input 
                className="form-control"
                id="fullName" 
                type="text" 
                ref="fullName" 
                placeholder="Full Name"
                value={selectedPlace.locality}/>               
        </div>
        <div className="form-group">
            <label htmlFor="fullName">Country</label> 
            <input 
                className="form-control"
                id="fullName" 
                type="text" 
                ref="fullName" 
                placeholder="Full Name"
                value={selectedPlace.country}/>               
        </div>
        <div className="form-group">
            <label htmlFor="fullName">State</label> 
            <input 
                className="form-control"
                id="fullName" 
                type="text" 
                ref="fullName" 
                placeholder="Full Name"
                value={selectedPlace.administrativeAreaLevel1}/>               
        </div> 

        <hr />

      </div>
    )
  }

  render() {
    const props = this.props;
    const {position} = this.state;

    return (
        <div>

            <input
                className="form-control"                
                ref='autocomplete'
                type="text"
                placeholder="Enter a location" />
            {/*
            <input
              className={styles.button}
              type='submit'
              value='Go' />*/}

          {/*
          <div>
            <ul>
                {
                    this.state.selectedPlaces.map((selectedPlace, index) => {
                        return  (this.renderSelectedPlaces(selectedPlace, index))
                    })
                }
            </ul>
          </div>
          */}
        </div>
    )
  }
}

interface IMapWrapper {
  onPlaceSelected : (addressDetails : IAddressDetails) => void;
}

@observer
class MapWrapper extends React.Component<any,{}>{
  @observable defaultPosition : IPosition;

  constructor(props){
    super(props);

    this.defaultPosition = {
        lat :  -37.81361100000001,
        lng : 144.96305600000005      
    }
  }

  render() {
    const props = this.props;
    const {google} = this.props;

    if(props.loaded){
      return (
        <Map google={google}
            containerStyle={{ position:'relative', height : '100%', width : '100%'}}            
            visible={false}
            initialCenter={this.defaultPosition} >
              <Contents {...props} onPlaceSelected={this.props.onPlaceSelected} />
        </Map>
      );
    }else{
      return <h1>Map is loading....</h1>
    }
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDu78RCANSS6KHwVX-uj6KTHUlzOIFqnjw',
  libraries: ['places']
})(MapWrapper)