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

export default function Characters() {

  const [charactersPage, setCharactersPage] = useState(0)
  const [charactersPayload, setCharactersPayload] = useState('')
  const [refetchCharacters, setRefetchCharacters] = useState(false)
  const [searchCharacters, setSearchCharacters] = useState('')
  const [searchCharactersInput, setSearchCharactersInput] = useState('')
  const [charactersRows, setCharacterRows] = useState(10)
  const { data: charactersData, loading: charactersLoading, total: charactersTotal } = getCharactersName(charactersPayload, refetchCharacters, searchCharacters, charactersPage+1, charactersRows)
  
  const [ elementsPayload, setElementsPayload] = useState('')
  const [ refetchElements, setRefetchElements] = useState(false)
  const { data: elementsData, loading: elementsLoading } = getElements(elementsPayload, refetchElements)

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

  const [ apiDialog, setApiDialog] = useState(false)
  const [ addPerkDialog, setAddPerkDialog] = useState(false)
  const [ perkFormData, setPerkFormData] = useState({
    name: '',
    description: '',
  })

  const [characterId, setCharacterId] = useState(0)

  const [ apiLoading, setApiLoading ] = useState(false)
  const [addCharacterPerksDialog, setAddCharacterPerksDialog] = useState(false)
  const [ characterDialog, setCharacterDialog] = useState(false);

  const [characterPerkFormData, setCharacterPerkFormData] = useState({
    character_id: '',
    perk_id: ''
  })

  const [characterFormData, setCharacterFormData] = useState({
    name: '',
    element_id: ''
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
      setCharacterDialog(false)
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
    setRefetchCharacters((prev) => !prev)
    resetSearchPerksInput()
    setAddCharacterPerksDialog(false)
  }

  const resetSearchPerksInput = () => {
      setSearchPerksInput('')
  }

  const handleCloseCharacterDialog = (e) => {
    setRefetchCharacters((prev) => !prev)
    resetCharacterFormData()
    setCharacterDialog(false)
  }

  
  const openAddCharacterDialog = (e) => {
    setCharacterDialog(true)
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


  const handleAddCharacterApi = async (item) => {
    setApiDialog(false)
    let response = await addCharacterApi()
    setRefetchCharacters((prev) => !prev)
    
  }

  
  const resetCharacterFormData = () => {
      setCharacterFormData({
        name: '',
        element_id: ''
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

  const handleCloseAddPerkDialog = (e) => {
    setAddPerkDialog(false)
    resetPerkFormData()
  }

   const resetPerkFormData = () => {
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
      setRefetchCharacterPerks((prev) => !prev)
      setAddPerkDialog(false)
    }
    setApiLoading(false)
  }
  


  
  const { columns: characterColumns  } = characterTable({openAddCharacterPerksDialog})
  const { columns: perkTableColumns } = perkTable({clickAddCharacterPerk, clickRemoveCharacterPerk})

  return (
    <>
      { apiLoading && <Spinner /> }
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
                                 options={elementsData} />}
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
                               loading={commonsLoading || perksLoading}
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
            <Grid item size={8}>
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
