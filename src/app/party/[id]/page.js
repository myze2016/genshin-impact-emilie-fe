'use client'

import { Grid, Typography, Button, Box, Chip, Stack, Paper } from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import { getParties, addParty, addPartyPosition, addPartyPositionCharacter, removePartyPositionCharacter } from "../../../hooks/useParty";
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

export default function Party() {
  const params = useParams();
  const id = params?.id;
  const [refetch, setRefetch] = useState(0)
  const [payload, setPayload] = useState('')
  const [refetchCharacter, setRefetchCharacter] = useState(0)
  const [addDialog, setAddDialog] = useState(false)
  const [search, setSearch] = useState('')
  const [debouncedInput, setDebouncedInput] = useState("")
  const { data: parties, loading } = getParties(payload, refetch)
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
    console.log('item2', item)
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
      <CustomDialog open={addDialog}
              handleClose={handleCancelAdd} 
              handleConfirm={handleConfirmAdd}  
              title="Add Party" 
              content={<AddParty formData={formData} 
                                 setFormData={setFormData}
                                 handleChangeForm={handleChangeForm} />}
            />
       <CustomDialog open={addDialogPosition}
              handleClose={handleCancelAddPosition} 
              handleConfirm={handleConfirmAddPosition}  
              title="Add Party Position" 
              content={<AddPartyPosition formData={formDataPosition} 
                                 setFormData={setFormDataPosition}
                                 handleChangeForm={handleChangeFormPosition} />}
            />
       <CustomDialog open={addDialogPositionCharacter}
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
            <Fragment key={index}>
              <Grid item size={12}>
                <Paper sx={{ padding: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item size={2}>
                      <Typography>{party?.name}</Typography>
                    </Grid>
                    <Grid item size={2}>
                      <Typography>{party?.element}</Typography>
                    </Grid>
                    <Grid item size={2}>
                      <Typography>{party?.reaction}</Typography>
                    </Grid>
                  </Grid>
                  </Paper>
              </Grid>
              <Grid item size={12}>
                <Grid container spacing={2}>
                  <Grid item size={6}>
                    <Button onClick={(e) => handleaddDialogPoisition(party?.id)} variant="contained">Add Party Position</Button>
                  </Grid>
                </Grid>
              </Grid>
              {
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
              }
              
              <Grid key={index} sx={{marginTop: '25px'}}item size={12}>
                <Grid container spacing={2}>
                {
                  party && party?.positions?.map((position, index) => (
                      <Grid key={index} item size={{xs: 6, md: 2}}>
                        <Grid container spacing={2}>
                          <Grid item size={12}>
                            <Typography sx={{ fontWeight: 'bold' }}>{position?.name}</Typography>
                          </Grid>
                        {
                          position && position?.characters_value?.map((character, index) => (
                            <Grid key={index} item size={12}>
                               <Grid container spacing={0}>
                                  <Grid item size={{xs: 6, md: 2}}>
                                    <Typography>{character?.character?.name}</Typography>
                                  </Grid>
                                  <Grid item size={{xs: 6, md: 10}}>
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
                          <Grid item size={12}>
                            <Button 
                              onClick={(e) => handleaddDialogPoisitionCharacter(position?.id)}
                              variant="contained"
                            >
                              <AddCircleOutlineIcon />
                            </Button>
                          </Grid>
                        </Grid>
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
