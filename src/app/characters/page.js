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
  const [searchCharacterPerks, setSearchCharacterPerks] = useState('')
  const [searchCharacterPerksInput, setSearchCharacterPerksInput] = useState('')
  const { data: perksData, loading: perksLoading } = getCharacterPerks(characterPerksPayload, refetchCharacterPerks, searchCharacterPerks)

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

  const cancelAddCharacterDialog = (e) => {
    setAddCharacterDialog(false)
  }

  const confirmAddCharacterDialog = async (e) => {
    setApiLoading(true)
    response = await addCharacter(formData)
     if (response?.data?.success) {
      setCharacterFormData({
        name: '',
        element: ''
      })
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

  const closeAddCharacterPerksDialog = (e) => {
    setAddCharacterPerksDialog(false)
  }

  const closeAddCharacterDialog = (e) => {
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

  const clickCommon = (value) => {
    if (!search.includes(value)) {
      searchCharactersInput((prev) => prev + (value + ' '))
    } else {
      searchCharactersInput((prev) => prev.replace(value + ' ', ''))
    }
  }


  const changeSearchPerksInput = (search) => {
    setSearchCharacterPerksInput(search)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacterPerks(searchCharacterPerksInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchCharacterPerksInput])

  const clickAddCharacterPerk = async (perk) => {
         setApiLoading(true)
    const payload = {
      perk_id: perk?.id,
      character_id: characterId
    };
    let response = await addCharacterPerk(payload)
    if (response?.data?.success) {
      setRefetchCharacterPerks((prev) => !prev)
      setRefetchCharacters((prev) => !prev)
    }
    setApiLoading(false)
  }

  const clickRemoveCharacterPerk = async (perk) => {
     setApiLoading(true)
    const payload = {
      perk_id: perk?.id,
      character_id: characterId
    };
    let response = await deleteCharacterPerk(payload)
    if (response?.data?.success) {
      setRefetchCharacterPerks((prev) => !prev)
      setRefetchCharacters((prev) => !prev)
    }
     setApiLoading(false)
  }


  const clickAddCharacterApi = async (item) => {
    let response = await addCharacterApi(payload)
    if (response?.data?.success) {
      setRefetchCharacters((prev) => !prev)
    }
  }

  const clickCharactersPage = (e, page) => {
    setCharactersPage(page);
  };

  const selectCharactersRow = (e) => {
    setCharacterRows(parseInt(e.target.value, 10));
    setCharactersPage(0);
  };

  
  const { columns: characterColumns  } = characterTable({openAddCharacterPerksDialog})
  const { columns: perkTableColumns } = perkTable({clickAddCharacterPerk, clickRemoveCharacterPerk})

  return (
    <>
      { apiLoading && <Spinner /> }
      <CustomDialog open={addCharacterDialog}
              handleClose={closeAddCharacterDialog} 
              handleConfirm={confirmAddCharacterDialog}  
              title="Add Character" 
              content={<AddCharacterForm characterFormData={characterFormData} 
                                 setCharacterFormData={setCharacterFormData}
                                 changeFormData={changeFormData} />}
            />
     <CustomTableDialog size="xs" open={addCharacterPerksDialog}
            handleClose={closeAddCharacterPerksDialog} 
            handleConfirm={closeAddCharacterPerksDialog}  
            title="Add Character Perks" 
            content={<AddCharacterPerksForm perkTableColumns={perkTableColumns}
                               perksData={perksData}
                               changeSearchPerksInput={changeSearchPerksInput}
                               searchCharacterPerksInput={searchCharacterPerksInput}
                               clickCommon={clickCommon}
                               commonsData={commonsData}
                               loading={commonsLoading && perksLoading}
                                />}
          />
        
      <Grid container spacing={2}>
        <Grid item size={12}>
          <Grid container spacing={2} >
            <Grid item size={6}>
              <Button sx={{mr: 1}} onClick={(e) => openAddCharacterDialog()} variant="contained">{ 'Add Character' }</Button>
              <Button onClick={(e) => clickAddCharacterApi()} variant="contained">Add Character Api</Button>
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
