import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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

export default function JourneyTableComponent({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
