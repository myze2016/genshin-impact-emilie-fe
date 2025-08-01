import CustomSearch from "../Search";
import {
  Box,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Chip,
  Stack,
  CircularProgress,
  TablePagination,
} from "@mui/material";
const CustomTableRowSearchV2 = ({
  minWidth = 650,
  headers = [],
  data = [],
  chipData = [],
  handleSearch = (e) => {},
  handleSearchChip = (e) => {},
  handleSelect = (e) => {},
  select,
  search = "",
  loading = false,
  apiLoading = false,
  page = 0,
  handleChangePage = () => {},
  rowsPerPage = 5,
  handleChangeRowsPerPage = () => {},
  total = 10,
}) => {
  return (
    <>
      <TableContainer
        sx={{ height: "168px", width: "100%", overflow: "hidden" }}
        component={Paper}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={headers.length}
                sx={{
                  pl: 1,
                  pr: 0,
                  py: 0,
                  position: "sticky",
                  top: 0,
                  backgroundColor: "background.paper",
                  zIndex: 10,
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    pt: 1,
                    pb: 2,
                    flexWrap: "wrap",
                    rowGap: 1,
                    height: 128,
                    overflowY: "auto",
                  }}
                >
                  {chipData.map((chip, index) => (
                    <Chip
                      key={index}
                      onClick={() => handleSearchChip(chip?.name)}
                      label={chip?.name}
                      color={chip?.color}
                      sx={{
                        fontSize: "16px",
                        mr: 1,
                        color: search.includes(chip?.name)
                          ? "#fff"
                          : chip?.color,
                        borderColor: chip?.color,
                        backgroundColor: search.includes(chip?.name)
                          ? chip?.color
                          : "transparent",
                      }}
                      variant={
                        search.includes(chip?.name) ? "contained" : "outlined"
                      }
                    />
                  ))}
                </Stack>
                {select ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CustomSearch
                      fullWidth={true}
                      search={search}
                      handleSearch={handleSearch}
                    />
                    <Select
                      sx={{ width: "200px" }}
                      id="type"
                      name="type"
                      value={select}
                      label="Type"
                      variant="outlined"
                      size="small"
                      onChange={handleSelect}
                    >
                      <MenuItem value="Perk">Perk</MenuItem>
                      <MenuItem value="Synergy">Synergy</MenuItem>
                      <MenuItem value="Stat">Stat</MenuItem>
                    </Select>
                  </Box>
                ) : (
                  <CustomSearch
                    fullWidth={true}
                    search={search}
                    handleSearch={handleSearch}
                  />
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ height: "400px", width: "100%" }} component={Paper}>
        <Table>
          <TableBody>
            <TableRow
              sx={{
                borderBottom: `1.5px solid #a9cbb3`,
                p: 0,
                position: "sticky",
                top: 0,
                backgroundColor: "background.paper",
                zIndex: 10,
              }}
            >
              {headers.map((header, index) =>
                header?.width ? (
                  <TableCell
                    sx={{
                      // backgroundColor: '#81c784',
                      fontSize: "1rem",
                      color: `#a9cbb3`,
                      width: header?.width,
                      letterSpacing: "0.5px",
                    }}
                    key={index}
                    align="left"
                  >
                    {header.name}
                  </TableCell>
                ) : (
                  <TableCell
                    sx={{
                      // backgroundColor: '#81c784',
                      fontSize: "1rem",
                      color: `#a9cbb3`,
                      letterSpacing: "0.5px",
                    }}
                    key={index}
                    align="left"
                  >
                    {header.name}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableBody>
          <TableBody sx={{ height: "200px", overflowY: "auto" }}>
            {loading ? (
              <TableRow>
                <TableCell colSpan={headers.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((value, index) => (
                <TableRow
                  sx={{ borderBottom: `1.5px solid #a9cbb3` }}
                  key={index}
                >
                  {headers.map((header, index) => header.cell(value, index))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </>
  );
};
export default CustomTableRowSearchV2;
