import * as React from 'react'
import {render, findDOMNode} from 'react-dom'

let Map = require('google-maps-react').Map;
let Marker = require('google-maps-react').Marker;
let GoogleApiWrapper = require('google-maps-react').GoogleApiWrapper;

const styles = require('./autocomplete.module.css');

interface IContents{
  google : any;
  map : any;
}

interface IState{
  position:any;
  place : any;
}

class Contents extends React.Component<IContents,IState>{
  
  constructor(){
    super();

    this.state = {
      place : null,
      position : null
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
        position: place.geometry.location
      })
    })
  }

  render() {
    const props = this.props;
    const {position} = this.state;

    return (
      <div className={styles.flexWrapper}>
        <div className={styles.left}>
          <form onSubmit={this.onSubmit}>
            <input
              ref='autocomplete'
              type="text"
              placeholder="Enter a location" />
            <input
              className={styles.button}
              type='submit'
              value='Go' />
          </form>
          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div>
        </div>
        <div className={styles.right}>
          <Map {...props}
              containerStyle={{
                position: 'relative',
                height: '100vh',
                width: '100%'
              }}
              center={this.state.position}
              centerAroundCurrentLocation={false}>
                <Marker position={this.state.position} />
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