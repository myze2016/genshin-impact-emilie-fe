'use client'

import { Grid, Typography, Button, Box, Paper, TextField, InputAdornment } from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import CustomDialog from "@/components/dialog";
import { addCharacter, addCharacterPerk, getCharacterPerks, deleteCharacterPerk, addCharacterApi, getCharactersName } from "@/hooks/useCharacter";
import { getElements } from "@/hooks/useElements";
import characterTable from "./tables/characterTable";
import perkTable from "./tables/perkTable";
import AddCharacterForm from "./forms/AddCharacterForm";
import AddCharacterPerksForm from "./forms/AddCharacterPerksForm";
import CustomTableV2 from "@/components/table/tableV2";
import CustomTableDialog from "@/components/dialog/table";
import { getCommons } from "@/hooks/useCommon";
import Spinner from "@/components/Spinner";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CustomConfirmDialog from "@/components/dialog/confirm";
import AddPerkForm from "./forms/AddPerkForm";
import { addPerk } from "@/hooks/usePerk";
import CustomSearch from "@/components/Search";
import weaponTable from "./tables/weaponTable";
import artifactTable from "./tables/artifactTable";
import AddArtifactsForm from "./forms/AddArtifactsForm";
import AddWeaponsForm from "./forms/AddWeaponsForm";
import { getWeaponPerks } from "@/hooks/useWeapon";
import { getArtifactPerks } from "@/hooks/useArtifact";
import { getWeaponSearch } from "@/hooks/useWeapon";
import { getWeaponTypes } from "@/hooks/useWeaponType";
import { addCharacterWeapon, removeCharacterWeapon } from "@/hooks/useCharacterWeapon";
import { getArtifactSearch } from "@/hooks/useArtifact";
import { addCharacterArtifact, removeCharacterArtifact } from "@/hooks/useCharacterArtifact";
import { useElementContext } from "@/context/ElementContext";
import { useCommonContext } from "@/context/CommonContext";
import { useWeaponTypeContext } from "@/context/WeaponTypeContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

export default function Characters() {
  const router = useRouter()
  const { characterSearchContext, setCharacterSearchContext } = useUser()
  const { data: elementsData, loading: elementsLoading } = useElementContext()
  const { data: typeData, loading: typeLoading } = useWeaponTypeContext()
  const { data: commonsData, loading: commonsLoading } = useCommonContext()
  const [ apiDialog, setApiDialog] = useState(false)
  const [ apiLoading, setApiLoading] = useState(false)

  const [charactersPage, setCharactersPage] = useState(0)
  const [charactersPayload, setCharactersPayload] = useState('')
  const [refetchCharacters, setRefetchCharacters] = useState(false)
  const [searchCharacters, setSearchCharacters] = useState('')
  const [searchCharactersInput, setSearchCharactersInput] = useState('')
  const [charactersRows, setCharacterRows] = useState(10)
  const { data: charactersData, loading: charactersLoading, total: charactersTotal } = getCharactersName(charactersPayload, refetchCharacters, searchCharacters, charactersPage+1, charactersRows)

  const [ characterDialog, setCharacterDialog] = useState(false);
  const [characterFormData, setCharacterFormData] = useState({
    name: '',
    element_id: '',
    weapon_type_id: '',
  })
  const handleCloseCharacterDialog = (e) => {
    setRefetchCharacters((prev) => !prev)
    setCharacterFormData({
      name: '',
      element_id: '',
      weapon_type_id: '',
    })
    setCharacterDialog(false)
  }

  const [ addPerkDialog, setAddPerkDialog] = useState(false)
  const [ perkFormData, setPerkFormData] = useState({
    name: '',
    description: '',
  })

  const changeFormData = (e, formData, setFormData) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
  }

  const [characterId, setCharacterId] = useState('')
   const [weaponTypeId, setWeaponTypeId] = useState('')
  const [perksDialog, setPerksDialog] = useState(false)
  const openAddCharacterPerksDialog = (character) => {
    setCharacterId(character?.id)
    setPerksDialog(true)
  }

  const [artifactsDialog, setArtifactsDialog] = useState(false)
  const handlOpenArtifactDialog = (character) => {
    setCharacterId(character?.id)
    setArtifactsDialog(true)
  }

  const [weaponsDialog, setWeaponsDialog] = useState(false)
  const handleOpenWeaponDialog = (character) => {
    setWeaponTypeId(character?.weapon_type_id)
    setCharacterId(character?.id)
    setWeaponsDialog(true)
  }

  const handleAddCharacter = async (e) => {
    setApiLoading(true)
    let response = await addCharacter(characterFormData)
     if (response?.data?.success) {
       setCharacterFormData({
        name: '',
        element_id: '',
        weapon_type_id: '',
      })
      setRefetchCharacters((prev) => !prev)
      setCharacterDialog(false)
    }
    setApiLoading(false)
  }
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacters(searchCharactersInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchCharactersInput])

  useEffect(() => {
    if (characterSearchContext) {
      setSearchCharactersInput(characterSearchContext)
    }
  }, [])


   const changeSearchCharactersInput = (search) => {
    setSearchCharactersInput(search)
  }

  const handleAddCharacterApi = async (item) => {
    setApiDialog(false)
    let response = await addCharacterApi()
    setRefetchCharacters((prev) => !prev)
    
  }

  const clickCharactersPage = (e, page) => {
    setCharactersPage(page);
  };

  const selectCharactersRow = (e) => {
    setCharacterRows(parseInt(e.target.value, 10));
    setCharactersPage(0);
  };


  const handleCloseAddPerkDialog = (e) => {
    setAddPerkDialog(false)
    setPerkFormData({
      name: '',
      description: '',
    })
  }


  const confirmAddPerkDialog = async (e) => {
    setApiLoading(true)
    let response = await addPerk(perkFormData)
    if (response?.data?.success) {
      setPerkFormData({
        name: '',
        description: '',
      })
     
      setAddPerkDialog(false)
    }
    setApiLoading(false)
  }
  
  const { columns: characterColumns  } = characterTable({openAddCharacterPerksDialog, handleOpenWeaponDialog, handlOpenArtifactDialog})

  return (
    <>
      { apiLoading && <Spinner /> }
      <AddCharacterPerksForm  chipData={commonsData} setRefetchCharacters={setRefetchCharacters} characterId={characterId} dialog={perksDialog} setDialog={setPerksDialog} />
        <AddArtifactsForm  chipData={commonsData} setRefetchCharacters={setRefetchCharacters} characterId={characterId} dialog={artifactsDialog} setDialog={setArtifactsDialog} />
          <AddWeaponsForm  chipData={commonsData} setRefetchCharacters={setRefetchCharacters} characterId={characterId} weaponTypeId={weaponTypeId} dialog={weaponsDialog} setDialog={setWeaponsDialog} />
      <CustomDialog open={addPerkDialog}
        handleClose={handleCloseAddPerkDialog} 
        handleConfirm={confirmAddPerkDialog}  
        title="Add Perk" 
        size="md"
        content={<AddPerkForm perkFormData={perkFormData} 
                          setPerkFormData={setPerkFormData}
                          changeFormData={changeFormData}
                          commonsData={commonsData} />} />
      <CustomConfirmDialog size="xs" open={apiDialog}
              handleClose={(e) => setApiDialog(false)} 
              handleConfirm={(e) => handleAddCharacterApi()}  
              title="Add Character Api" 
              message="Are you sure you want to retrieve characters from Api?"
            />
      <CustomDialog size="sm" open={characterDialog}
              handleClose={handleCloseCharacterDialog} 
              handleConfirm={handleAddCharacter}  
              title="Add Character" 
              content={<AddCharacterForm characterFormData={characterFormData} 
                                 setCharacterFormData={setCharacterFormData}
                                 changeFormData={changeFormData}
                                 options={elementsData}
                                 typeOptions={typeData} />}
            />
 
      
        
      <Grid container spacing={2}>
        <Grid item size={12}>
          <Grid container spacing={2} >
            <Grid item size={8}>
               <Button  color='secondary' startIcon={<ReplyOutlinedIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mb: 1}} onClick={(e) => router.back()} variant="contained">Back</Button>
              <Button  startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mb: 1}} onClick={(e) => setCharacterDialog(true)} variant="contained">Add Character</Button>
               <Button  startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mb: 1}} onClick={(e) => setAddPerkDialog(true)} variant="contained">Create Perk</Button>
              <Button startIcon={<FileUploadIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mb: 1}} onClick={(e) => setApiDialog(true)} variant="contained">Add Character Api</Button>
            </Grid>
             <Grid item size={4} >
               <Grid container  justifyContent="flex-end" spacing={2} >
                <CustomSearch  search={searchCharactersInput}
                  handleSearch={changeSearchCharactersInput}
                  fullWidth={false}>
                </CustomSearch>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item size={12}>
           <CustomTableV2 minWidth="650" headers={characterColumns} data={charactersData} page={charactersPage} handleChangePage={clickCharactersPage} rowsPerPage={charactersRows} handleChangeRowsPerPage={selectCharactersRow} total={charactersTotal} loading={charactersLoading} />
        </Grid>
      </Grid>
      
    </>
  );
}
