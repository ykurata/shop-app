import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    return (
      <div className="map-outer">
        <div className="map-container">
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={{ lat: 43.65464, lng: -79.380678 }}
          >
            <Marker position={{ lat: 43.647587, lng: -79.377647 }} />
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 
})(MapContainer);
