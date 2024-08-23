import React from "react";
import JourneyTable from "./JourneyTable";
import StationTable from "./StationTable";

export default function DataContainer({ selectedButton }) {
  return (
    <>
      {selectedButton === "journeys" && <JourneyTable />}
      {selectedButton === "stations" && <StationTable />}
    </>
  );
}
