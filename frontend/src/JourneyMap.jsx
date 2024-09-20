import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix the default icon issue with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const JourneyMap = ({ departureStation, returnStation }) => {
  const departureStationPosition = [departureStation.y, departureStation.x];
  const returnStationPosition = [returnStation.y, returnStation.x];

  // Calculate the midpoint between departure and return stations
  const centerPosition = [
    (departureStation.y + returnStation.y) / 2, // Average of latitudes
    (departureStation.x + returnStation.x) / 2, // Average of longitudes
  ];

  return (
    <MapContainer
      center={centerPosition}
      zoom={12}
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker for the departure station */}
      <Marker position={departureStationPosition}>
        <Popup>
          {departureStation.name} <br /> {departureStation.address}
        </Popup>
      </Marker>

      {/* Marker for the return station */}
      <Marker position={returnStationPosition}>
        <Popup>
          {returnStation.name} <br /> {returnStation.address}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default JourneyMap;
