import { FormControl, InputLabel, Input, FormHelperText, Grid, Paper, Typography } from "@mui/material";
import CustomTableRowSearch from "@/components/table/tableRowSearch";
import CustomTableRowSearchV2 from "@/components/table/tableRowSearchV2";
const ViewCharacterPerks = ({ formData, setFormData, handleChangeForm, headers, data, handleSearch, search, handleSearchChip, dataChips }) => {
    return (
        <Grid container spacing={2}>
            <form>
                <Grid size="12">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Name</InputLabel>
                        <Typography >{formData?.name}</Typography>
                        <FormHelperText hidden id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid size="12">
                    <FormControl>
                        <CustomTableRowSearchV2 minWidth="650" headers={headers} data={data}  handleSearch={handleSearch} search={search} handleSearchChip={handleSearchChip} dataChips={dataChips} />
                    </FormControl>
                </Grid>
               
            </form>
        </Grid>
    );
}
export default ViewCharacterPerks