import { FormControl, InputLabel, Input, FormHelperText, Grid, TextareaAutosize, TextField, Box } from "@mui/material";
const AddParty = ({ partyFormData, setPartyFormData, changeFormData }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} >
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <TextField fullWidth name="name" value={partyFormData?.name}  onChange={(e) => changeFormData(e, partyFormData, setPartyFormData)} label="Name" variant="outlined" />
                </Grid>
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    <TextField fullWidth name="element" value={partyFormData?.element}  onChange={(e) => changeFormData(e, partyFormData, setPartyFormData)} label="Element" variant="outlined"/>
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