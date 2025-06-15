import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField, Select, MenuItem} from "@mui/material";
const AddArtifactForm = ({ formData, setFormData, changeFormData }) => {
    return (
        <Box width="100%">
            <Grid container spacing={2}>
                    <Grid item size={{xs: 12, md: 12, lg: 12}}>
                        <TextField fullWidth name="name" value={formData?.name} onChange={(e) => changeFormData(e, formData, setFormData)} label="Name" variant="outlined" />
                     </Grid>
            </Grid>
        </Box>
    );
}
export default AddArtifactForm