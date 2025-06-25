import { FormControl, InputLabel, Input, FormHelperText, Grid, TextareaAutosize, TextField, Box, Card, CardActionArea, TablePagination } from "@mui/material";
import CustomSearch from "@/components/Search";
import { useState, useEffect } from "react";
const AddPartyImage = ({ charactersData, selectImage, charactersPage, charactersTotal, clickCharactersPage, charactersRows, selectCharactersRows, search, setSearch }) => {
    const [stealth, setStealth] = useState('')
     useEffect(() => {
        const isStealth = localStorage.getItem('stealth') === 'true';
        if (isStealth) {
            setStealth(isStealth);
          }
      }, []);
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} >
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                       <CustomSearch  search={search}
                                      handleSearch={setSearch}
                                      fullWidth={true} label={""}>
                                        
                                    </CustomSearch>
                </Grid>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
                     <Box
                        sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2, // spacing between cards
                        justifyContent: 'center', // or 'center' or 'space-between'
                        overflowY: 'auto'
                        }}
                    >
                    {charactersData.map((character, index) => (
                          <Card key={index} sx={{ width: 345, height: 160, backgroundImage: `url(${stealth ? 'https://genshin.jmp.blue/characters/tighnari/gacha-splash.png' : character.gacha_splash_url})`, // assumes character.imageUrl contains the image URL
                          backgroundSize: 'cover',
                          backgroundPosition: 'center', }}>
                            <CardActionArea  onClick={() => selectImage(character)} sx={{ height: '100%' }}>
                            </CardActionArea>
                          </Card>
                    ))}
                    </Box>
                </Grid>
                 <Grid item size={{xs: 12, md: 6, lg: 12}}>
                 <TablePagination
                    component="div"
                    count={charactersTotal}
                    page={charactersPage}
                    onPageChange={clickCharactersPage}
                    rowsPerPage={charactersRows}
                    onRowsPerPageChange={selectCharactersRows}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
                </Grid>
            </Grid>
        </Box>
    );
}
export default AddPartyImage