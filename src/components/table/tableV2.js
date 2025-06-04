import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material"
const CustomTableV2 = ({ minWidth=650, headers=[], data=[] }) => {
    return (
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: minWidth }}>
                <TableHead>
                    <TableRow
                        sx={{borderBottom: `1.5px solid #a9cbb3`}}
                        >
                        {headers.map((header, index) => (
                                <TableCell sx={{
                                    // backgroundColor: '#81c784',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    color: `#a9cbb3`,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                  }}
                       key={index} align="right"> {header.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
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
export default CustomTableV2