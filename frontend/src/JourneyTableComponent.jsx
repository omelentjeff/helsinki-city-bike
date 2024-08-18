import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function JourneyTableComponent({ data }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Departure Time</TableCell>
            <TableCell>Return Time</TableCell>
            <TableCell>Departure Station</TableCell>
            <TableCell>Return Station</TableCell>
            <TableCell>Covered Distance</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.departureTime}</TableCell>
              <TableCell>{row.returnTime}</TableCell>
              <TableCell>{row.departureStation.name}</TableCell>
              <TableCell>{row.returnStation.name}</TableCell>
              <TableCell>{row.coveredDistance}</TableCell>
              <TableCell>{row.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
