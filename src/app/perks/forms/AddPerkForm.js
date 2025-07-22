import { Autocomplete, Grid, Box, TextField, Stack, Chip, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
const AddPerkForm = ({ perkFormData, setPerkFormData, changeFormData, commonsData }) => {

    const handleFillCommon = (name, color) => {
        setPerkFormData((prev) => ({
            ...prev,
            name: prev.name + (name + ' '),
            color: color 
        }));
    }

    const handleClear = () => {
        setPerkFormData((prev) => ({
            ...prev,
            name: ''
        }));
    }
    const colorOptions = [
        { label: '', color: '', value: '' },
        { label: 'Red', color: '#ef5350', value: '#ef5350' },
        { label: 'Blue', color: '#42a5f5', value: '#42a5f5' },
        { label: 'Green', color: '#66bb6a', value: '#66bb6a' },
        { label: 'Purple', color: '#ba68c8', value: '#ba68c8' },
        { label: 'Cyan', color: '#26c6da', value: '#26c6da' },
        { label: 'Orange', color: '#ffb74d', value: '#ffb74d' },
        { label: 'Pink', color: '#f06292', value: '#f06292' },
        { label: 'Sky Blue', color: '#81d4fa', value: '#81d4fa' },
        { label: 'Brown', color: '#8d6e63', value: '#8d6e63' },
        { label: 'Bright Purple', color: '#ab47bc', value: '#ab47bc' },
        { label: 'Light Blue', color: '#a3d8e6', value: '#a3d8e6' },
        { label: 'Teal', color: '#9bd5c6', value: '#9bd5c6' },
        { label: 'Sand Gold', color: '#e0c28c', color: '#e0c28c' },
        { label: 'Lavender', color: '#d1c4e9', value: '#d1c4e9' },
        { label: 'Tan', color: '#d4a373', value: '#d4a373' },
        { label: 'Yellow', color: '#fff176', value: '#fff176' },
        { label: 'Deep Orange', color: '#ff7043', value: '#ff7043' },
        { label: 'Light Green', color: '#aed581', value: '#aed581' },
        { label: 'Deep Blue', color: '#1976d2', value: '#1976d2' },
        { label: 'Mint', color: '#b2dfdb', value: '#b2dfdb' },
        { label: 'Peach', color: '#ffccbc', value: '#ffccbc' },
        { label: 'Charcoal', color: '#546e7a', value: '#546e7a' },
        { label: 'Indigo', color: '#5c6bc0', value: '#5c6bc0' },
        { label: 'Coral', color: '#ff8a65', value: '#ff8a65' },
        { label: 'Rose', color: '#e91e63', value: '#e91e63' },
        { label: 'Lime', color: '#d4e157', value: '#d4e157' },
        { label: 'Slate', color: '#78909c', value: '#78909c' },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    <Stack direction="row"
                        sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                        { commonsData?.map((common, index) => (
                            <Chip
                                key={index}
                                onClick={() => handleFillCommon(common?.name, common?.color)}
                                label={common?.name}
                                sx={{ fontSize: '16px', mr: 1, backgroundColor: common?.color }}
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
                                            <MenuItem  value='Synergy'>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Box/>
                                                 Synergy
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
                <Grid item size={{xs: 12, md: 5, lg: 5}}>
                        <FormControl fullWidth>
                            <InputLabel id="color-label" >
                                Color
                            </InputLabel>
                            <Select
                                id="color-label"
                                name="color"
                                value={perkFormData?.color}
                                label="Color"
                                onChange={(e) => changeFormData(e, perkFormData, setPerkFormData)}
                            >
                                {colorOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 16,
                                                height: 16,
                                                backgroundColor: option.color,
                                                borderRadius: '4px',
                                                marginRight: 1,
                                                display: 'inline-block',
                                            }}
                                        />
                                        {option.label}
                                    </Box>
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddPerkForm