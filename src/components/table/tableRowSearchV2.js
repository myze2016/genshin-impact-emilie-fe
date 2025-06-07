import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, TextField, Chip, Stack, CircularProgress } from "@mui/material"
const CustomTableRowSearchV2 = ({ minWidth=650, headers=[], data=[], handleSearch=((e) => {}), handleSearchChip=((e) => {}), dataChips=[], search="", loading=false, apiLoading=false }) => {
    return (
        <TableContainer sx={{width: '100%'}} component={Paper}>
            <Table sx={{overflowY: 'auto'}}>
                <TableBody>
                    {
                        loading ? <TableRow>
                              <TableCell colSpan={headers.length} align="center">
                                <CircularProgress />
                              </TableCell></TableRow> : (
                            <TableRow>
                        <TableCell colSpan={headers.length}>
                            <Stack direction="row"
                                spacing={1}
                                sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                {(() => {
                                    const displayedWords = new Set();
                                    return dataChips.flatMap((chip, index) =>
                                    chip.name.split(' ').filter(word => {
                                        if (displayedWords.has(word)) return false;
                                        displayedWords.add(word);
                                        return true;
                                    }).map((word, wordIndex) => (
                                        <Chip
                                        key={`${index}-${wordIndex}`}
                                        onClick={() => handleSearchChip(word)}
                                        label={word}
                                        color="primary"
                                        variant={ search.includes(word) ? "contained" : "outlined"}
                                        />
                                    ))
                                    );
                                })()}
                            </Stack>
                        </TableCell>
                    </TableRow>
                              )
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
                            <TextField
                                label="Search"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    {
                        loading ? <TableRow>
                              <TableCell colSpan={headers.length} align="center">
                                <CircularProgress />
                              </TableCell></TableRow> : (
                                <TableRow sx={{borderBottom: `1.5px solid #a9cbb3`}}>
                        {headers.map((header, index) => (
                                <TableCell  sx={{
                                    // backgroundColor: '#81c784',
                                    fontSize: '1rem',
                                    color: `#a9cbb3`,
                                    letterSpacing: '0.5px',
                                  }} key={index} align="left">{header.name}</TableCell>
                        ))}
                    </TableRow>
                              )
                    }
                    
                </TableBody>
                <TableBody>
                    {data.map((value, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        {headers.map((header, index) => (
                            header.cell(value, index)
                        ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default CustomTableRowSearchV2