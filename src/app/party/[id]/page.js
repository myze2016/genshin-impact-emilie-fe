'use client'

import { Grid, Typography, Button, Box, Chip, Stack, Paper, Table, TableRow, TableCell, TableBody, IconButton } from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import { getParty, addParty, addPartyPosition, addPartyPositionCharacter, removePartyPositionCharacter } from "../../../hooks/useParty";
import Title from "@/components/title";
import AddParty from "../form/AddParty";
import AddPartyPosition from "../form/AddPartyPosition";
import AddPartyPositionCharacter from "../form/AddPartyPositionCharacter";
import ViewCharacterPerks from "../form/ViewCharacterPerks";
import CustomDialog from "@/components/dialog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getCharacters } from "@/hooks/useCharacter";
import tableColumns from "../table/tableColumns";
import { getPerks } from "@/hooks/usePerk";
import { useParams, useRouter } from "next/navigation";
import CustomTableDialog from "@/components/dialog/table";

export default function Party() {
  const params = useParams();
  const id = params?.id;
  const [refetch, setRefetch] = useState(0)
  const [payload, setPayload] = useState({
    id: id,
  })
  const [refetchCharacter, setRefetchCharacter] = useState(0)
  const [addDialog, setAddDialog] = useState(false)
  const [search, setSearch] = useState('')
  const [debouncedInput, setDebouncedInput] = useState("")
  const { data: parties, loading } = getParty(payload, refetch)
  const [refetchPerks, setRefetchPerks] = useState(0)
  const [debouncedInputPerk, setDebouncedInputPerk] = useState("")
  const [perkPayload, setPerkPayload] = useState({
    search: '',
  })
  const { data: perks, loading: perkloading } = getPerks(perkPayload, refetchPerks, debouncedInputPerk)
  const { data: characters, loading: characterloading } = getCharacters(payload, refetchCharacter, debouncedInput)
  const [addDialogPosition, setAddDialogPosition] = useState(false)
  const [addDialogPositionCharacter, setAddDialogPositionCharacter] = useState(false)
  const [viewCharacterPerks, setViewCharacterPerks] = useState(false)
  const [partyId, setPartyId] = useState('')
  const [partyPositionId, setPartyPositionId] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    element: '',
    reaction: '',
  })

  const [formDataPosition, setFormDataPosition] = useState({
    name: '',
    description: '',
    party_id: partyId,
  })

  const [formDataPositionCharacter, setFormDataPositionCharacter] = useState({
    name: '',
    description: '',
    element: '',
    value: 100,
    party_position_id: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    element: '',
    reaction: '',
  })

   const handleSearch = (search) => {
      setSearch(search)
    }
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("setDebouncedInput")
      setDebouncedInput(search)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])


  useEffect(() => {
    if (id) {
      setPayload(prev => ({
        ...prev,
        id: id,
      }));
    }
  }, [])

  const handleChangeForm = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
  }

  const handleCancelAdd = (e) => {
    setAddDialog(false)
  }

  const handleConfirmAdd = async (e) => {
    await addParty(formData)
    setRefetch((prev) => !prev)
    setAddDialog(false)
  }

  const handleChangeFormPosition = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...formDataPosition, [name]: value }
    setFormDataPosition(updatedForm)
  }

  const handleCancelAddPosition = (e) => {
    setAddDialogPosition(false)
  }

  const handleSearchChip = (value) => {
    if (!search.includes(value)) {
      setSearch((prev) => prev+' '+value)
    } else {
      setSearch((prev) => prev.replace(' '+value, ''))
    }
  }

  const handleChangeFormPositionCharacter = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...formDataPositionCharacter, [name]: value }
    setFormDataPositionCharacter(updatedForm)
  }

  
  const handleCancelAddPositionCharacter = (e) => {
    setAddDialogPositionCharacter(false)
  }

  const handleCloseViewCharacterPerks = (e) => {
    setViewCharacterPerks(false)
  }


  const handleConfirmAddPositionCharacter = async (e) => {
    const formDataCharacterPosition = {
      ...formDataPositionCharacter,
      party_position_id: partyPositionId,
    };
    await addPartyPositionCharacter(formDataCharacterPosition)
    setRefetch((prev) => !prev)
    setAddDialogPositionCharacter(false)
  }

  const handleConfirmAddPosition = async (e) => {
    const formDataPositionParty = {
      ...formDataPosition,
      party_id: partyId,
    };
    await addPartyPosition(formDataPositionParty)
    setRefetch((prev) => !prev)
    setAddDialogPosition(false)
  }

  const handleaddDialogPoisition = (partyId) => {
    setAddDialogPosition(true)
    setPartyId(partyId)
  }
  const handleaddDialogPoisitionCharacter = (partyId) => {
    setAddDialogPositionCharacter(true)
    setPartyPositionId(partyId)
  }

  const addCharacterPosition = async (item) => {
    const payload = {
        character_id: item?.id,
        party_position_id: partyPositionId
    };
    await addPartyPositionCharacter(payload)
    setAddDialogPositionCharacter(false)
    setRefetch((prev) => !prev)
  }

  const removeCharacterPosition = async (item) => {
    const payload = {
      perk_id: item?.id,
      character_id: characterId
    };
    await removePartyPositionCharacter(payload)
    setRefetchPerk((prev) => !prev)
  }

  const { headers } = tableColumns({addCharacterPosition})

  return (
    <>
       <CustomDialog open={addDialogPosition}
              handleClose={handleCancelAddPosition} 
              handleConfirm={handleConfirmAddPosition}  
              title="Add Party Position" 
              size="xs"
              content={<AddPartyPosition formData={formDataPosition} 
                                 setFormData={setFormDataPosition}
                                 handleChangeForm={handleChangeFormPosition} />}
            />
       <CustomTableDialog open={addDialogPositionCharacter}
              size="lg"
              handleClose={handleCancelAddPositionCharacter} 
              handleConfirm={handleConfirmAddPositionCharacter}  
              title="Add Party Position Character" 
              content={<AddPartyPositionCharacter formData={formDataPositionCharacter} 
                                 setFormData={setFormDataPositionCharacter}
                                 handleChangeForm={handleChangeFormPositionCharacter}
                                  headers={headers}
                                  data={characters}
                                  handleSearch={handleSearch}
                                  search={search}
                                  handleSearchChip={handleSearchChip}
                                  dataChips={perks}
                                  />}
            />
        <CustomDialog open={viewCharacterPerks}
            handleClose={handleCloseViewCharacterPerks} 
            handleConfirm={(e) => {}}  
            title="Add Party Position Character" 
            content={<ViewCharacterPerks formData={formDataPositionCharacter} 
                                setFormData={setFormDataPositionCharacter}
                                handleChangeForm={handleChangeFormPositionCharacter} />}
          />
      <Grid container spacing={2}>
        {
          parties && parties?.map((party, index) => (

            console.log('parties122131', party?.character),
            <Fragment key={index}>
              <Grid item size={12}>
                <Paper sx={{ padding: 2, backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${party?.character?.namecard_background_url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center', }}>
                  <Grid container>
                    <Grid item size={12} sx={{mb: 1}}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">{party?.name}</Typography>
                        <Button onClick={(e) => handleaddDialogPoisition(party?.id)} variant="contained">Add Party Position</Button>
                      </Box>
                    </Grid>
                    <hr style={{ width: '100%' }} />
                    <Grid item size={12} >
                      <Typography variant="subtitle1">{party?.element}&nbsp;&nbsp;•&nbsp;&nbsp;{party?.reaction}</Typography>
                    </Grid>
                    <Grid item size={12} sx={{mt: 1}}>
                      <Typography>{party?.description}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item size={12}>
                <Paper >
                  <Table>
                    <TableBody>
                      {party?.positions?.map((position, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography>{position?.name}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{position?.description}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
              {/* {
                party && party?.positions?.map((position, index) => (
                  <Grid key={index} item size={12}>
                      <Grid container spacing={2}>
                        <Grid item size={{xs: 6, md: 2}}>
                          <Typography>{position?.name}</Typography>
                        </Grid>
                        <Grid item size={{xs: 6, md: 2}}>
                          <Typography>{position?.description}</Typography>
                        </Grid>
                      </Grid>
                  </Grid>
                ))
              } */}
               <Grid item size={12}>
                <Grid container spacing={2}>
                  {
                    party && party?.positions?.map((position, index) => (
                      <Grid key={index} item size={6}>
                        <Paper sx={{ padding: 2 }}>
                          <Grid container spacing={0}>
                            <Grid item size={12} >
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography sx={{ fontWeight: 'bold' }}>{position?.name}</Typography>
                                  <IconButton
                                    color="primary"
                                    onClick={() => handleaddDialogPoisitionCharacter(position?.id)}
                                    aria-label="add character to position"
                                  >
                                    <AddCircleOutlineIcon />
                                  </IconButton>
                              </Box>
                            </Grid>
                            <hr style={{ width: '100%' }} />
                            {
                              position && position?.characters_value?.map((character, index) => (
                                <Grid key={index} item size={12}>
                                  <Grid container spacing={0}>
                                      <Grid item size={12}>
                                        <Typography>{character?.character?.name}</Typography>
                                        <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap" useFlexGap>
                                        {
                                          character && character?.character?.perks.slice(0, 3).map((perk, index) => (
                                            <Chip
                                              key={index}
                                              label={perk.perk.name}
                                              color="primary"
                                              variant="contained"
                                            />
                                          
                                          ))
                                        }
                                        </Stack>
                                      </Grid>
                                    </Grid>
                                </Grid>
                              ))
                            }
                          </Grid>
                        </Paper>
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>
            </Fragment>
          ))
        }
      </Grid>
      
    </>
  );
}
