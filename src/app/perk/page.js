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
import { addCharacter, getCharacters } from "@/hooks/useCharacter";
import AddCharacter from "./form/AddCharacter";
import tableColumns from "./table/tableColumns";
import AddPerk from "./form/AddPerk";
import { addPerk, getPerks } from "@/hooks/usePerk";
import CustomTableV2 from "@/components/table/tableV2";

export default function Page() {
  const [refetch, setRefetch] = useState(0)
  const [payload, setPayload] = useState('')
  const [search, setSearch] = useState('')
  const [libraryDialog, setLibraryDialog] = useState(false)
  const [debouncedInput, setDebouncedInput] = useState("")
  const { data: perks, loading } = getPerks(payload, refetch, search)
  const [addDialog, setAddDialog] = useState(false)
  const [addPerksDialog, setAddPerksDialog] = useState(false)
  const [viewCharacterPerks, setViewCharacterPerks] = useState(false)
  const [addDialogPosition, setAddDialogPosition] = useState(false)
  const [addDialogPositionCharacter, setAddDialogPositionCharacter] = useState(false)
  const [partyId, setPartyId] = useState('')
  const [partyPositionId, setPartyPositionId] = useState('')
  const [perkDialog, setPerkDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    element: ''
  })

  const [perkData, setPerkData] = useState({
    name: '',
    description: '',
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

  const handlePerkData = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...perkData, [name]: value }
    setPerkData(updatedForm)
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

  const handleAddPerk = async (e) => {
    await addPerk(perkData)
    setRefetch((prev) => !prev)
    setPerkDialog(false)
  }


  const closePerkDialog = (e) => {
    setPerkDialog(false)
  }

  const openPerkDialog = (e) => {
    setPerkDialog(true)
  }

  const generatePerk = (e) => {
    console.log('generating perk...')
    const wordSet = new Set();

    perks.forEach(perk => {
      const words = perk.split(' ');
      words.forEach(word => {
        if (!wordSet.has(word)) {
          wordSet.add(word);
        }
      });
    });

    const combinedString = Array.from(wordSet).join(' ');
    console.log('combinedString', combinedString)
  }


  const handleSearch = (search) => {
    setSearch(search)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInput(search)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  const closeLibraryDialog = (search) => {
    setLibraryDialog(false)
  }

  const confirmLibraryDialog = (search) => {
    setLibraryDialog(true)
  }




  const { headers } = tableColumns()
  
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
      <CustomDialog open={perkDialog}
          handleClose={closePerkDialog} 
          handleConfirm={handleAddPerk}  
          title="Add Perk" 
          content={<AddPerk formData={perkData} 
                              setFormData={setPerkData}
                              handleChangeForm={handlePerkData} />}
        />

      <LibraryDialog open={libraryDialog}
          handleClose={closeLibraryDialog} 
          handleConfirm={confirmLibraryDialog}  
          title="Tag Common" 
          content={<AddPerk formData={perkData} 
                              setFormData={setPerkData}
                              handleChangeForm={handlePerkData} />}
        />
        
      <Grid container spacing={2}>
        <Grid item size={12}>
            <Button onClick={openPerkDialog} variant="contained" sx={{mr: 1}}>Add Perk</Button>
            <Button onClick={openPerkDialog} variant="contained">Tag Common</Button>
        </Grid>
        <Grid item size={12}>
          <CustomTableV2 minWidth="650" headers={headers} data={perks} />
        </Grid>
      </Grid>
      
    </>
  );
}
