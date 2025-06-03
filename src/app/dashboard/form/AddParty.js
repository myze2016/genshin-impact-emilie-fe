import { FormControl, InputLabel, Input, FormHelperText, Grid, TextareaAutosize, TextField, Box } from "@mui/material";
const AddParty = ({ formData, setFormData, handleChangeForm }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} >
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <TextField fullWidth name="name" value={formData?.name} onChange={handleChangeForm} label="Name" variant="outlined" />
                </Grid>
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <TextField fullWidth name="element" value={formData?.element} onChange={handleChangeForm} label="Element" variant="outlined"/>
                </Grid>
                <Grid item size={{xs: 12, md: 12, lg: 12}} >
                    <TextField
                        label="Description"
                        name="description"
                        multiline          
                        minRows={2}        
                        maxRows={4}        
                        fullWidth
                        value={formData?.description}
                        onChange={handleChangeForm}
                        variant="outlined" 
                    />
                </Grid>
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <TextField fullWidth name="reaction" value={formData?.reaction} onChange={handleChangeForm} label="Reaction" variant="outlined"/>
                </Grid>
                {/* <Grid size="12">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Element</InputLabel>
                        <Input name="element" value={formData?.element} onChange={handleChangeForm} id="my-input" aria-describedby="my-helper-text" />
                        <FormHelperText hidden id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                </Grid>
                    <Grid size="12">
                    <FormControl>
                        <TextareaAutosize
                            name="description"
                            value={formData?.description} 
                            onChange={handleChangeForm}
                            minRows={3}
                        />
                        <FormHelperText hidden id="description-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                </Grid>
                
                <Grid size="12">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Reaction</InputLabel>
                        <Input name="reaction" value={formData?.reaction} onChange={handleChangeForm} id="my-input" aria-describedby="my-helper-text" />
                        <FormHelperText hidden id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                </Grid> */}
            </Grid>
        </Box>
    );
}
export default AddParty