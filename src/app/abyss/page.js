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
   
import { getPerks } from "@/hooks/usePerk";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { refetchAbyss } from "../../hooks/useParty";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, partyContextId, setPartyContextId } = useUser()
    const router = useRouter()
  const [ perksPayload, setPerksPayload ] = useState('')
  const [ refetchPerks, setRefetchPerks ] = useState(false)
  const [ searchPerks, setSearchPerks ] = useState('')
  const [ perksRows, setPerksRows ] = useState(1000)
  const [ perksPage, setPerksPage ] = useState(0)
  const { data: perksData, loading: perksLoading, total: perksTotal } = getPerks(perksPayload, refetchPerks, searchPerks, perksPage+1, perksRows)

  const [ elementsPayload, setElementsPayload] = useState('')
  const [ refetchElements, setRefetchElements] = useState(false)
  const { data: elementsData, loading: elementsLoading } = getElements(elementsPayload, refetchElements)

  const [variable, setVariable] = useState([ {
    reaction: '',
    element_id: '',
    perks: [],
    select: 'party',
    data: [],
    rowsPerPage: 10,
    page: 0,
    total: 0
  }]);

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
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacters(searchCharactersInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchCharactersInput])


  const handleAddVariation = () => {
    setVariable((prev) => [
      ...prev,
      {
        reaction: '',
        element_id: '',
        perks: [],
        select: 'party',
        data: [],
        rowsPerPage: 10,
        page: 0,
        total: 0
      },
    ])
  };


  const handleDeleteVariation = (index) => {
     setVariable((prev) => prev.filter((_, i) => i !== index));
  };


  const handleRefetchAbyss = async (index) => {
    setApiLoading(true)
    const response = await refetchAbyss(variable[index], 0+1, 10)
    if (response?.data?.success) {  
      const newVariable = [...variable];
      newVariable[index] = {
        ...newVariable[index],
        data: response?.data?.data?.data || [],
        total: response?.data?.data?.total || 0,
        page: 0,
        rowsPerPage: 10,
      };
      setVariable(newVariable);
    }
    setApiLoading(false)
  }

  const handleRefetchAbyssPage = async (index, updated) => {
    setApiLoading(true)
    const response = await refetchAbyss(updated, 0+1, 10)
    if (response?.data?.success) {  
      const newVariable = [...updated];
      newVariable[index] = {
        ...newVariable[index],
        data: response?.data?.data?.data || [],
        total: response?.data?.data?.total || 0,
      };
      setVariable(newVariable);
    }
    setApiLoading(false)
  }


  const handleChangePage = (page, index) => {
    const updated = [...variable];
    updated[index] = {
      ...updated[index],
      page: page, 
    };
    setVariable(updated);
    handleRefetchAbyssPage(index, updated);
  };


  const handleChangeRowsPerPage = (e, index) => {
    console.log('e', e.target.value)
    const updated = [...variable];
    updated[index] = {
      ...updated[index],
      page: 0, 
      rowsPerPage: parseInt(e.target.value, 10)
    };
    console.log('index', index)
    console.log('updated', updated)
    setVariable(updated);
    handleRefetchAbyssPage(index, updated);
  };


    const handleRedirectParty = (e, id) => {
    setPartyContextId(id)
    router.push('/party');
  }


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
                                 <TextField fullWidth value={variable[index].reaction} name="reaction" label="Reaction" variant="outlined" onChange={(e) => {
                                  const newVariable = [...variable];
                                  newVariable[index].reaction = e.target.value;
                                  setVariable(newVariable);
                                }} />
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
                                        value={variable[index].element_id}
                                        onChange={(e) => {
                                          const newVariable = [...variable];
                                          newVariable[index].element_id = e.target.value;
                                          setVariable(newVariable);
                                        }}
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
                                      value={variable[index].perks}
                                      onChange={(event, newValue) => {
                                        const newVariable = [...variable];
                                        newVariable[index].perks = newValue;
                                        setVariable(newVariable);
                                      }}
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
                                    value={variable[index].select}
                                    onChange={(event) => {
                                      const newVariable = [...variable];
                                      newVariable[index].select = event.target.value;
                                      setVariable(newVariable);
                                    }}
                                  >
                                    <MenuItem value="party"> All Party </MenuItem>
                                    <MenuItem value="my-party"> My Party</MenuItem>
                                  </Select>
                                </FormControl>
                                </Grid>
                                   <Grid item sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}} size={{xs: 2, md: 2, lg: 2}}>
                                     
                                        <IconButton
                                            color="info"
                                            onClick={(e) => handleRefetchAbyss(index)}
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
                                   
                                    {
                                      item.data?.length > 0 && item?.data?.map((row, rowIndex) => (
                                        <TableRow key={rowIndex} >
                                          <TableCell>
                                            <Typography>{row.name}</Typography>
                                          </TableCell>
                                          <TableCell>
                                            <Typography>{row?.element?.name}</Typography>
                                          </TableCell>
                                          <TableCell>
                                            <Typography>{row.reaction}</Typography>
                                          </TableCell>
                                          <TableCell>
                                            <Button color="info" startIcon={<ReplyAllIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                          sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}}  onClick={(e) => handleRedirectParty(e, row.id)} variant="contained" size="small"> View Party</Button>
                                          </TableCell>
                                        </TableRow>
                                      ))
                                    }
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                count={item.total}
                                page={item.page}
                                onPageChange={(event, newPage) => handleChangePage(newPage, index)}
                                rowsPerPage={item.rowsPerPage}
                                onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, index)}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                            />
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
