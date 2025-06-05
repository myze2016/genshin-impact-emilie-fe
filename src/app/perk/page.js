'use client'

import { Grid, Button } from "@mui/material"
import { useState, useEffect } from "react";
import CustomDialog from "@/components/dialog";
import CustomTableV2 from "@/components/table/tableV2";
import tableColumns from "./table/tableColumns";
import AddPerk from "./form/AddPerk";
import AddCommon from "./form/AddCommon";
import { addCommon, getCommons } from "@/hooks/useCommon";
import { addPerk, getPerks } from "@/hooks/usePerk";

export default function Page() {
  const [refetch, setRefetch] = useState(0)
  const [refetchCommon, setRefetchCommon] = useState(0)
  const [payload, setPayload] = useState('')
  const [search, setSearch] = useState('')
  const [libraryDialog, setLibraryDialog] = useState(false)
  const [debouncedInput, setDebouncedInput] = useState("")
  const { data: perks, loading } = getPerks(payload, refetch, search)
  const { data: commons, loading: commonLoading } = getCommons(payload, refetchCommon, search)
  const [addDialog, setAddDialog] = useState(false)
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
  const [commonFormData, setCommonFormData] = useState({
    name: '',
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


  const handlePerkData = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...perkData, [name]: value }
    setPerkData(updatedForm)
  }

  const handleClickChip = (name) => {
      setPerkData((prev) => ({
        ...prev,
        name: prev.name + name + ' '
      }));
  }

  const handleCommonData = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...commonFormData, [name]: value }
    setCommonFormData(updatedForm)
  }

  const handleAddPerk = async (e) => {
    await addPerk(perkData)
    setPerkData({
      name: '',
      description: '',
    })
    setRefetch((prev) => !prev)
    setPerkDialog(false)
  }


  const closePerkDialog = (e) => {
    setPerkDialog(false)
  }

  const openPerkDialog = (e) => {
    setPerkDialog(true)
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

  const confirmLibraryDialog = async (search) => {
     await addCommon(commonFormData)
    setRefetchCommon((prev) => !prev)
  }


  const openLibraryDialog = (search) => {
    setLibraryDialog(true)
  }

  const { headers } = tableColumns()
  
  return (
    <>
      <CustomDialog open={perkDialog}
        handleClose={closePerkDialog} 
        handleConfirm={handleAddPerk}  
        title="Add Perk" 
        size="md"
        content={<AddPerk formData={perkData} 
                            setFormData={setPerkData}
                            handleChangeForm={handlePerkData}
                            dataChip={commons}
                            handleClickChip={handleClickChip} />}
      />
      <CustomDialog open={perkDialog}
          handleClose={closePerkDialog} 
          handleConfirm={handleAddPerk}  
          title="Add Perk" 
          size="md"
          content={<AddPerk formData={perkData} 
                              setFormData={setPerkData}
                              handleChangeForm={handlePerkData}
                              dataChip={commons}
                              handleClickChip={handleClickChip} />}
        />

      <CustomDialog open={libraryDialog}
          handleClose={closeLibraryDialog} 
          handleConfirm={confirmLibraryDialog}  
          title="Tag Common" 
          content={<AddCommon formData={commonFormData} 
                              setFormData={setCommonFormData}
                              handleChangeForm={handleCommonData}
                              tagData={commons}
                              handleAddCommon={confirmLibraryDialog} />}
        />
        
      <Grid container spacing={2}>
        <Grid item size={12}>
            <Button onClick={openPerkDialog} variant="contained" sx={{mr: 1}}>Add Perk</Button>
            <Button onClick={openLibraryDialog} variant="contained">Tag Common</Button>
        </Grid>
        <Grid item size={12}>
          <CustomTableV2 minWidth="650" headers={headers} data={perks} />
        </Grid>
      </Grid>
      
    </>
  );
}
