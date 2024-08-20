import React from "react";
import { useParams } from "react-router-dom";

export default function StationDetails() {
  const { id } = useParams();

  // Fetch the station details based on the ID
  // Example: const stationDetails = fetchStationDetails(id);

  return (
    <div>
      <h2>Station Details for ID: {id}</h2>
      {/* Render the station details here */}
    </div>
  );
}
