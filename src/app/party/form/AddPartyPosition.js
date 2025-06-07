import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField } from "@mui/material";
const AddPartyPosition = ({ positionFormData, setPositionFormData, changeFormData }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} >
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <TextField fullWidth name="name" value={positionFormData?.name} onChange={(e) => changeFormData(e, positionFormData, setPositionFormData)} label="Name" variant="outlined" />
                </Grid>
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <TextField fullWidth name="description" value={positionFormData?.description} onChange={(e) => changeFormData(e, positionFormData, setPositionFormData)} label="Description" variant="outlined"/>
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddPartyPosition