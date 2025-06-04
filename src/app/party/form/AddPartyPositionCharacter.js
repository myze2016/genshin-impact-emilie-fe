import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField } from "@mui/material";
import CustomTableRowSearch from "@/components/table/tableRowSearch";
import CustomTableRowSearchV2 from "@/components/table/tableRowSearchV2";

const AddPartyPositionCharacter = ({ formData, setFormData, handleChangeForm, headers, data, handleSearch, search, handleSearchChip, dataChips  }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} >
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    <CustomTableRowSearchV2 headers={headers} data={data}  handleSearch={handleSearch} search={search}  handleSearchChip={handleSearchChip} dataChips={dataChips}  />
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddPartyPositionCharacter