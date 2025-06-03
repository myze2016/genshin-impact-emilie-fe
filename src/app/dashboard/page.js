'use client'

import { Grid, Typography, Button, Box, Chip, Stack, Card, CardMedia, CardContent, CardActionArea } from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import { getParties, addParty, addPartyPosition, addPartyPositionCharacter, removePartyPositionCharacter } from "../../hooks/useParty";
import Title from "@/components/title";
import AddParty from "./form/AddParty";
import AddPartyPosition from "./form/AddPartyPosition";
import AddPartyPositionCharacter from "./form/AddPartyPositionCharacter";
import ViewCharacterPerks from "./form/ViewCharacterPerks";
import CustomDialog from "@/components/dialog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getCharacters } from "@/hooks/useCharacter";
import tableColumns from "./table/tableColumns";
import { getPerks } from "@/hooks/usePerk";


export default function Dashboard() {
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
              size="sm"
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
        <Grid item size={12}>
          <Button onClick={(e) => setAddDialog(true)} variant="contained">Add Party</Button>
        </Grid>
        <Grid item size={12}>
          <Grid container spacing={2}>
            {
              parties && parties?.map((party, index) => (
                <Fragment key={index}>
                    <Card sx={{ width: 345, height: 160 }}>
                      <CardActionArea href={`/party/${party.id}`} sx={{ height: '100%' }}>
                        <CardContent sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            height: '100%',
                          }}>
                          <Typography gutterBottom variant="h6" component="div">
                            {party?.name}
                          </Typography>
                          <Typography variant="body2" color="secondary">
                            {party?.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                </Fragment>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
      
    </>
  );
}
