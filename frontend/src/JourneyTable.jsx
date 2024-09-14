import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchData } from "./apiService";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import StationDialog from "./StationDialog";

function formatToHMS(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

function formatDateTime(dateTime) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateTime).toLocaleString("en-US", options);
}

const columns = [
  {
    id: "departureTime",
    label: "Departure Time",
    minWidth: 150,
    format: formatDateTime,
    sortable: true,
  },
  {
    id: "returnTime",
    label: "Return Time",
    minWidth: 150,
    format: formatDateTime,
    sortable: true,
  },
  {
    id: "departureStation",
    label: "Departure Station",
    minWidth: 140,
    sortable: false,
  },
  {
    id: "returnStation",
    label: "Return Station",
    minWidth: 140,
    sortable: false,
  },
  {
    id: "coveredDistance",
    label: "Covered Distance (m)",
    minWidth: 120,
    align: "right",
    sortable: true,
  },
  {
    id: "duration",
    label: "Duration",
    minWidth: 120,
    align: "right",
    format: formatToHMS,
    sortable: true,
  },
];

export default function JourneyTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(location.state?.page || 1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "departureTime",
    direction: "asc",
  });

  useEffect(() => {
    const fetchJourneyData = async () => {
      try {
        const sortParam = `${sortConfig.key},${sortConfig.direction}`;
        const data = await fetchData("journeys", page - 1, 10, sortParam);
        setData(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching journey data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJourneyData();
  }, [page, sortConfig]);

  const handleSort = (columnId) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column.sortable) return;

    let direction = "asc";
    setIsLoading(true);
    if (sortConfig.key === columnId) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    setSortConfig({ key: columnId, direction });
    setPage(1);
  };

  const renderSortIcon = (columnId) => {
    if (sortConfig.key === columnId) {
      return sortConfig.direction === "asc" ? (
        <ArrowDownwardIcon fontSize="small" />
      ) : (
        <ArrowUpwardIcon fontSize="small" />
      );
    }
    return <ArrowUpwardIcon fontSize="small" color="disabled" />;
  };

  const handleChangePage = (event, value) => {
    setIsLoading(true);
    setPage(value);
  };

  const handleStationClick = (stationId) => {
    navigate(`/stations/${stationId}`, {
      state: { from: "journeys", page: page },
    });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        minWidth: column.minWidth,
                        cursor: column.sortable ? "pointer" : "default",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: "bold",
                        backgroundColor: "#f5f5f5",
                        color: "#333",
                      }}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}{" "}
                      {column.sortable && renderSortIcon(column.id)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (
                        column.id === "departureStation" ||
                        column.id === "returnStation"
                      ) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <StationDialog station={value} text={value.name} />
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
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
        </>
      )}
    </Paper>
  );
}
