import { Grid, Box, TextField, Stack, Chip, InputAdornment, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
const AddPerkForm = ({ perkFormData, setPerkFormData, changeFormData, commonsData }) => {

    const handleFillCommon = (name) => {
        setPerkFormData((prev) => ({
            ...prev,
            name: prev.name + (name + ' ')
        }));
    }

    const handleClear = () => {
        setPerkFormData((prev) => ({
            ...prev,
            name: ''
        }));
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    <Stack direction="row"
                        sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                        { commonsData?.map((common, index) => (
                            <Chip
                                key={index}
                                onClick={() => handleFillCommon(common?.name)}
                                label={common?.name}
                                sx={{ fontSize: '16px', mr: 1, backgroundColor: common?.color }}
                                variant="contained" />
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid item size={{xs: 12, md: 5, lg: 5}}>
                    <TextField fullWidth 
                                label="Name" 
                                name="name" 
                                placeholder="Name"
                                variant="outlined"
                                value={perkFormData?.name} 
                                onChange={(e) => changeFormData(e, perkFormData, setPerkFormData)} 
                                slotProps={{
                                    input: {
                                        endAdornment: perkFormData?.name && (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => handleClear()}
                                                    size="small"
                                                    edge="end"
                                                >
                                                <CloseIcon sx={{ fontSize: 18, color: '#a9cbb3' }} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}/>
                </Grid>
                <Grid item size={{xs: 12, md: 7, lg: 7}}>
                    <TextField fullWidth 
                                label="Description" 
                                name="description" 
                                placeholder="Description"
                                variant="outlined" 
                                value={perkFormData?.description} 
                                onChange={(e) => changeFormData(e, perkFormData, setPerkFormData)} />
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddPerkForm