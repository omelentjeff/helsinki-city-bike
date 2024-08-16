import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MyButton from "./MyButton";

export default function App() {
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
      </Box>
    </Container>
  );
}
