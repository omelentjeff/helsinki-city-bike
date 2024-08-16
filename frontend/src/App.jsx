import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MyAppBar from "./MyAppBar.jsx";
import MainPage from "./MainPage.jsx";

export default function App() {
  return (
    <Container>
      <MyAppBar />
      <MainPage />
    </Container>
  );
}
