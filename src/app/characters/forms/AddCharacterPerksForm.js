import { FormControl, InputLabel, Input, FormHelperText, Grid, Paper, Typography, Box } from "@mui/material";
import CustomTableRowSearchV2 from "@/components/table/tableRowSearchV2";
import { Widgets } from "@mui/icons-material";
const AddCharacterPerksForm = ({ perkTableColumns, perksData, changeSearchPerksInput, searchCharacterPerksInput, clickCommon, commonsData, loading, apiLoading=false }) => {
    return (
        <Box sx={{Width: '100%'}}>
            <Grid container spacing={2}>
                    <Grid item size={{xs: 12, md: 12, lg: 12}}>
                        <CustomTableRowSearchV2 minWidth="650" headers={perkTableColumns} data={perksData}  handleSearch={changeSearchPerksInput} search={searchCharacterPerksInput} handleSearchChip={clickCommon} dataChips={commonsData} loading={loading} apiLoading={apiLoading}/>
            
                    </Grid>
            </Grid>
        </Box>
    );
}
export default AddCharacterPerksForm