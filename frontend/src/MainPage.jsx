import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MyButton from "./MyButton";
import DataContainer from "./DataContainer";

export default function MainPage() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [journeyData, setJourneyData] = useState([]);
  const [stationData, setStationData] = useState([]);
  const [journeyTotalPages, setJourneyTotalPages] = useState(0);
  const [stationTotalPages, setStationTotalPages] = useState(0);

  const fetchStationData = (page = 0) => {
    fetch(`http://localhost:8080/api/stations?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setStationData(data.content);
        setStationTotalPages(data.totalPages);
      })
      .catch((error) => console.error("Error fetching station data:", error));
  };

  const fetchJourneyData = (page = 0) => {
    fetch(`http://localhost:8080/api/journeys?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setJourneyData(data.content);
        setJourneyTotalPages(data.totalPages);
      })
      .catch((error) => console.error("Error fetching journey data:", error));
  };

  useEffect(() => {
    // Fetch initial station data
    fetchStationData(0);
    fetchJourneyData(0);
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
          journeyTotalPages={journeyTotalPages}
          stationTotalPages={stationTotalPages}
          fetchStationData={fetchStationData} // Pass down the fetching function
          fetchJourneyData={fetchJourneyData} // Pass down the fetching function
        />
      )}
    </Container>
  );
}
