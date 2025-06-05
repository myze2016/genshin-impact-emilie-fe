import { FormControl, InputLabel, Input, FormHelperText, Grid, TextareaAutosize, TextField, Box, Card, CardActionArea } from "@mui/material";
const AddPartyImage = ({ formData, setFormData, handleChangeForm, data, handleSelectImage }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} >
                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                    {data.map((character, index) => (
                          <Card key={index} sx={{ width: 345, height: 160, backgroundImage: `url(${character.gacha_splash_url})`, // assumes character.imageUrl contains the image URL
                          backgroundSize: 'cover',
                          backgroundPosition: 'center', }}>
                            <CardActionArea  onClick={() => handleSelectImage(character)} sx={{ height: '100%' }}>
                            </CardActionArea>
                          </Card>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddPartyImage