import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MyButton from "./MyButton";
import DataContainer from "./DataContainer";

export default function MainPage() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [journeyData, setJourneyData] = useState([]);
  const [stationData, setStationData] = useState([]);

  useEffect(() => {
    // Fetch journey data
    fetch("http://localhost:8080/api/journeys")
      .then((response) => response.json())
      .then((data) => {
        console.log("Journey data:", data); // Debugging journey data
        setJourneyData(data.content);
      })
      .catch((error) => console.error("Error fetching journey data:", error));

    // Fetch station data
    fetch("http://localhost:8080/api/stations")
      .then((response) => response.json())
      .then((data) => {
        console.log("Station data:", data); // Debugging station data
        setStationData(data.content);
      })
      .catch((error) => console.error("Error fetching station data:", error));
  }, []);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <MyButton
          label="Journeys"
          onClick={() => handleButtonClick("journeys")}
        />
        <MyButton
          label="Stations"
          onClick={() => handleButtonClick("stations")}
        />
        <MyButton label="Map" onClick={() => handleButtonClick("map")} />
      </Box>
      {selectedButton && (
        <DataContainer
          selectedButton={selectedButton}
          journeyData={journeyData}
          stationData={stationData}
        />
      )}
    </Container>
  );
}
