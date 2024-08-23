import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { fetchSingleData } from "./apiService";
import MapComponent from "./StationMap";

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
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (!station) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography variant="h6">No station found</Typography>
      </Grid>
    );
  }

  return (
    <div>
      <Grid container>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackClick}
            sx={{ margin: 2 }}
          >
            Back to Stations
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        spacing={2}
        style={{ marginTop: 20 }}
      >
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                align="center"
                gutterBottom
              >
                Station Details
              </Typography>
              <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                {station.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Address: {station.address}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                City: {station.city}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <MapComponent station={station} />
        </Grid>
      </Grid>
    </div>
  );
}
