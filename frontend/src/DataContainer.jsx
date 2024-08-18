import React from "react";
import JourneyTableComponent from "./JourneyTableComponent";
import StationTableComponent from "./StationTableComponent";

export default function DataContainer({
  selectedButton,
  journeyData,
  stationData,
}) {
  return (
    <>
      {selectedButton === "journeys" && (
        <JourneyTableComponent data={journeyData} />
      )}
      {selectedButton === "stations" && (
        <StationTableComponent data={stationData} />
      )}
    </>
  );
}
