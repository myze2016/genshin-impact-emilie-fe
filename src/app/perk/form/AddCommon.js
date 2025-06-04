import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField, Paper, Stack, Chip, IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const AddCommon = ({ formData, setFormData, handleChangeForm, tagData, handleAddCommon }) => {
    console.log('tagData', tagData)
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                    <Grid item size={{xs: 12, md: 12, lg: 12}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <TextField name="name" value={formData?.name} onChange={handleChangeForm} label="Name" variant="outlined" />
                            <IconButton
                                        color="primary"
                                        onClick={() => handleAddCommon(item)}
                                        aria-label="add character to position"
                                    >
                                        
                                        <AddCircleOutlineIcon sx={{ fontSize: '28px' }} />
                                                        
                        </IconButton>
                        </Box>
        
                    </Grid>
                    <Grid item size={{xs: 12, md: 12, lg: 12}}>
                          
                            <Stack direction="row"
                                spacing={1}
                                sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                {tagData.map((word, index) => (
                                        <Chip
                                        key={index}
                                        label={word?.name}
                                        color="primary"
                                        variant={ "contained" }
                                        />
                                    ))
                                }
                            </Stack>
                    </Grid>
            </Grid>
        </Box>
    );
}
export default AddCommon