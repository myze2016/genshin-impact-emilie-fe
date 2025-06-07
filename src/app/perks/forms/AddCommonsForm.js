import { Grid, Box, TextField, Stack, Chip, IconButton, CircularProgress } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const AddCommonsForm = ({ commonFormData, setCommonFormData, changeFormData, commonsData, clickAddCommon, loading=false }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <TextField name="name" value={commonFormData?.name} onChange={(e) => changeFormData(e, commonFormData, setCommonFormData)} label="Name" variant="outlined" />
                        <IconButton
                            color="primary"
                            onClick={() => clickAddCommon()}
                        >
                           { <AddCircleOutlineIcon sx={{ fontSize: '28px' }} />   }       
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    {
                        loading ?  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box> : (
<Stack direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                        {commonsData.map((common, index) => (
                                <Chip
                                    key={index}
                                    label={common?.name}
                                    color="primary"
                                    variant="contained"
                                />
                            ))
                        }
                    </Stack>
      )
                    }
                    
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddCommonsForm