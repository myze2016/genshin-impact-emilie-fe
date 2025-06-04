import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material"
const CustomTable = ({ minWidth=650, headers=[], data=[] }) => {
    return (
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: minWidth }} aria-label="simple table">
                <TableHead>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        {headers.map((header, index) => (
                                <TableCell key={index} align="left">{header.name}</TableCell>
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
export default CustomTable