import { Grid, Box, TextField, Stack, Chip, IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const FormAddCommons = ({ formDataCommon, setFormDataCommon, handleChangeFormData, dataCommons, handleClickAddCommon }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <TextField name="name" value={formDataCommon?.name} onChange={(e) => handleChangeFormData(e, formDataCommon, setFormDataCommon)} label="Name" variant="outlined" />
                        <IconButton
                            color="primary"
                            onClick={() => handleClickAddCommon()}
                        >
                            <AddCircleOutlineIcon sx={{ fontSize: '28px' }} />          
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    <Stack direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                        {dataCommons.map((common, index) => (
                                <Chip
                                    key={index}
                                    label={common?.name}
                                    color="primary"
                                    variant="contained"
                                />
                            ))
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
export default FormAddCommons