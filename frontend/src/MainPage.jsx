import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MyButton from "./MyButton";
import DataContainer from "./DataContainer";
import { useNavigate } from "react-router-dom";

export default function MainPage({ initialSelected = null }) {
  const [selectedButton, setSelectedButton] = useState(initialSelected);
  const navigate = useNavigate();

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    navigate(`/${button}`);
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
      {!selectedButton && (
        <Box
          sx={{
            textAlign: "center",
            marginTop: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to the Dashboard
          </Typography>
          <Typography variant="body1">
            Please select one of the options above to view journeys, stations,
            or explore the map.
          </Typography>
        </Box>
      )}
      {selectedButton && <DataContainer selectedButton={selectedButton} />}
    </Container>
  );
}
