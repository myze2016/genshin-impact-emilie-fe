import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField } from "@mui/material";
const AddPerk = ({ formData, setFormData, handleChangeForm }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                    <Grid item size={{xs: 12, md: 6, lg: 6}}>
                            <TextField fullWidth name="name" value={formData?.name} onChange={handleChangeForm} label="Name" variant="outlined" />
                    </Grid>
                    <Grid item size={{xs: 12, md: 6, lg: 6}}>
                            <TextField fullWidth name="description" value={formData?.description} onChange={handleChangeForm} label="Description" variant="outlined" />
                    </Grid>
            </Grid>
        </Box>
    );
}
export default AddPerk