import { FormControl, InputLabel, Input, FormHelperText, Autocomplete, Stack, Grid, TextareaAutosize, TextField, Box, Select, MenuItem, Typography } from "@mui/material";
const AddArtifactPieceForm = ({ formData, setFormData, changeFormData, options }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} >
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <FormControl fullWidth>
                        <InputLabel id="type-label" >
                            Type
                        </InputLabel>
                        <Select
                                id="type-label"
                                name="type"
                                value={formData?.type}
                                label="Type"
                                onChange={(e) => changeFormData(e, formData, setFormData)}
                            >
                                <MenuItem value='sands'>
                                        Sands
                                </MenuItem>
                                  <MenuItem value='goblet'>
                                        Goblet
                                </MenuItem>
                                  <MenuItem value='circlet'>
                                        Circlet
                                </MenuItem>
                                 <MenuItem value='substat'>
                                        Substat
                                </MenuItem>
                            </Select>
                    </FormControl>
                </Grid>
                 <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <Autocomplete
                      options={options}
                      getOptionLabel={(option) => option?.name || ''}
                      value={options.find(opt => opt.id === formData.stat_id) || null}
                      onChange={(event, newValue) => {
                        setFormData((prev) => ({
                          ...prev,
                          stat_id: newValue?.id || null,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Stat"
                          placeholder="Stat"
                        />
                      )}
                    />
                  </Grid>  
            </Grid>
        </Box>
    );
}
export default AddArtifactPieceForm