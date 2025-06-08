import { FormControl, InputLabel, Input, FormHelperText, Grid, TextareaAutosize, TextField, Box, Select, MenuItem } from "@mui/material";
const AddParty = ({ partyFormData, setPartyFormData, changeFormData, options }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} >
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <TextField fullWidth name="name" value={partyFormData?.name}  onChange={(e) => changeFormData(e, partyFormData, setPartyFormData)} label="Name" variant="outlined" />
                </Grid>
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <FormControl fullWidth>
                                <InputLabel id="element-label" >
                                    Color
                                </InputLabel>
                                <Select
                                        id="element-label"
                                        name="element_id"
                                        value={partyFormData?.element_id}
                                        label="Element"
                                        onChange={(e) => changeFormData(e, partyFormData, setPartyFormData)}
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
                <Grid item size={{xs: 12, md: 12, lg: 12}} >
                    <TextField
                        label="Description"
                        name="description"
                        multiline          
                        minRows={2}        
                        maxRows={4}        
                        fullWidth
                        value={partyFormData?.description}
                        onChange={(e) => changeFormData(e, partyFormData, setPartyFormData)}
                        variant="outlined" 
                    />
                </Grid>
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <TextField fullWidth name="reaction" value={partyFormData?.reaction}  onChange={(e) => changeFormData(e, partyFormData, setPartyFormData)} label="Reaction" variant="outlined"/>
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddParty