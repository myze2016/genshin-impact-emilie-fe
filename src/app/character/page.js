'use client'

import { Grid, Typography, Button, Box } from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import { getParties, addPartyPosition, addPartyPositionCharacter } from "../../hooks/useParty";
import Title from "@/components/title";
import AddParty from "./form/AddParty";
import AddPartyPosition from "./form/AddPartyPosition";
import AddPartyPositionCharacter from "./form/AddPartyPositionCharacter";
import ViewCharacterPerks from "./form/ViewCharacterPerks";
import CustomDialog from "@/components/dialog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomTable from "@/components/table";
import { addCharacter, getCharacters, addCharacterPerk, getCharacterPerks, deleteCharacterPerk, addCharacterApi } from "@/hooks/useCharacter";

import AddCharacter from "./form/AddCharacter";
import tableColumns from "./table/tableColumns";
import { getPerks } from "@/hooks/usePerk";
import tableColumnPerks from "./table/tableColumnPerks";

export default function Character() {
  const [refetchCharacter, setRefetchCharacter] = useState(0)
  const [refetchPerk, setRefetchPerk] = useState(0)
  const [refetchPerks, setRefetchPerks] = useState(0)
  const [characterId, setCharacterId] = useState(0)
  const [payload, setPayload] = useState('')
  const [characterPerkPayload, setCharacterPerkPayload] = useState({
    character_id: '',
  })
  const [perkPayload, setPerkPayload] = useState({
    search: '',
  })
  const [searchCharacter, setSearchCharacter] = useState('')
  const [debouncedInputCharacter, setDebouncedInputCharacter] = useState("")
  const { data: characters, loading: characterloading } = getCharacters(payload, refetchCharacter, debouncedInputCharacter)
  const [search, setSearch] = useState('')
  const [debouncedInput, setDebouncedInput] = useState("")
  const [debouncedInputPerk, setDebouncedInputPerk] = useState("")
  const { data: characterPerks, loading: characterPerkloading } = getCharacterPerks(characterPerkPayload, refetchPerk, debouncedInput)
  const { data: perks, loading: perkloading } = getCharacterPerks(perkPayload, refetchPerks, debouncedInputPerk)
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
    setRefetchCharacter((prev) => !prev)
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

  const handleOpenViewCharacterPerks = (item) => {
    setCharacterId(item?.id)
    setCharacterPerkPayload(prev => ({
      ...prev,
      character_id: item?.id, 
    }));
    setViewCharacterPerks(true)
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
    setRefetchCharacter((prev) => !prev)
    setAddDialogPositionCharacter(false)
  }

  const handleConfirmAddPosition = async (e) => {
    const formDataPositionParty = {
      ...formDataPosition,
      party_id: partyId,
    };
    await addPartyPosition(formDataPositionParty)
    setRefetchCharacter((prev) => !prev)
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

  const handleSearch = (search) => {
    setSearch(search)
  }

  const handleSearchChip = (value) => {
    if (!search.includes(value)) {
      setSearch((prev) => prev+' '+value)
    } else {
      setSearch((prev) => prev.replace(' '+value, ''))
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInput(search)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  const handleSearchCharacter = (search) => {
    setSearchCharacter(search)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInputCharacter(search)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchCharacter])

  const handleAddCharacterPerk = async (item) => {
    const payload = {
      perk_id: item?.id,
      character_id: characterId
    };
    await addCharacterPerk(payload)
    setRefetchPerk((prev) => !prev)
  }

  

  const removeCharacterPerk = async (item) => {
    const payload = {
      perk_id: item?.id,
      character_id: characterId
    };
    await deleteCharacterPerk(payload)
    setRefetchPerk((prev) => !prev)
  }


  const handleAddCharacterApi = async (item) => {
    await addCharacterApi(payload)
    setRefetchCharacter((prev) => !prev)
  }


  const { headers: characterHeaders  } = tableColumns({handleOpenViewCharacterPerks})
  const { headers: perkHeaders } = tableColumnPerks({handleAddCharacterPerk, removeCharacterPerk})
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
            handleConfirm={handleCloseViewCharacterPerks}  
            title="Add Character Perks" 
            content={<ViewCharacterPerks formData={formData} 
                               setFormData={setFormData}
                               handleChangeForm={handleChangeForm}
                               headers={perkHeaders}
                               data={characterPerks}
                               handleSearch={handleSearch}
                               search={search}
                               handleSearchChip={handleSearchChip}
                               dataChips={perks} />}
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
            <Grid item size={2}>
              <Button onClick={(e) => handleAddCharacterApi()} variant="contained">Add Character Api</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item size={12}>
          <CustomTable minWidth="650" headers={characterHeaders} data={characters} />
        </Grid>
      </Grid>
      
    </>
  );
}
