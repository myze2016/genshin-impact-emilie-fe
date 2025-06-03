import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, TextField, Chip, Stack } from "@mui/material"
const CustomTableRowSearchV2 = ({ minWidth=650, headers=[], data=[], handleSearch=((e) => {}), handleSearchChip=((e) => {}), dataChips=[], search="" }) => {
    return (
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: minWidth }} aria-label="simple table">
                <TableHead>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        {headers.map((header, index) => (
                                <TableCell key={index} align="right">{header.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>

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
                </TableBody>
                <TableBody>
                <TableRow
                >
                    <TableCell colSpan={headers.length}
                     sx={{
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
                            margin="normal"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </TableCell>
                </TableRow>
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