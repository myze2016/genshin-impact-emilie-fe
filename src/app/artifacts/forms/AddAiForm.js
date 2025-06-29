import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField, Select, MenuItem, Typography, TableContainer, TableCell, Paper, Table, TableBody, TableRow} from "@mui/material";
const AddAiForm = ({ text, matchedPerks, airesponse, changeFormData }) => {
    return (
        <Box width="100%" sx={{ height: '168px'}}>
            <Grid sx={{ height: '168px', p: 0 }} container spacing={2}>
                    <Grid sx={{ p: 3}} item size={{xs: 6, md: 6, lg: 6}}>
                        <TextField
                        disabled={true}
                        label="Description"
                        name="description"
                        multiline          
                        minRows={2}        
                        maxRows={4}        
                        fullWidth
                        value={text}
                        variant="outlined" ></TextField>
                    </Grid>
                    <Grid item size={{xs: 6, md: 6, lg: 6}}>
                         <TableContainer sx={{ height: '168px', width: '100%', overflowY: 'scroll'}} component={Paper}>
                            <Table>
                                <TableBody>
                                    { matchedPerks.map((perk, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {perk.id}
                                            </TableCell>
                                            <TableCell>
                                                 {perk.name}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
            </Grid>
        </Box>
    );
}
export default AddAiForm