'use client'

import { Table, TableBody, TableRow, TableCell, Autocomplete, Stack, Grid, Typography, Button, Card, CardContent, CardActionArea, IconButton, CardActions, TablePagination, Box, Paper, TextField, InputLabel, FormControl, Select, MenuItem} from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import { getParties, addParty, addPartyImage, getPartiesUser } from "../../hooks/useParty";
import AddParty from "./form/AddParty";
import CustomDialog from "@/components/dialog";
import { getCharactersName } from "@/hooks/useCharacter";
import AddPartyImage from "./form/AddPartyImage";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Spinner from "@/components/Spinner";
import AddIcon from '@mui/icons-material/Add';
import { Add } from "@mui/icons-material";
import CustomTableDialog from "@/components/dialog/table";
import { getElements } from "@/hooks/useElements";
import CustomSearch from "@/components/Search";
import { useUser } from "@/context/UserContext";
   
import { getPerks } from "@/hooks/usePerk";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function Dashboard() {

  const [ perksPayload, setPerksPayload ] = useState('')
  const [ refetchPerks, setRefetchPerks ] = useState(false)
  const [ searchPerks, setSearchPerks ] = useState('')
  const [ perksRows, setPerksRows ] = useState(1000)
  const [ perksPage, setPerksPage ] = useState(0)
  const { data: perksData, loading: perksLoading, total: perksTotal } = getPerks(perksPayload, refetchPerks, searchPerks, perksPage+1, perksRows)

  const [ elementsPayload, setElementsPayload] = useState('')
  const [ refetchElements, setRefetchElements] = useState(false)
  const { data: elementsData, loading: elementsLoading } = getElements(elementsPayload, refetchElements)

  const [variable, setVariable] = useState([]);
 

  const [refetchParties, setRefetchParties] = useState(false)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [partiesPayload, setPartiesPayload] = useState('')
  const { data: partiesData, loading: partiesLoading, total: partiesTotal } = getPartiesUser(partiesPayload, refetchParties, search, page+1, rowsPerPage)



  const [charactersPage, setCharactersPage] = useState(0)
  const [charactersPayload, setCharactersPayload] = useState('')
  const [refetchCharacters, setRefetchCharacters] = useState(false)
  const [searchCharacters, setSearchCharacters] = useState('')
  const [searchCharactersInput, setSearchCharactersInput] = useState('')
  const [charactersRows, setCharactersRows] = useState(9)
  const { data: charactersData, loading: charactersLoading, total: charactersTotal } = getCharactersName(charactersPayload, refetchCharacters, searchCharacters, charactersPage+1, charactersRows)

  const [ apiLoading, setApiLoading ] = useState(false)
  const [addImageDialog, setAddImageDialog] = useState(false)
  const [addPartyDialog, setAddPartyDialog] = useState(false)
  const [partyId, setPartyId] = useState('')


  const [partyFormData, setPartyFormData] = useState({
    name: '',
    element_id: '',
    reaction: '',
  })
  const [imageFormData, setImageFormData] = useState({
    character_id: '',
  })

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacters(searchCharactersInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchCharactersInput])

 
  const changeFormData = (e, formData, setFormData) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
  }

  const selectImage = async (character) => {
    setApiLoading(true)
    let response = await addPartyImage({character_id: character.id, party_id: partyId})
    if (response?.data?.success) {
      setRefetchParties((prev) => !prev)
      setAddImageDialog(false)
    }
    setApiLoading(false)
  }

  const closeAddPartyDialog = (e) => {
    setAddPartyDialog(false)
  }

  const confirmAddPartyDialog = async (e) => {
    setApiLoading(true)
    let response = await addParty(partyFormData)
    if (response?.data?.success) {  
      setRefetchParties((prev) => !prev)
      setPartyFormData({
        name: '',
        element_id: '',
        reaction: '',
      })
      setAddPartyDialog(false)
    }
    setApiLoading(false)
  }

  const clickAddPartyImage = (e, party) => {
    e.stopPropagation()
    setPartyId(party.id)
    setAddImageDialog(true)
  }

  const closeAddImageDialog = () => {
    setAddImageDialog(false)
  }

    const clickCharactersPage = (e, page) => {
    setCharactersPage(page);
  };

  const selectCharactersRows = (e) => {
    setCharactersRows(parseInt(e.target.value, 10));
    setCharactersPage(0);
  };

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacters(searchCharactersInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchCharactersInput])

  const handleSearch = (search) => {
    setSearchInput(search)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchInput])


  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  
  const handleChangePage = (e, page) => {
    setPage(page);
  };

  const handleAddVariation = () => {
    setVariable((prev) => [
      ...prev,
      {
        title: 'variable'
      },
    ])
  };


  const handleDeleteVariation = (index) => {
     setVariable((prev) => prev.filter((_, i) => i !== index));
  };





  return (
    <>
     { apiLoading && <Spinner /> }
     
      <Grid container spacing={2}>
                <Grid item size={{xs: 12, md: 12, lg: 12}}>
          <Button  startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mb: 1}} onClick={(e) => handleAddVariation()} variant="contained">Add Variable</Button>
              </Grid>
        <Grid item size={{xs: 12, md: 12, lg: 12}}>
              <Grid container spacing={2}>
                 { variable?.map((item, index) => (
                  <Fragment key={index} >
                    <Grid item size={{xs: 12, md: 12, lg: 12}}>
                      <Paper
                        elevation={3}
                        sx={{    // ✅ Ensures full width
                          padding: 2
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item size={{xs: 12, md: 12, lg: 12}}>
                             <Grid container spacing={2}>
                              <Grid item size={{xs: 3, md: 3, lg: 3}}>
                                 <TextField fullWidth name="reaction" label="Reaction" variant="outlined" />
                              </Grid>
                               <Grid item size={{xs: 3, md: 3, lg: 3}}>
                                <FormControl fullWidth>
                                  <InputLabel id="element-label" >
                                      Element
                                  </InputLabel>
                                 <Select
                                     
                                        id="element-label"
                                        name="element_id"
                                        label="Element"
                                    >
                                        {elementsData.map((option, index) => (
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
                                  <Grid item size={{xs: 2, md: 2, lg: 2}}>
                                <Stack spacing={3} >
                                    <Autocomplete
                                      multiple
                                      options={perksData}
                                      getOptionLabel={(option) => option?.name}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          variant="outlined"
                                          label="Perks"
                                          placeholder="Perks"
                                        />
                                      )}
                                    />
                                </Stack>
                                </Grid>
                               <Grid item size={{xs: 2, md: 2, lg: 2}}>
                                <FormControl fullWidth>
                                  <InputLabel id="select-label">Choose Option</InputLabel>
                                  <Select
                                    labelId="select-label"
                                    label="Choose Option"
                                    defaultValue="party"
                                  >
                                    <MenuItem value="party"> All Party </MenuItem>
                                    <MenuItem value="my-party"> My Party</MenuItem>
                                  </Select>
                                </FormControl>
                                </Grid>
                                   <Grid item sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}} size={{xs: 2, md: 2, lg: 2}}>
                                     
                                        <IconButton
                                            color="info"
                                            onClick={(e) => handleDeleteVariation(index)}
                                          >
                                            <AutorenewIcon sx={{ fontSize: '24px' }} />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={(e) => handleDeleteVariation(index)}
                                          >
                                            <DeleteOutlineIcon sx={{ fontSize: '24px' }} />
                                        </IconButton>
                                     
                                  
                                  </Grid>
                                </Grid>
                          </Grid>
                          <Grid item size={{xs: 12, md: 12, lg: 12}}>
                            <Table>
                                <TableBody>
                                
                                    <TableRow >
                                      <TableCell>
                                        <Typography>asdasd</Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography>asdasd</Typography>
                                      </TableCell>
                                    </TableRow>
                                </TableBody>
                              </Table>
                          </Grid>
                        </Grid>
                      </Paper>
                       
                    </Grid>
                        </Fragment>
                 ))}
              </Grid>
         
        </Grid>
      </Grid>
      
    </>
  );
}
