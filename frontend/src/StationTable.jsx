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

const columns = [
  { id: "name", label: "Station Name", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "details", label: "Details", minWidth: 100 },
];

export default function StationTable() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const [page, setPage] = useState(location.state?.page || 1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const data = await fetchData("stations", page - 1);
        setData(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching station data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStationData();
  }, [page]);

  const handleChangePage = (event, value) => {
    setIsLoading(true);
    setPage(value);
  };

  const handleShowDetails = (row) => {
    navigate(`/stations/${row.id}`, { state: { page } });
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
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
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
  );
}