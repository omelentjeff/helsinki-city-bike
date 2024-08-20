import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";

import { fetchData } from "./apiService";

function formatToMinsAndSeconds(duration) {
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${minutes}m ${seconds}s`;
}

const columns = [
  { id: "departureTime", label: "Departure Time", minWidth: 170 },
  { id: "returnTime", label: "Return Time", minWidth: 170 },
  { id: "departureStation", label: "Departure Station", minWidth: 170 },
  { id: "returnStation", label: "Return Station", minWidth: 170 },
  {
    id: "coveredDistance",
    label: "Covered Distance (m)",
    minWidth: 170,
    align: "right",
  },
  {
    id: "duration",
    label: "Duration",
    minWidth: 170,
    align: "right",
    format: (value) => formatToMinsAndSeconds(value),
  },
];

export default function JourneyTableComponent({}) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(location.state?.page || 1);

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const data = await fetchData("journeys", page - 1);
        setData(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching station data:", error);
      }
    };

    fetchStationData();
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (
                      column.id === "departureStation" ||
                      column.id === "returnStation"
                    ) {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value.name}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", padding: 2 }}
      />
    </Paper>
  );
}
