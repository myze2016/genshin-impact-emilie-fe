import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField, Select, MenuItem} from "@mui/material";
const AddCharacterForm = ({ characterFormData, setCharacterFormData, changeFormData, options, typeOptions }) => {
    console.log('options', options)
    return (
        <Box width="100%">
            <Grid container spacing={2}>
                    <Grid item size={{xs: 12, md: 6, lg: 6}}>
                        <TextField fullWidth name="name" value={characterFormData?.name} onChange={(e) => changeFormData(e, characterFormData, setCharacterFormData)} label="Name" variant="outlined" />
                     </Grid>
                     <Grid item size={{xs: 12, md: 6, lg: 6}}>
                            <FormControl fullWidth>
                                <InputLabel id="element-label" >
                                    Element
                                </InputLabel>
                                <Select
                                        id="element-label"
                                        name="element_id"
                                        value={characterFormData?.element_id}
                                        label="Element"
                                        onChange={(e) => changeFormData(e, characterFormData, setCharacterFormData)}
                                    >
                                        {options.map((option, index) => (
                                            <MenuItem key={index} value={option.id}>
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
                                                    {option.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                            </FormControl>
                     </Grid>
                      <Grid item size={{xs: 12, md: 6, lg: 6}}>
                            <FormControl fullWidth>
                                <InputLabel id="weapon-type-label" >
                                    Weapon Type
                                </InputLabel>
                                <Select
                                        id="weapon-type-label"
                                        name="weapon_type_id"
                                        value={characterFormData?.weapon_type_id}
                                        label="Weapon Type"
                                        onChange={(e) => changeFormData(e, characterFormData, setCharacterFormData)}
                                    >
                                        {typeOptions.map((option, index) => (
                                            <MenuItem key={index} value={option.id}>
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
                                                    {option.name}
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
export default AddCharacterForm