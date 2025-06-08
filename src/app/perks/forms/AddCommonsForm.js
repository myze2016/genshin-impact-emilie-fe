import { Grid, Box, TextField, Stack, Chip, IconButton, CircularProgress, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { addCommon, removeCommon } from "@/hooks/useCommon";

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
        { label: 'Primary', color: '#81c784', value: 'primary' },
        { label: 'Secondary', color: '#d1c4e9', value: 'secondary' },
        { label: 'Error', color: '#b85c38', value: 'error' },
        { label: 'Success', color: '#a5d6a7', value: 'success' },
        { label: 'Info', color: '#7bb6c3', value: 'info' },
        { label: 'Warning', color: '#d4a373', value: 'warning' },
    ];
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <TextField sx={{mr:1}} name="name" value={commonFormData?.name} onChange={(e) => changeFormData(e, commonFormData, setCommonFormData)} label="Name" variant="outlined" />
                        <FormControl >
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
                        </FormControl>
                        <IconButton
                            color="primary"
                            onClick={() => handleAddCommon()}
                        >
                           { <AddCircleOutlineIcon sx={{ fontSize: '28px' }} />   }       
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                    {
                      
<Stack direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                        {commonsData.map((common, index) => (
                                <Chip
                                    onClick={(e)=>handleRemoveCommon(e, common)}
                                    key={index}
                                    label={common?.name}
                                    color={common?.color}
                                    variant="contained"
                                    style={{ fontSize: '16px' }}
                                />
                            ))
                        }
                    </Stack>
      
                    }
                    
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddCommonsForm