import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HomePageBtn from "./HomePageBtn";

export default function HomePage() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <HomePageBtn content="Journeys" />
        <HomePageBtn content="Stations" />
      </Box>
    </Container>
  );
}
