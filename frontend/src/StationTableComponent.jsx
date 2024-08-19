import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

const columns = [
  { id: "name", label: "Station Name", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "details", label: "Details", minWidth: 100 },
];

export default function StationTableComponent({
  data,
  totalPages,
  fetchStationData,
}) {
  const [page, setPage] = React.useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
    fetchStationData(value - 1); // Fetch the next page data
  };

  const handleShowDetails = (row) => {
    // TODO show details page for station
    console.log("Showing details for:", row);
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
    </Paper>
  );
}
