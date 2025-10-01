import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapPage = () => {
  // Get default coordinates from env or use fallback
  const defaultLat = parseFloat(process.env.REACT_APP_DEFAULT_LAT) || 40.7128;
  const defaultLng = parseFloat(process.env.REACT_APP_DEFAULT_LNG) || -74.0060;
  const defaultZoom = parseInt(process.env.REACT_APP_DEFAULT_ZOOM) || 13;

  const position = [defaultLat, defaultLng];

  return (
    <div className="page-container">
      <div className="container">
        <h1>Waste Reports Map</h1>
        <p>View all waste reports on an interactive map</p>
        <div style={{ height: '600px', width: '100%', marginTop: '20px' }}>
          <MapContainer
            center={position}
            zoom={defaultZoom}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Sample waste report location. <br /> More reports will appear here.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapPage;

