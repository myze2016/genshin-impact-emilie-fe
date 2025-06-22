import { Grid, Box, TextField, Stack, Chip, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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
                                color={common?.color}
                                sx={{ fontSize: '16px', mr: 1 }}
                                variant="contained" />
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid item size={{xs: 12, md: 4, lg: 4}}>
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
                  <Grid item size={{xs: 12, md: 3, lg: 3}}>
                    <FormControl fullWidth>
                                <InputLabel id="type-label" >
                                    Type
                                </InputLabel>
                                <Select
                                        id="type-label"
                                        name="type"
                                        value={perkFormData?.type}
                                        label="Type"
                                        onChange={(e) => changeFormData(e, perkFormData, setPerkFormData)}
                                    >
                                        <MenuItem  value='Perk'>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Box/>
                                                Perk
                                            </Box>
                                        </MenuItem>
                                            <MenuItem  value='Stat'>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Box/>
                                                 Stat
                                            </Box>
                                        </MenuItem>
                                    </Select>
                            </FormControl>
                </Grid>
                <Grid item size={{xs: 12, md: 5, lg: 5}}>
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