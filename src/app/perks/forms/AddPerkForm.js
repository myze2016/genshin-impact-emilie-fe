import { Grid, Box, TextField, Stack, Chip } from "@mui/material";
const AddPerkForm = ({ perkFormData, setPerkFormData, changeFormData, commonsData, clickAddCommon }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    <Stack direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                        { commonsData?.map((common, index) => (
                            <Chip
                                key={index}
                                onClick={() => clickAddCommon(value?.name)}
                                label={common?.name}
                                color="primary"
                                variant="contained" />
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid item size={{xs: 12, md: 5, lg: 5}}>
                    <TextField fullWidth 
                                label="Name" 
                                name="name" 
                                placeholder="pyro infusion"
                                variant="outlined"
                                value={perkFormData?.name} 
                                onChange={(e) => changeFormData(e, perkFormData, setPerkFormData)} />
                </Grid>
                <Grid item size={{xs: 12, md: 7, lg: 7}}>
                    <TextField fullWidth 
                                label="Description" 
                                name="description" 
                                placeholder="all normal attacks and charge atacks will deal pyro damage"
                                variant="outlined" 
                                value={perkFormData?.description} 
                                onChange={(e) => changeFormData(e, perkFormData, setPerkFormData)} />
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddPerkForm