import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import MapComponent from "./StationMap";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Grid } from "@mui/material";
import StationMap from "./StationMap";
import JourneyMap from "./JourneyMap";

function formatToHMS(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

function formatDateTime(dateTime) {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateTime).toLocaleString("en-US", options);
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function JourneyDialog({ journey, text }) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        //sx={{ backgroundColor: "blue", color : "white" }}
      >
        {text}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={fullWidth}
        maxWidth="md"
      >
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
              justifyContent: "space-around",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <LocationOnIcon sx={{ color: "blue", mr: 1, fontSize: "32px" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  align="center"
                  sx={{ color: "#333", fontWeight: "bold" }}
                >
                  {journey.departureStation.name}
                </Typography>
                <Typography align="center" sx={{ color: "#555" }}>
                  {journey.departureStation.address}
                </Typography>
              </Box>
            </Box>
            <ArrowForwardIcon sx={{ color: "blue", fontSize: "26px" }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <LocationOnIcon sx={{ color: "blue", mr: 1, fontSize: "32px" }} />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  align="center"
                  sx={{ color: "#333", fontWeight: "bold" }}
                >
                  {journey.returnStation.name}
                </Typography>
                <Typography align="center" sx={{ color: "#555" }}>
                  {journey.returnStation.address}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
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
                  Journey Start Time
                </Typography>
                <Typography align="center" sx={{ color: "#555" }}>
                  {formatDateTime(journey.departureTime)}
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
                  Journey End Time
                </Typography>
                <Typography align="center" sx={{ color: "#555" }}>
                  {formatDateTime(journey.returnTime)}
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
                  Journey Time
                </Typography>
                <Typography align="center" sx={{ color: "#555" }}>
                  {formatToHMS(journey.duration)}
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
                  Journey Length
                </Typography>
                <Typography align="center" sx={{ color: "#555" }}>
                  {journey.coveredDistance} m
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box>
            {" "}
            {/* Adjust the margin as needed */}
            <JourneyMap
              departureStation={journey.departureStation}
              returnStation={journey.returnStation}
            />
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
