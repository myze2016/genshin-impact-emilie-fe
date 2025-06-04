import { FormControl, InputLabel, Input, FormHelperText, Grid, Box } from "@mui/material";
const AddCharacter = ({ formData, setFormData, handleChangeForm }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid size="12">
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <Input name="name" value={formData?.name} onChange={handleChangeForm} id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText hidden id="my-helper-text">We'll never share your email.</FormHelperText>

                </Grid>
                <Grid size="12">
                    <InputLabel htmlFor="my-input">Element</InputLabel>
                    <Input name="element" value={formData?.element} onChange={handleChangeForm} id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText hidden id="my-helper-text">We'll never share your email.</FormHelperText>
        
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddCharacter