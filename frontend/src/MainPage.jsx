import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MyButton from "./MyButton";
import DataContainer from "./DataContainer";
import { fetchData } from "./apiService";
import { useNavigate } from "react-router-dom";

export default function MainPage({ initialSelected = null }) {
  const [selectedButton, setSelectedButton] = useState(initialSelected);
  const [journeyData, setJourneyData] = useState([]);
  const [stationData, setStationData] = useState([]);
  const [journeyTotalPages, setJourneyTotalPages] = useState(0);
  const [stationTotalPages, setStationTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStationData(0);
    fetchJourneyData(0);
  }, []);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    navigate(`/${button}`);
  };

  const fetchStationData = async (page = 0) => {
    try {
      const data = await fetchData("stations", page);
      setStationData(data.content);
      setStationTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching station data:", error);
    }
  };

  const fetchJourneyData = async (page = 0) => {
    try {
      const data = await fetchData("journeys", page);
      setJourneyData(data.content);
      setJourneyTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching journey data:", error);
    }
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
          marginBottom: 2,
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
          fetchStationData={fetchStationData}
          fetchJourneyData={fetchJourneyData}
        />
      )}
    </Container>
  );
}
