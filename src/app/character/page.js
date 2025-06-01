'use client'

import { Grid, Typography, Button, Box } from "@mui/material"
import { Fragment, useState } from "react";
import { getParties, addPartyPosition, addPartyPositionCharacter } from "../../hooks/useParty";
import Title from "@/components/title";
import AddParty from "./form/AddParty";
import AddPartyPosition from "./form/AddPartyPosition";
import AddPartyPositionCharacter from "./form/AddPartyPositionCharacter";
import ViewCharacterPerks from "./form/ViewCharacterPerks";
import CustomDialog from "@/components/dialog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomTable from "@/components/table";
import { addCharacter, getCharacters } from "@/hooks/useCharacter";
import AddCharacter from "./form/AddCharacter";
import tableColumns from "./table/tableColumns";

export default function Character() {
  const [refetch, setRefetch] = useState(0)
  const [payload, setPayload] = useState('')
  const { data: characters, loading } = getCharacters(payload, refetch)
  const [addDialog, setAddDialog] = useState(false)
  const [addPerksDialog, setAddPerksDialog] = useState(false)
  const [viewCharacterPerks, setViewCharacterPerks] = useState(false)
  const [addDialogPosition, setAddDialogPosition] = useState(false)
  const [addDialogPositionCharacter, setAddDialogPositionCharacter] = useState(false)
  const [partyId, setPartyId] = useState('')
  const [partyPositionId, setPartyPositionId] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    element: ''
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

  const handleChangeForm = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
  }

  const handleCancelAdd = (e) => {
    setAddDialog(false)
  }

  const handleConfirmAdd = async (e) => {
    await addCharacter(formData)
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

  const handleChangeFormPositionCharacter = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...formDataPositionCharacter, [name]: value }
    setFormDataPositionCharacter(updatedForm)
  }

  
  const handleCancelAddPositionCharacter = (e) => {
    setAddDialogPositionCharacter(false)
  }

  const handleOpenViewCharacterPerks = (e) => {
    console.log('asdasdasdsadad')
    setViewCharacterPerks(true)
  }

  const handleCloseViewCharacterPerks = (e) => {
    console.log('asdasdasdsadad')
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

  const { headers } = tableColumns({handleOpenViewCharacterPerks})
  
  return (
    <>
      <CustomDialog open={addDialog}
              handleClose={handleCancelAdd} 
              handleConfirm={handleConfirmAdd}  
              title="Add Character" 
              content={<AddCharacter formData={formData} 
                                 setFormData={setFormData}
                                 handleChangeForm={handleChangeForm} />}
            />
     <CustomDialog size="lg" open={viewCharacterPerks}
            handleClose={handleCloseViewCharacterPerks} 
            handleConfirm={(e) => {}}  
            title="Add Character Perks" 
            content={<ViewCharacterPerks formData={formData} 
                               setFormData={setFormData}
                               handleChangeForm={handleChangeForm} />}
          />
      <Grid container spacing={2}>
        <Grid item size={12}>
          <Title title="Character List"></Title>
        </Grid>
        <Grid item size={12}>
          <Grid container spacing={2}>
            <Grid item size={2}>
              <Button onClick={(e) => setAddDialog(true)} variant="contained">Add Character</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item size={12}>
          <CustomTable minWidth="650" headers={headers} data={characters} />
        </Grid>
      </Grid>
      
    </>
  );
}
