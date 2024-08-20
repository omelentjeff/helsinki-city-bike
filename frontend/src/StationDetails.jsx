import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { fetchSingleData } from "./apiService";

export default function StationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [station, setStation] = React.useState(null);

  const fetchStationData = async (id) => {
    try {
      const data = await fetchSingleData("stations", id);
      setStation(data); // Assuming data is the station object itself
    } catch (error) {
      console.error("Error fetching station data:", error);
    } finally {
      setIsLoading(false); // Ensure loading state is turned off after fetching
    }
  };

  useEffect(() => {
    fetchStationData(id);
  }, [id]);

  const handleBackClick = () => {
    navigate("/");
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
