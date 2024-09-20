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
import { Box, Grid } from "@mui/material";
import StationMap from "./StationMap";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function StationDialog({ station, text }) {
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
      <Button variant="outlined" onClick={handleClickOpen}>
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
              justifyContent: "center",
            }}
          >
            <LocationOnIcon sx={{ color: "blue", mr: 1, fontSize: "32px" }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                align="center"
                sx={{ color: "#333", fontWeight: "bold" }}
              >
                {station.name}
              </Typography>
              <Typography align="center" sx={{ color: "#555" }}>
                {station.address}
              </Typography>
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
                  Average journey time starting
                </Typography>
                <Typography align="center" sx={{ color: "#555" }}>
                  55m
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
                  Average journey time starting
                </Typography>
                <Typography align="center" sx={{ color: "#555" }}>
                  55m
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
                  Average journey time starting
                </Typography>
                <Typography align="center" sx={{ color: "#555" }}>
                  55m
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
                  Average journey time starting
                </Typography>
                <Typography align="center" sx={{ color: "#555" }}>
                  55m
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box>
            {" "}
            {/* Adjust the margin as needed */}
            <StationMap station={station} />
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
