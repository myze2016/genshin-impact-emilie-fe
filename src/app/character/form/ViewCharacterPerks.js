import { FormControl, InputLabel, Input, FormHelperText, Grid, Paper, Typography, Box } from "@mui/material";
import CustomTableRowSearch from "@/components/table/tableRowSearch";
import CustomTableRowSearchV2 from "@/components/table/tableRowSearchV2";
import { Widgets } from "@mui/icons-material";
const ViewCharacterPerks = ({ formData, setFormData, handleChangeForm, headers, data, handleSearch, search, handleSearchChip, dataChips }) => {
    return (
        <Box sx={{Width: '100%'}}>
            <Grid container spacing={2}>
                    <Grid size="12">
                        <CustomTableRowSearchV2 minWidth="650" headers={headers} data={data}  handleSearch={handleSearch} search={search} handleSearchChip={handleSearchChip} dataChips={dataChips} />
            
                    </Grid>
            </Grid>
        </Box>
    );
}
export default ViewCharacterPerks