import React from "react";
import JourneyTableComponent from "./JourneyTableComponent";
import StationTableComponent from "./StationTableComponent";

export default function DataContainer({ selectedButton }) {
  return (
    <>
      {selectedButton === "journeys" && <JourneyTableComponent />}
      {selectedButton === "stations" && <StationTableComponent />}
    </>
  );
}
