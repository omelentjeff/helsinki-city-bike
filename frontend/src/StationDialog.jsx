import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Grid, CircularProgress } from "@mui/material";
import StationMap from "./StationMap";
import { fetchSingleData } from "./apiService";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function StationDialog({ station, text }) {
  const [open, setOpen] = useState(false);
  const [stationDetails, setStationDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
    setIsLoading(true);

    try {
      const details = await fetchSingleData("stations", station.id);
      setStationDetails(details);
    } catch (error) {
      console.error("Failed to fetch station details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStationDetails(null);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {text}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="md"
      >
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "300px" }}
          >
            <CircularProgress />
          </Box>
        ) : (
          stationDetails && (
            <>
              <DialogTitle
                sx={{
                  m: 0,
                  p: 2,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 24,
                  color: "#333",
                }}
                id="customized-dialog-title"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocationOnIcon
                    sx={{ color: "blue", mr: 1, fontSize: "32px" }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      align="center"
                      sx={{ color: "#333", fontWeight: "bold" }}
                    >
                      {stationDetails.name}
                    </Typography>
                    <Typography align="center" sx={{ color: "#555" }}>
                      {stationDetails.address}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <Grid
                  container
                  spacing={2}
                  sx={{ mb: 2 }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#E3F2FD",
                        color: "#333",
                        borderRadius: "10px",
                        p: 0.6,
                        width: "80%",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        align="center"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        Number of journeys starting
                      </Typography>
                      <Typography align="center" sx={{ color: "#555" }}>
                        {stationDetails.numberOfJourneysStarting}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#E3F2FD",
                        color: "#333",
                        borderRadius: "10px",
                        p: 0.6,
                        width: "80%",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        align="center"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        Number of journeys ending
                      </Typography>
                      <Typography align="center" sx={{ color: "#555" }}>
                        {stationDetails.numberOfJourneysReturning}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#E3F2FD",
                        color: "#333",
                        borderRadius: "10px",
                        p: 0.6,
                        width: "80%",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        align="center"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        Average journey distance starting
                      </Typography>
                      <Typography align="center" sx={{ color: "#555" }}>
                        {stationDetails.averageDepartingJourneyDistance} m
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#E3F2FD",
                        color: "#333",
                        borderRadius: "10px",
                        p: 0.6,
                        width: "80%",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        align="center"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        Average journey distance returning
                      </Typography>
                      <Typography align="center" sx={{ color: "#555" }}>
                        {stationDetails.averageReturningJourneyDistance} m
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ mt: 2 }}>
                      <StationMap station={stationDetails} />
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
}
