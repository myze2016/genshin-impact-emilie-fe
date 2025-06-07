'use client'

import { Grid, Typography, Button, Box, Paper, TextField, CircularProgress } from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import CustomDialog from "@/components/dialog";
import { addCharacter, getCharacters, addCharacterPerk, getCharacterPerks, deleteCharacterPerk, addCharacterApi, getCharactersName } from "@/hooks/useCharacter";
import characterTable from "./tables/characterTable";
import perkTable from "./tables/perkTable";
import AddCharacterForm from "./forms/AddCharacterForm";
import AddCharacterPerksForm from "./forms/AddCharacterPerksForm";
import CustomTableV2 from "@/components/table/tableV2";
import CustomTableDialog from "@/components/dialog/table";
import { getCommons } from "@/hooks/useCommon";
import Spinner from "@/components/Spinner";
import { Add } from "@mui/icons-material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function Characters() {

  const [charactersPage, setCharactersPage] = useState(0)
  const [charactersPayload, setCharactersPayload] = useState('')
  const [refetchCharacters, setRefetchCharacters] = useState(false)
  const [searchCharacters, setSearchCharacters] = useState('')
  const [searchCharactersInput, setSearchCharactersInput] = useState('')
  const [charactersRows, setCharacterRows] = useState(10)
  const { data: charactersData, loading: charactersLoading, total: charactersTotal } = getCharactersName(charactersPayload, refetchCharacters, searchCharacters, charactersPage+1, charactersRows)
  
  const [characterPerksPayload, setCharacterPerksPayload] = useState('')
  const [refetchCharacterPerks, setRefetchCharacterPerks] = useState(false)
  const [searchPerks, setSearchPerks] = useState('')
  const [searchPerksInput, setSearchPerksInput] = useState('')
  const [ perksPage, setPerksPage] = useState(0)
  const [ perksRows, setPerksRows] = useState(10)
  const { data: perksData, loading: perksLoading, total: perksTotal } = getCharacterPerks(characterPerksPayload, refetchCharacterPerks, searchPerks, perksPage+1, perksRows)

  const [commonsPayload, setCommonsPayload] = useState('')
  const [refetchCommons, setRefetchCommons] = useState(false)
  const [searchCommons, setSearchCommons] = useState('')
  const { data: commonsData, loading: commonsLoading } = getCommons(commonsPayload, refetchCommons, searchCommons)

  const [characterId, setCharacterId] = useState(0)

  const [ apiLoading, setApiLoading ] = useState(false)
  const [addCharacterPerksDialog, setAddCharacterPerksDialog] = useState(false)
  const [addCharacterDialog, setAddCharacterDialog] = useState(false)

  const [characterPerkFormData, setCharacterPerkFormData] = useState({
    character_id: '',
    perk_id: ''
  })

  const [characterFormData, setCharacterFormData] = useState({
    name: '',
    element: ''
  })

  const changeFormData = (e, formData, setFormData) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
  }

  
  const handleAddCharacter = async (e) => {
    setApiLoading(true)
    let response = await addCharacter(characterFormData)
     if (response?.data?.success) {
      resetCharacterFormData()
      setRefetchCharacters((prev) => !prev)
      setAddCharacterDialog(false)
    }
    setApiLoading(false)
  }
  



  const openAddCharacterPerksDialog = (character) => {
    setCharacterId(character?.id)
    setCharacterPerksPayload(prev => ({
      ...prev,
      character_id: character?.id, 
    }));
    setAddCharacterPerksDialog(true)
  }

  const handleClosePerkDialog = (e) => {
    resetSearchPerksInput()
    setAddCharacterPerksDialog(false)
  }

  const resetSearchPerksInput = () => {
      setSearchPerksInput('')
  }

  const handleCloseCharacterDialog = (e) => {
    setRefetchCharacters((prev) => !prev)
    resetCharacterFormData()
    setAddCharacterDialog(false)
  }

  
  const openAddCharacterDialog = (e) => {
    setAddCharacterDialog(true)
  }


  const changeSearchCharactersInput = (search) => {
    setSearchCharactersInput(search)
  }

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacters(searchCharactersInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchCharactersInput])

  const handleFillCommon = (value) => {
    if (!searchPerksInput.includes(value)) {
      setSearchPerksInput((prev) => prev + (value + ' '))
    } else {
      setSearchPerksInput((prev) => prev.replace(value + ' ', ''))
    }
  }


  const changeSearchPerksInput = (search) => {
    setSearchPerksInput(search)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchPerks(searchPerksInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchPerksInput])

  const clickAddCharacterPerk = async (perk) => {
    const payload = {
      perk_id: perk?.id,
      character_id: characterId
    };
    let response = await addCharacterPerk(payload)
    if (response?.data?.success) {
      setRefetchCharacterPerks((prev) => !prev)
    }
  }

  const clickRemoveCharacterPerk = async (perk) => {
    const payload = {
      perk_id: perk?.id,
      character_id: characterId
    };
    let response = await deleteCharacterPerk(payload)
    if (response?.data?.success) {
      setRefetchCharacterPerks((prev) => !prev)
    }
  }


  const clickAddCharacterApi = async (item) => {
    let response = await addCharacterApi(payload)
    if (response?.data?.success) {
      setRefetchCharacters((prev) => !prev)
    }
  }

  
  const resetCharacterFormData = () => {
      setCharacterFormData({
        name: '',
        element: ''
      })
  }



  const clickCharactersPage = (e, page) => {
    setCharactersPage(page);
  };

  const selectCharactersRow = (e) => {
    setCharacterRows(parseInt(e.target.value, 10));
    setCharactersPage(0);
  };

  const handlePerksChangePage = (e, page) => {
    setPerksPage(page);
  };

  const handlePerksRowsPerPage = (e) => {
    setPerksRows(parseInt(e.target.value, 10));
    setPerksPage(0);
  };


  
  const { columns: characterColumns  } = characterTable({openAddCharacterPerksDialog})
  const { columns: perkTableColumns } = perkTable({clickAddCharacterPerk, clickRemoveCharacterPerk})

  return (
    <>
      { apiLoading && <Spinner /> }
      <CustomDialog size="sm" open={addCharacterDialog}
              handleClose={handleCloseCharacterDialog} 
              handleConfirm={handleAddCharacter}  
              title="Add Character" 
              content={<AddCharacterForm characterFormData={characterFormData} 
                                 setCharacterFormData={setCharacterFormData}
                                 changeFormData={changeFormData} />}
            />
     <CustomTableDialog size="md" open={addCharacterPerksDialog}
            handleClose={handleClosePerkDialog} 
            handleConfirm={handleClosePerkDialog}  
            title="Add Character Perks" 
            page={charactersPage} 
            handleChangePage={clickCharactersPage} 
            rowsPerPage={charactersRows} 
            handleChangeRowsPerPage={selectCharactersRow} 
            total={charactersTotal}
            content={<AddCharacterPerksForm perkTableColumns={perkTableColumns}
                               perksData={perksData}
                               changeSearchPerksInput={changeSearchPerksInput}
                               searchCharacterPerksInput={searchPerksInput}
                               clickCommon={handleFillCommon}
                               commonsData={commonsData}
                               loading={commonsLoading && perksLoading}
                               page={perksPage} 
                               handleChangePage={handlePerksChangePage} 
                               rowsPerPage={perksRows}
                                handleChangeRowsPerPage={handlePerksRowsPerPage} 
                                total={perksTotal}
                                />}
          />
        
      <Grid container spacing={2}>
        <Grid item size={12}>
          <Grid container spacing={2} >
            <Grid item size={6}>
              <Button  startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1}} onClick={(e) => openAddCharacterDialog()} variant="contained">{ 'Add Character' }</Button>
              <Button startIcon={<FileUploadIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} onClick={(e) => clickAddCharacterApi()} variant="contained">Add Character Api</Button>
            </Grid>
             <Grid item size={6} >
               <Grid container  justifyContent="flex-end" spacing={2} >
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchCharactersInput}
                    onChange={(e) => changeSearchCharactersInput(e.target.value)}
                />
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
