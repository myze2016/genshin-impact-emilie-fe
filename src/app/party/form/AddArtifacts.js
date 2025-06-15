import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField } from "@mui/material";
import CustomTableRowSearch from "@/components/table/tableRowSearch";
import CustomTableRowSearchV2 from "@/components/table/tableRowSearchV2";

const AddArtifacts = ({ columns, data, handleSearch, searchInput, handleChip, chipData, page, handleChangePage, rowsPerPage, handleChangeRowsPerPage, total, loading  }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} >
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    <CustomTableRowSearchV2 headers={columns} chipData={chipData} data={data} loading={loading} handleSearch={handleSearch} search={searchInput}  handleSearchChip={handleChip} dataChips={chipData} page={page} handleChangePage={handleChangePage} rowsPerPage={rowsPerPage} handleChangeRowsPerPage={handleChangeRowsPerPage} total={total}  />
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddArtifacts