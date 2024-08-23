import React from "react";
import JourneyTable from "./JourneyTable";
import StationTable from "./StationTable";
import ClusterMap from "./ClusterMap";

export default function DataContainer({ selectedButton }) {
  return (
    <>
      {selectedButton === "journeys" && <JourneyTable />}
      {selectedButton === "stations" && <StationTable />}
      {selectedButton === "map" && <ClusterMap />}
    </>
  );
}
