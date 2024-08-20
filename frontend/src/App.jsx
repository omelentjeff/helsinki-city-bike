import * as React from "react";
import Container from "@mui/material/Container";
import MyAppBar from "./MyAppBar.jsx";
import MainPage from "./MainPage.jsx";
import StationDetails from "./StationDetails.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <MyAppBar />
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} /> {/* Main page route */}
          <Route path="/station/:id" element={<StationDetails />} />{" "}
          {/* Details page route */}
        </Routes>
      </Container>
    </Router>
  );
}
