import { FormControl, InputLabel, Input, FormHelperText, Autocomplete, Stack, Grid, TextareaAutosize, TextField, Box, Select, MenuItem, Typography } from "@mui/material";
const AddStatForm = ({ formData, setFormData, changeFormData, options }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} >
               <Grid item size={{xs: 12, md: 12, lg: 12}}>
                  <Grid container spacing={2} >
                      <Grid item size={{xs: 12, md: 12, lg: 12}}>
                       <Autocomplete
                          options={options}
                          getOptionLabel={(option) => option?.name || ''}
                          value={options.find(opt => opt.id === formData.sands) || null}
                          onChange={(event, newValue) => {
                            setFormData((prev) => ({
                              ...prev,
                              sands: newValue?.id || null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sands"
                              placeholder="Sands"
                            />
                          )}
                        />
                      </Grid>  
                      <Grid item size={{xs: 12, md: 12, lg: 12}}>
                        <Autocomplete
                          options={options}
                          getOptionLabel={(option) => option?.name || ''}
                          value={options.find(opt => opt.id === formData.goblet) || null}
                          onChange={(event, newValue) => {
                            setFormData((prev) => ({
                              ...prev,
                              goblet: newValue?.id || null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Goblet"
                              placeholder="Goblet"
                            />
                          )}
                        />
                      </Grid>  
                      <Grid item size={{xs: 12, md: 12, lg: 12}}>
                        <Autocomplete
                          options={options}
                          getOptionLabel={(option) => option?.name || ''}
                          value={options.find(opt => opt.id === formData.circlet) || null}
                          onChange={(event, newValue) => {
                            setFormData((prev) => ({
                              ...prev,
                              circlet: newValue?.id || null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Circlet"
                              placeholder="Circlet"
                            />
                          )}
                        />
                      </Grid>  
                      <Grid item xs={12} md={12} lg={12}>
                          <Stack spacing={3} >
                            <Autocomplete
                              multiple
                              fullWidth
                              options={options}
                              getOptionLabel={(option) => option?.name}
                              value={options.filter(option => formData.substat.includes(option.id))}
                              onChange={(event, newValue) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  substat: newValue.map(item => item.id),
                                }));
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  variant="outlined"
                                  label="SubStat"
                                  placeholder="SubStat"
                                />
                              )}
                            />
                        </Stack>
                        
                      </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddStatForm