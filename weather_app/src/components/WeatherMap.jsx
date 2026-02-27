import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const WeatherMap = ({ lat, lon, name }) => {
  if (!lat || !lon) return null;

  return (
    <div className="map-wrapper">
      <MapContainer center={[lat, lon]} zoom={9}>
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default WeatherMap;