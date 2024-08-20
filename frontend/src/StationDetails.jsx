import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { fetchSingleData } from "./apiService";

export default function StationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [station, setStation] = useState(null);

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const data = await fetchSingleData("stations", id);
        setStation(data);
      } catch (error) {
        console.error("Error fetching station data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStationData(id);
  }, [id]);

  const handleBackClick = () => {
    const previousPage = location.state?.page || 1;
    navigate("/stations", { state: { page: previousPage } });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!station) {
    return <div>No station found</div>;
  }

  return (
    <div>
      <h2>Station Details for ID: {id}</h2>
      <p>Name: {station.name}</p>
      <p>Address: {station.address}</p>
      <p>City: {station.city}</p>
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
