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
import { fetchData, fetchSearchData } from "./apiService";
import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Search from "./Search";

const columns = [
  { id: "name", label: "Station Name", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "details", label: "Details", minWidth: 100 },
];

export default function StationTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(location.state?.page || 1);

  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        let data;
        if (query) {
          console.log("Query is present");
          data = await fetchSearchData("stations", query);
        } else {
          const sortParam = `${sortConfig.key},${sortConfig.direction}`;
          data = await fetchData("stations", page - 1, 10, sortParam);
        }
        setData(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching station data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStationData();
  }, [page, sortConfig, query]);

  const handleSort = (columnId) => {
    let direction = "asc";
    if (sortConfig.key === columnId) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    setSortConfig({ key: columnId, direction });
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setIsLoading(true);
    setPage(value);
  };

  const handleShowDetails = (row) => {
    navigate(`/stations/${row.id}`, {
      state: { from: "stations", page: page },
    });
  };

  const renderSortIcon = (columnId) => {
    if (sortConfig.key === columnId) {
      return sortConfig.direction === "asc" ? (
        <ArrowDownwardIcon fontSize="small" />
      ) : (
        <ArrowUpwardIcon fontSize="small" />
      );
    } else {
      return <ArrowUpwardIcon fontSize="small" color="disabled" />;
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Search setQuery={setQuery} />
      </Box>
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
        ) : data.length === 0 ? ( // Check if there are no results
          <Typography variant="h6" align="center" sx={{ padding: 4 }}>
            No results found
          </Typography>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) =>
                      column.id !== "details" ? (
                        <TableCell
                          key={column.id}
                          style={{
                            minWidth: column.minWidth,
                            cursor: "pointer",
                            fontWeight: "bold",
                            backgroundColor: "#f5f5f5",
                            color: "#333",
                            //borderBottom: "2px solid #ddd",
                          }}
                          onClick={() => handleSort(column.id)}
                        >
                          {column.label} {renderSortIcon(column.id)}
                        </TableCell>
                      ) : (
                        <TableCell
                          key={column.id}
                          style={{
                            minWidth: column.minWidth,
                            fontWeight: "bold",
                            backgroundColor: "#f5f5f5",
                            color: "#333",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          {column.id !== "details" ? (
                            row[column.id]
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleShowDetails(row)}
                            >
                              Show Details
                            </Button>
                          )}
                        </TableCell>
                      ))}
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
    </>
  );
}
