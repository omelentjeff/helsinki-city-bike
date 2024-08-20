import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function StationDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackClick = () => {
    navigate("/"); // Navigate back to the main stations page
  };

  return (
    <div>
      <h2>Station Details for ID: {id}</h2>

      <Button
        variant="contained"
        color="primary"
        onClick={handleBackClick}
        sx={{ marginTop: 2 }}
      >
        Back to Stations
      </Button>
    </div>
  );
}
