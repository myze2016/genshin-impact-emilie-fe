import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField } from "@mui/material";
const AddCharacter = ({ formData, setFormData, handleChangeForm }) => {
    return (
        <Box width="100%">
            <Grid container spacing={2}>
                    <Grid item size={{xs: 12, md: 6, lg: 6}}>
                        <TextField fullWidth name="name" value={formData?.name} onChange={handleChangeForm} label="Name" variant="outlined" />
                     </Grid>
                     <Grid item size={{xs: 12, md: 6, lg: 6}}>
                        <TextField fullWidth name="element" value={formData?.element} onChange={handleChangeForm} label="Element" variant="outlined" />
                     </Grid>
                    
            </Grid>
        </Box>
    );
}
export default AddCharacter