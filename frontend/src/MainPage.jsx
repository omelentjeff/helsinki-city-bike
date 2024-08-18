import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MyButton from "./MyButton";
import DataContainer from "./DataContainer";

export default function App() {
  const [selectedButton, setSelectedButton] = useState(null);

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
        <MyButton label="Journeys" />
        <MyButton label="Stations" />
        <MyButton label="Map" />
      </Box>
      {selectedButton && <DataContainer selectedButton={selectedButton} />}
    </Container>
  );
}
