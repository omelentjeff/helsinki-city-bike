import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function DataContainer({ selectedButton }) {
  return (
    <>
      {selectedButton === "journeys" && (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Journey Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Add your table rows and cells here */}
              <TableRow>
                <TableCell>Sample Data</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {selectedButton === "stations" && (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Station Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Add your table rows and cells here */}
              <TableRow>
                <TableCell>Sample Data</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {selectedButton === "map" && (
        <Box sx={{ marginTop: 4, height: "500px" }}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      )}
    </>
  );
}
