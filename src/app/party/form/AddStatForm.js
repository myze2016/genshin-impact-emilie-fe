import { FormControl, InputLabel, Input, FormHelperText, Autocomplete, Grid, TextareaAutosize, TextField, Box, Select, MenuItem } from "@mui/material";
const AddStatForm = ({ formData, setFormData, changeFormData, options }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} >
                {
                    formData.map((form, index) => (
                        <Grid key={index} item size={{xs: 12, md: 12, lg: 12}}>
                            <Grid container spacing={2} >
                                <Grid item size={{xs: 6, md: 6, lg: 6}}>
                                     <TextField disabled={form.disabled} fullWidth name="name" value={form?.name}  onChange={(e) => changeFormData(e, form, setFormData)} variant="outlined" />
                                </Grid>
                                <Grid item size={{xs: 6, md: 6, lg: 6}}>
                                  { form.multiple ? <Autocomplete
                                      multiple
                                      options={options}
                                      getOptionLabel={(option) => option?.name}
                                      value={formData[index].perk_id}
                                      onChange={(event, newValue) => {
                                        const newVariable = [...formData];
                                        newVariable[index].perk_id = newValue;
                                        setFormData(newVariable);
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          variant="outlined"
                                          label="Stats"
                                          placeholder="Stats"
                                        />
                                      )}
                                    /> : <Autocomplete
  options={options}
  getOptionLabel={(option) => option?.name || ''}
  value={options.find(opt => opt.id === formData[index].perk_id) || null}
  onChange={(event, newValue) => {
    const newFormData = [...formData];
    newFormData[index].perk_id = newValue?.id ?? null;
    setFormData(newFormData);
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      variant="outlined"
      label="Perks"
      placeholder="Perks"
    />
  )}
/> }
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}
export default AddStatForm