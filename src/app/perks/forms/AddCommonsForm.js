import { Typography, Autocomplete, Grid, Box, TextField, Stack, Chip, IconButton, CircularProgress, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { addCommon, removeCommon } from "@/hooks/useCommon";
import { useCommonContext } from "@/context/CommonContext";


const AddCommonsForm = ({ commonFormData, setCommonFormData, changeFormData, commonsData, loading=false, setApiLoading, handleRefetch, handleClear }) => {

    const handleRemoveCommon = async (e, common) => {
        const payload = {
            id: common.id
        }
        let response = await removeCommon(payload)
        if (response?.data?.success) {
            handleRefetch('commons')
        }
    }

    const handleAddCommon = async (e) => {
        let response = await addCommon(commonFormData)
        if (response?.data?.success) {
            handleRefetch('commons')
            handleClear('common')
        }
  }
    
    const colorOptions = [
        { label: '', color: '', value: '' },
        { label: 'Primary', color: 'primary', value: 'primary' },
        { label: 'Secondary', color: 'seconday', value: 'seconday' },
        { label: 'Error', color: 'error', value: 'error' },
        { label: 'Info', color: 'info', value: 'info' },
        { label: 'Warning', color: 'warning', value: 'warning' },
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
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <TextField sx={{mr:1}} name="name" value={commonFormData?.name} onChange={(e) => changeFormData(e, commonFormData, setCommonFormData)} label="Name" variant="outlined" />
                    <Autocomplete
                        id="color"
                        sx={{ width: 300 }}
                        options={colorOptions}
                        autoHighlight
                        value={colorOptions.find(opt => opt.color === commonFormData.color)}
                        onChange={(event, newValue) => setCommonFormData(prev => ({
                            ...prev,
                            color: newValue?.color || '',
                        }))}
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            return (
                            <Box
                                key={key}
                                component="li"
                                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                {...optionProps}
                            >
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        bgcolor: option.color,
                                        borderRadius: '50%',
                                        mr: 1,
                                        border: '1px solid #ccc',
                                    }}
                                />
                                {option.label}
                            </Box>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Choose a Color"
                            slotProps={{
                                htmlInput: {
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                                },
                            }}
                            />
                        )}
                        />
                        {/* <Autocomplete
                            options={colorOptions}
                            getOptionLabel={(option) => option.label}
                            value={colorOptions.find(opt => opt.color === commonFormData.color)}
                            onChange={(event, newValue) => changeFormData(event, commonFormData, setCommonFormData)}
                            renderInput={(params) => <TextField {...params} label="Select Color" />}
                            renderOption={(props, option) => (
                                const { key, ...optionProps } = props;
                                <Box component="li" display="flex" alignItems="center">
                                    <Box
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            bgcolor: option.color,
                                            borderRadius: '50%',
                                            mr: 1,
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                    <Typography variant="body2">{option.label}</Typography>
                                </Box>
                            )}
                            sx={{ width: 250 }}
                        /> */}
                        {/* <FormControl >
                            <InputLabel id="color-label" >
                                Color
                            </InputLabel>
                        <Select
                            id="color-label"
                            name="color"
                            value={commonFormData?.color}
                            label="Color"
                            onChange={(e) => changeFormData(e, commonFormData, setCommonFormData)}
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
                        </FormControl> */}
                        <IconButton
                            color="primary"
                            onClick={() => handleAddCommon()}
                        >
                           { <AddCircleOutlineIcon sx={{ fontSize: '28px' }} />   }       
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                        <Stack direction="row"
                        sx={{ flexWrap: 'wrap', rowGap: 1, mb: 1 }}>
                        {commonsData
                        .filter(common => common.color === commonFormData.color).map((common, index) => (
                                <Chip
                                    onClick={(e)=>handleRemoveCommon(e, common)}
                                    key={index}
                                    label={common?.name}
                                    variant="contained"
                                     sx={{ fontSize: '16px', mr: 1,  backgroundColor: common?.color }}
                                />
                            ))
                        }
                    </Stack>
                      <hr></hr>
<Stack direction="row"
                        sx={{ flexWrap: 'wrap', rowGap: 1, mt: 1 }}>
                        {commonsData
                        .filter(common => common.color !== commonFormData.color).map((common, index) => (
                                <Chip
                                    onClick={(e)=>handleRemoveCommon(e, common)}
                                    key={index}
                                    label={common?.name}
                                    variant="contained"
                                     sx={{ fontSize: '16px', mr: 1, backgroundColor: common?.color }}
                                />
                            ))
                        }
                    </Stack>
                    
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddCommonsForm