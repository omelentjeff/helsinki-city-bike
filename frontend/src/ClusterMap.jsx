import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { CircularProgress, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { fetchAllData } from "./apiService";

// Fix the default icon issue with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ClusterMap = () => {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [center, setCenter] = useState([51.505, -0.09]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStations = async () => {
      try {
        const data = await fetchAllData("stations");
        setStations(data);

        if (data.length > 0) {
          const latitudes = data.map((station) => station.y);
          const longitudes = data.map((station) => station.x);

          const avgLatitude =
            latitudes.reduce((acc, cur) => acc + cur, 0) / latitudes.length;
          const avgLongitude =
            longitudes.reduce((acc, cur) => acc + cur, 0) / longitudes.length;

          setCenter([avgLatitude, avgLongitude]);
          console.log(avgLatitude, avgLongitude);
        }
      } catch (err) {
        console.error("Error fetching station data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStations();
  }, []);

  const handleBackClick = () => {
    const previousPage = location.state?.page || 1;
    navigate("/", { state: { page: previousPage } });
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: 20,
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackClick}
            sx={{ margin: 2 }}
          >
            Home
          </Button>
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {stations.map((station, index) => (
              <Marker key={index} position={[station.y, station.x]}>
                <Popup>
                  {station.name} <br /> {station.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </>
      )}
    </>
  );
};

export default ClusterMap;
