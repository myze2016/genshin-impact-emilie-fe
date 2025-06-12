import { FormControl, InputLabel, Input, FormHelperText, Grid, Paper, Typography, Box } from "@mui/material";
import CustomTableRowSearchV2 from "@/components/table/tableRowSearchV2";
import { Widgets } from "@mui/icons-material";
const AddArtifactsForm = ({ tableColumns, data, handleSearch, searchInput, handleChip, commonsData, loading, apiLoading=false, page, handleChangePage, rowsPerPage, handleChangeRowsPerPage, total }) => {
    return (
        <Box sx={{Width: '100%'}}>
            <Grid container spacing={2}>
                    <Grid item size={{xs: 12, md: 12, lg: 12}}>
                        <CustomTableRowSearchV2 minWidth="650" headers={tableColumns} data={data} chipData={commonsData}  handleSearch={handleSearch} search={searchInput} handleSearchChip={handleChip} dataChips={commonsData} loading={loading} apiLoading={apiLoading} page={page} handleChangePage={handleChangePage} rowsPerPage={rowsPerPage} handleChangeRowsPerPage={handleChangeRowsPerPage} total={total}/>
            
                    </Grid>
            </Grid>
        </Box>
    );
}
export default AddArtifactsForm