import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField, Stack, Chip } from "@mui/material";
const AddPerk = ({ formData, setFormData, handleChangeForm, dataChip=[], handleClickChip=((e)=>{}) }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                    <Grid item size={{xs: 12, md: 12, lg: 12}}>
                         <Stack direction="row"
                                spacing={1}
                                sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                {dataChip?.map((value, index) => (
                                        <Chip
                                        key={index}
                                        onClick={() => handleClickChip(value?.name)}
                                        label={value?.name}
                                        color="primary"
                                        variant="contained"
                                        />
                                    ))
                                }
                            </Stack>
                    </Grid>
                    <Grid item size={{xs: 12, md: 5, lg: 5}}>
                            <TextField fullWidth name="name" value={formData?.name} onChange={handleChangeForm} label="Name" variant="outlined" />
                    </Grid>
                    <Grid item size={{xs: 12, md: 7, lg: 7}}>
                            <TextField fullWidth name="description" value={formData?.description} onChange={handleChangeForm} label="Description" variant="outlined" />
                    </Grid>
            </Grid>
        </Box>
    );
}
export default AddPerk