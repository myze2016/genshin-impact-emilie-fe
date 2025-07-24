import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TextField,
} from "@mui/material";
const CustomTableRowSearch = ({
  minWidth = 650,
  headers = [],
  data = [],
  handleSearch = (e) => {},
  search = "",
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: minWidth }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {headers.map((header, index) => (
              <TableCell key={index} align="left">
                {header.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={headers.length}
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "background.paper",
                zIndex: 10,
              }}
            >
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </TableCell>
          </TableRow>
          {data.map((value, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers.map((header, index) => header.cell(value, index))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CustomTableRowSearch;
