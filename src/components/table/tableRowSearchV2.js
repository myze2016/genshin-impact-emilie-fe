import CustomSearch from "../Search"
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, TextField, Chip, Stack, CircularProgress, TablePagination  } from "@mui/material"
const CustomTableRowSearchV2 = ({ minWidth=650, headers=[], data=[], chipData=[], handleSearch=((e) => {}), handleSearchChip=((e) => {}), dataChips=[], search="", loading=false, apiLoading=false, page=0, handleChangePage=(()=>{}), rowsPerPage=5, handleChangeRowsPerPage=(()=>{}), total=10, }) => {
    return (
        <>
        <TableContainer sx={{width: '100%'}} component={Paper}>
            <Table sx={{overflowY: 'auto'}}>
                <TableBody>
                    {
                            <TableRow>
                        <TableCell colSpan={headers.length}>
                            <Stack direction="row"
                                sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                {   chipData.map((chip, index) => (
                                        <Chip
                                            key={index}
                                            onClick={() => handleSearchChip(chip?.name)}
                                            label={chip?.name}
                                            color={chip?.color}
                                            sx={{ fontSize: '16px', mr: 1 }}
                                            variant={ search.includes(chip?.name) ? "contained" : "outlined"}
                                        />
                                    ))
                                }
                            </Stack>
                        </TableCell>
                    </TableRow>
                    }
                    
                </TableBody>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={headers.length}
                            sx={{
                                p: 0,
                                position: 'sticky',
                                top: 0,
                                backgroundColor: 'background.paper', 
                                zIndex: 10,
                            }}>
                            <CustomSearch
                                fullWidth={true}
                                search={search}
                                handleSearch={handleSearch}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                 
                                <TableRow sx={{borderBottom: `1.5px solid #a9cbb3`}}>
                        {headers.map((header, index) => (
                            header?.width ? (<TableCell  sx={{
                                    // backgroundColor: '#81c784',
                                    fontSize: '1rem',
                                    color: `#a9cbb3`,
                                      width: header?.width,
                                    letterSpacing: '0.5px',
                                  }} key={index} align="left">{header.name}</TableCell>) : (
                                        <TableCell  sx={{
                                    // backgroundColor: '#81c784',
                                    fontSize: '1rem',
                                    color: `#a9cbb3`,
                                    letterSpacing: '0.5px',
                                  }} key={index} align="left">{header.name}</TableCell>
                                  )
                        ))}
                    </TableRow>
                    
                </TableBody>
                <TableBody>
                       {
                        loading ? <TableRow>
                              <TableCell colSpan={headers.length} align="center">
                                <CircularProgress />
                                </TableCell></TableRow> : (
                        data.map((value, index) => (
                            <TableRow
                            key={index}
                            >
                            {headers.map((header, index) => (
                                header.cell(value, index)
                            ))}
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
    )
}
export default CustomTableRowSearchV2