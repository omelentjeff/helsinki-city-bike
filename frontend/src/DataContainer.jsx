import React from "react";
import JourneyTableComponent from "./JourneyTableComponent";
import StationTableComponent from "./StationTableComponent";

export default function DataContainer({
  selectedButton,
  journeyData,
  stationData,
  journeyTotalPages,
  stationTotalPages,
  fetchStationData,
  fetchJourneyData,
}) {
  return (
    <>
      {selectedButton === "journeys" && (
        <JourneyTableComponent
          data={journeyData}
          totalPages={journeyTotalPages}
          fetchJourneyData={fetchJourneyData}
        />
      )}
      {selectedButton === "stations" && (
        <StationTableComponent
          data={stationData}
          totalPages={stationTotalPages}
          fetchStationData={fetchStationData}
        />
      )}
    </>
  );
}
