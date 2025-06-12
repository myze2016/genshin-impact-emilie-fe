import { FormControl, InputLabel, Input, FormHelperText, Grid, Box, TextField, Select, MenuItem} from "@mui/material";
const AddWeaponForm = ({ formData, setFormData, changeFormData, options }) => {
    return (
        <Box width="100%">
            <Grid container spacing={2}>
                    <Grid item size={{xs: 12, md: 6, lg: 6}}>
                        <TextField fullWidth name="name" value={formData?.name} onChange={(e) => changeFormData(e, formData, setFormData)} label="Name" variant="outlined" />
                     </Grid>
                      <Grid item size={{xs: 12, md: 6, lg: 6}}>
                            <FormControl fullWidth>
                                <InputLabel id="weapon-type-label" >
                                    Weapon Type
                                </InputLabel>
                                <Select
                                        id="weapon-type-label"
                                        name="weapon_type_id"
                                        value={formData?.weapon_type_id}
                                        label="Weapon Type"
                                        onChange={(e) => changeFormData(e, formData, setFormData)}
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
            </Grid>
        </Box>
    );
}
export default AddWeaponForm