import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField } from "@mui/material";
const AddCharacterForm = ({ characterFormData, setCharacterFormData, changeFormData }) => {
    return (
        <Box width="100%">
            <Grid container spacing={2}>
                    <Grid item size={{xs: 12, md: 6, lg: 6}}>
                        <TextField fullWidth name="name" value={characterFormData?.name} onChange={(e) => changeFormData(e, characterFormData, setCharacterFormData)} label="Name" variant="outlined" />
                     </Grid>
                     <Grid item size={{xs: 12, md: 6, lg: 6}}>
                        <TextField fullWidth name="element" value={characterFormData?.element} onChange={(e) => changeFormData(e, characterFormData, setCharacterFormData)} label="Element" variant="outlined" />
                     </Grid>
                    
            </Grid>
        </Box>
    );
}
export default AddCharacterForm