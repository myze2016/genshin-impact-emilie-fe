'use client'

import { Grid, Typography, Button, Box, Paper, TextField, InputAdornment } from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import CustomDialog from "@/components/dialog";
import { addArtifact, addArtifactApi, addArtifactPerk, getArtifactPerks, getArtifacts, getArtifactsUser, removeArtifactPerk } from "@/hooks/useArtifact";
import artifactTable from "./tables/artifactTable";
import characterTable from "./tables/characterTable";
import perkTable from "./tables/perkTable";
import AddArtifactForm from "./forms/AddArtifactForm";
import AddArtifactPerksForm from "./forms/AddArtifactPerksForm";
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
import { useUser } from "@/context/UserContext";
import { getCharacters } from "@/hooks/useCharacter";
import AddPartyPositionCharacter from "./forms/AddPartyPositionCharacter";
import { getCharactersArtifact } from "@/hooks/useCharacter";

export default function Artifacts() {
    const { user } = useUser()

  const [page, setPage] = useState(0)
  const [payload, setPayload] = useState({
    user_id: user?.id
  })
  const [refetch, setRefetch] = useState(false)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { data: artifacts, loading: loading, total: total } = getArtifactsUser(payload, refetch, search, page+1, rowsPerPage)
  const [addCharacterPositionDialog, setAddCharacterPositionDialog] = useState(false)

   const [charactersPage, setCharactersPage] = useState(0)
    const [charactersPayload, setCharactersPayload] = useState({
      id: ''
    })
    const [refetchCharacters, setRefetchCharacters] = useState(false)
    const [searchCharacters, setSearchCharacters] = useState('')
    const [searchCharactersInput, setSearchCharactersInput] = useState('')
    const [charactersRows, setCharactersRows] = useState(5)
    const { data: charactersData, loading: charactersLoading, total: charactersTotal } = getCharactersArtifact(charactersPayload, refetchCharacters, searchCharacters, charactersPage+1, charactersRows)

  const [perksPayload, setPerksPayload] = useState('')
  const [refetchPerks, setRefetchPerks] = useState(false)
  const [searchPerks, setSearchPerks] = useState('')
  const [searchPerksInput, setSearchPerksInput] = useState('')
  const [perksPage, setPerksPage] = useState(0)
  const [perksRowsPerPage, setPerksRowsPerPage] = useState(10)
  const { data: perks, loading: perksLoading, total: perksTotal } = getArtifactPerks(perksPayload, refetchPerks, searchPerks, perksPage+1, perksRowsPerPage)

  const [commonsPayload, setCommonsPayload] = useState('')
  const [refetchCommons, setRefetchCommons] = useState(false)
  const [searchCommons, setSearchCommons] = useState('')
  const { data: commons, loading: commonsLoading } = getCommons(commonsPayload, refetchCommons, searchCommons)



  const [ apiDialog, setApiDialog] = useState(false)
  const [artifactId, setArtifactId] = useState('')

  const [ addDialog, setAddDialog] = useState(false)
  const [ perkDialog, setPerkDialog] = useState(false)
  const [ perksDialog, setPerksDialog] = useState(false)
  const [ formData, setFormData] = useState({
    name: '',
    description: '',
  })

  const [apiLoading, setApiLoading ] = useState(false)
  const [perkFormData, setPerkFormData] = useState({
    name: '',
    description: '',
  })

  const changeFormData = (e, formData, setFormData) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
  }

  
  const handleAddArtifact = async (e) => {
    setApiLoading(true)
    let response = await addArtifact(formData)
     if (response?.data?.success) {
      resetFormData()
      setRefetch((prev) => !prev)
      setAddDialog(false)
    }
    setApiLoading(false)
  }

  const handleCloseArtifactDialog = (e) => {
    setRefetch((prev) => !prev)
    resetFormData()
    setAddDialog(false)
  }

  const handleOpenArtifactDialog = (e) => {
    setPerksDialog(true)
  }

  const resetFormData = () => {
    setFormData({
      name: '',
      element_id: ''
    })
}

  const handleCancelAddCharacterPositionDialog = (e) => {
    setAddCharacterPositionDialog(false)
  }


const handleSearch = (search) => {
  setSearchInput(search)
}

 
useEffect(() => {
  const timeout = setTimeout(() => {
    setSearch(searchInput)
  }, 300)

  return () => clearTimeout(timeout)
}, [searchInput])

  const handleOpenPerksDialog = (artifact) => {
    setArtifactId(artifact?.id)
    setCharactersPayload(prev => ({
      ...prev,
      id: artifact?.id, 
    }));
    setAddCharacterPositionDialog(true)
  }

  const handleClosePerksDialog = (e) => {
    setRefetch((prev) => !prev)
    resetSearchPerksInput()
    setPerksDialog(false)
  }

  const resetSearchPerksInput = () => {
      setSearchPerksInput('')
  }

  const handleFillCommon = (value) => {
    if (!searchPerksInput.includes(value)) {
      setSearchPerksInput((prev) => prev + (value + ' '))
    } else {
      setSearchPerksInput((prev) => prev.replace(value + ' ', ''))
    }
  }

  const handleSearchPerks = (search) => {
    setSearchPerksInput(search)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchPerks(searchPerksInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchPerksInput])

  const handleAddPerk = async (perk) => {
    const payload = {
      perk_id: perk?.id,
      artifact_id: artifactId
    };
    let response = await addArtifactPerk(payload)
    if (response?.data?.success) {
      setRefetchPerks((prev) => !prev)
    }
  }

  const handleRemovePerk = async (perk) => {
    const payload = {
      perk_id: perk?.id,
      artifact_id: artifactId
    };
    let response = await removeArtifactPerk(payload)
    if (response?.data?.success) {
      setRefetchPerks((prev) => !prev)
    }
  }


  const handleAddArtifactApi = async (item) => {
    setApiDialog(false)
    let response = await addArtifactApi()
    setRefetch((prev) => !prev)
  }

 
  const handleChangePage = (e, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleChangePerksPage = (e, page) => {
    setPerksPage(page);
  };

  const handleChangePerksRowsPerPage = (e) => {
    setPerksRows(parseInt(e.target.value, 10));
    setPerksPage(0);
  };

  const handleClosePerkDialog = (e) => {
    setPerkDialog(false)
    resetPerkFormData()
  }

   const resetPerkFormData = () => {
    setPerkFormData({
      name: '',
      description: '',
    })
  }

  const handleConfirmAddPerk = async (e) => {
    setApiLoading(true)
    let response = await addPerk(perkFormData)
    if (response?.data?.success) {
      setPerkFormData({
        name: '',
        description: '',
      })
      setRefetchPerks((prev) => !prev)
      setPerkDialog(false)
    }
    setApiLoading(false)
  }
  
   const handleSearchCharactersInput = (search) => {
      setSearchCharactersInput(search)
    }
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacters(searchCharactersInput)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchCharactersInput])

    const handleViewParty = async (party) => {
     
    }

      const handleClickCommon = (value) => {
    if (!searchCharactersInput.includes(value)) {
      setSearchCharactersInput((prev) => prev + (value + ' '))
    } else {
      setSearchCharactersInpu((prev) => prev.replace(value + ' ', ''))
    }
  }

      const handleCharactersChangePage = (e, page) => {
    setCharactersPage(page);
  };

  const handleCharactersRowsPerPage = (e) => {
    setCharactersRows(parseInt(e.target.value, 10));
    setCharactersPage(0);
  };
  
  const { columns: charactersColumns  } = artifactTable({handleOpenPerksDialog})
  const { columns: perksTableColumns } = perkTable({handleAddPerk, handleRemovePerk})
    const { columns } = characterTable({handleViewParty})


  return (
    <>
      { apiLoading && <Spinner /> }
      <CustomDialog open={perkDialog}
        handleClose={handleClosePerkDialog} 
        handleConfirm={handleConfirmAddPerk}  
        title="Add Perk" 
        size="md"
        content={<AddPerkForm perkFormData={perkFormData} 
                          setPerkFormData={setPerkFormData}
                          changeFormData={changeFormData}
                          commons={commons} />} />
      <CustomConfirmDialog size="xs" open={apiDialog}
              handleClose={(e) => setApiDialog(false)} 
              handleConfirm={(e) => handleAddArtifactApi()}  
              title="Add Character Api" 
              message="Are you sure you want to retrieve artifacts from Api?"
            />
      <CustomDialog size="sm" open={addDialog}
              handleClose={handleCloseArtifactDialog} 
              handleConfirm={handleAddArtifact}  
              title="Add Artifact" 
              content={<AddArtifactForm formData={formData} 
                                 setFormData={setFormData}
                                 changeFormData={changeFormData} />}
            />
     <CustomTableDialog size="md" open={perksDialog}
            handleClose={handleClosePerksDialog} 
            handleConfirm={handleClosePerksDialog}  
            title="Add Artifact Perks" 
            page={page} 
            handleChangePage={handleChangePage} 
            rowsPerPage={rowsPerPage} 
            handleChangeRowsPerPage={handleChangeRowsPerPage} 
            total={total}
            content={<AddArtifactPerksForm tableColumns={perksTableColumns}
                               data={perks}
                               handleSearch={handleSearchPerks}
                               searchInput={searchPerksInput}
                               handleClickChip={handleFillCommon}
                               chipData={commons}
                               loading={false}
                               page={perksPage} 
                               handleChangePage={handleChangePerksPage} 
                               rowsPerPage={perksRowsPerPage}
                                handleChangeRowsPerPage={handleChangePerksRowsPerPage} 
                                total={perksTotal}
                                />}
          />

          <CustomTableDialog open={addCharacterPositionDialog}
      size="md"
      handleClose={handleCancelAddCharacterPositionDialog} 
      handleConfirm={handleCancelAddCharacterPositionDialog}  
      title="Add Party Position Character" 
      content={<AddPartyPositionCharacter columns={columns}
                          charactersData={charactersData}
                          handleSearchCharactersInput={handleSearchCharactersInput}
                          searchCharactersInput={searchCharactersInput}
                          handleClickCommon={handleClickCommon}
                          commonsData={commons}
                          page={charactersPage} 
                          handleChangePage={handleCharactersChangePage} 
                          rowsPerPage={charactersRows}
                          handleChangeRowsPerPage={handleCharactersRowsPerPage} 
                          total={charactersTotal}
                          loading={charactersLoading}
                          />}    />
        
      <Grid container spacing={2}>
        <Grid item size={12}>
          <Grid container spacing={2} >
            <Grid item size={8}>
          
            </Grid>
             <Grid item size={4} >
               <Grid container  justifyContent="flex-end" spacing={2} >
                <CustomSearch  search={searchInput}
                  handleSearch={handleSearch}
                  fullWidth={false}>
                </CustomSearch>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item size={12}>
           <CustomTableV2 minWidth="650" headers={charactersColumns} data={artifacts} page={page} handleChangePage={handleChangePage} rowsPerPage={rowsPerPage} handleChangeRowsPerPage={handleChangeRowsPerPage} total={total} loading={loading} />
        </Grid>
      </Grid>
      
    </>
  );
}
