'use client'

import { Grid, Typography, Button, Box, Chip, Stack, Paper, Table, TableRow, TableCell, TableBody, IconButton, Collapse } from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import { editPartyPosition, getParty, addPartyPosition, addPartyPositionCharacter, removePartyPositionCharacter, editParty, moveVerticalCharacter, removePosition, addMyParty, deleteParty, addPartyArtifact, addPartyWeapon, removePartyWeapon, removePartyArtifact } from "../../hooks/useParty";
import AddPartyPosition from "./form/AddPartyPosition";
import AddPartyPositionCharacter from "./form/AddPartyPositionCharacter";
import CustomDialog from "@/components/dialog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getCharacters } from "@/hooks/useCharacter";
import characterTable from "./table/characterTable";
import { useParams, useRouter } from "next/navigation";
import CustomTableDialog from "@/components/dialog/table";
import { getCommons } from "@/hooks/useCommon";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import EditPartyForm from "./form/EditPartyForm";
import { getElements } from "@/hooks/useElements";
import Spinner from "@/components/Spinner";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CustomConfirmDialog from "@/components/dialog/confirm";
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import CompostOutlinedIcon from '@mui/icons-material/CompostOutlined';
import AddArtifacts from "./form/AddArtifacts";
import weaponTable from "./table/weaponTable";
import artifactTable from "./table/artifactTable";
import { getArtifactByParty, addPiece } from "@/hooks/useArtifact";
import { getWeaponByParty } from "@/hooks/useWeapon";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useUser } from "@/context/UserContext";
import EditPositionForm from "./form/EditPositionForm";
import AddStatForm from "./form/AddStatForm";
import { getStats, addStatLine } from "@/hooks/useStat";
import AddArtifactPieceForm from "./form/AddArtifactPieceForm";
import AddWeapons from "./form/AddWeapons";
import { useElementContext } from "@/context/ElementContext";
import { useCommonContext } from "@/context/CommonContext";
import { useStatContext } from "@/context/StatContext";
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';


export default function Party() {
  const { user, partyContextId, setPartyContextId, characterSearchContext, setCharacterSearchContext } = useUser()
  const router = useRouter()
  const params = useParams();
  const party_id = partyContextId;
  const [stealth, setStealth] = useState('')
  const [apiDialog, setApiDialog] = useState(false)
  const [openRows, setOpenRows] = useState({});

  const [refetchParty, setRefetchParty] = useState(false)
  const [partyPayload, setPartyPayload] = useState({
    id: party_id,
  })
   useEffect(() => {
      const isStealth = localStorage.getItem('stealth') === 'true';
      setStealth(isStealth);
      
    }, []);

   const [ perksPayload, setPerksPayload ] = useState('')
    const [ refetchPerks, setRefetchPerks ] = useState(false)
    const [ searchPerks, setSearchPerks ] = useState('')
    const [ perksRows, setPerksRows ] = useState(1000)
    const [ perksPage, setPerksPage ] = useState(0)
    // const { data: perks, loading: perksLoading, total: perksTotal } = getStats(perksPayload, refetchPerks, searchPerks, perksPage+1, perksRows)
      const { data: perks, loading: perksLoading } = useStatContext()

  const [confirmDeletePartyDialog,setConfirmDeletePartyDialog] = useState(false)
  const { data: partyData, loading: partyLoading } = getParty(partyPayload, refetchParty)
  
  const [ apiLoading, setApiLoading] = useState(false)
  const [ editPartyDialog, setEditPartyDialog] = useState(false)
  const [ editPositionDialog, setEditPositionDialog] = useState(false)

  const [ elementsPayload, setElementsPayload] = useState('')
  const [ refetchElements, setRefetchElements] = useState(false)
  // const { data: elementsData, loading: elementsLoading } = getElements(elementsPayload, refetchElements)
    const { data: elementsData, loading: elementsLoading } = useElementContext()
   
  const [charactersPage, setCharactersPage] = useState(0)
  const [charactersPayload, setCharactersPayload] = useState('')
  const [refetchCharacters, setRefetchCharacters] = useState(false)
  const [searchCharacters, setSearchCharacters] = useState('')
  const [searchCharactersInput, setSearchCharactersInput] = useState('')
  const [charactersRows, setCharactersRows] = useState(5)
    const [addPositionDialog, setAddPositionDialog] = useState(false)
  const { data: charactersData, loading: charactersLoading, total: charactersTotal } = getCharacters(addPositionDialog, charactersPayload, refetchCharacters, searchCharacters, charactersPage+1, charactersRows)


  const [commonsPayload, setCommonsPayload] = useState('')
  const [refetchCommons, setRefetchCommons] = useState(false)
  const [searchCommons, setSearchCommons] = useState('')
  // const { data: commonsData, loading: commonsLoading } = getCommons(commonsPayload, refetchCommons, searchCommons)
  const { data: commonsData, loading: commonsLoading } = useCommonContext()

  const [artifactsDialog, setArtifactsDialog] = useState(false)
  const [artifactPage, setArtifactPage] = useState(0)
  const [artifactPayload, setArtifactPayload] = useState('')
  const [artifactRefetch, setArtifactRefech] = useState(false)
  const [artifactSearch, setArtifactSearch] = useState('')
  const [artifactSearchInput, setArtifactSearchInput] = useState('')
  const [artifactRowsPerPage, setArtifactRowsPerPage] = useState(10)
  const { data: artifacts, loading: artifactsLoading, total: artifactsTotal } = getArtifactByParty(artifactPayload, artifactRefetch, artifactSearch, artifactPage+1, artifactRowsPerPage)

  const [weaponsDialog, setWeaponsDialog] = useState(false)
  const [weaponsPage, setWeaponsPage] = useState(0)
  const [weaponsPayload, setWeaponsPayload] = useState('')
  const [weaponsRefetch, setWeaponsRefetch] = useState(false)
  const [weaponsSearch, setWeaponsSearch] = useState('')
  const [weaponsSearchInput, setWeaponsSearchInput] = useState('')
  const [weaponsRowsPerPage, setWeaponsRowsPerPage] = useState(10)
  const { data: weapons, loading: weaponsLoading, total: weaponsTotal } = getWeaponByParty(weaponsPayload, weaponsRefetch, weaponsSearch, weaponsPage+1, weaponsRowsPerPage)


  const [addCharacterPositionDialog, setAddCharacterPositionDialog] = useState(false)

  const [weaponTypeId, setWeaponTypeId] = useState('');
  const [partyCharacterId, setPartyCharacterId] = useState('');
    const [partyArtifactId, setPartyArtifactId] = useState('');
  const [partyId, setPartyId] = useState('')
  const [positionId, setPositionId] = useState('')
  const [partyFormData, setPartyFormData] = useState({
    name: '',
    element_id: '',
    reaction: '',
  })

    const [openRowsArtifact, setOpenRowsArtifact] = useState({});
   const toggleRowArtifact = (rowIndex) => {
        setOpenRowsArtifact((prev) => ({
            ...prev,
            [rowIndex]: !prev[rowIndex], // toggle true/false
        }));
        };


  const [statDialog, setStatDialog] = useState(false)
    const [pieceDialog, setPieceDialog] = useState(false)

  const [statFormData, setStatFormData] = useState({
            sands: '',
            goblet: '',
            circlet: '',
            substat: []
          })

  const [pieceFormData, setPieceFormData] = useState({
        type: 'sands',
        stat_id: '',
      })


  const [positionFormData, setPositionFormData] = useState({
    name: '',
    description: '',
    party_id: '',
  })
  const [characterPositionFormData, setCharacterPoisitionFormData] = useState({
    name: '',
    description: '',
    element: '',
    value: 100,
    party_position_id: '',
  })


   const handleSearchCharactersInput = (search) => {
      setSearchCharactersInput(search)
    }
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacters(searchCharactersInput)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchCharactersInput])


    const handleSearchArtifacts = (search) => {
      setArtifactSearchInput(search)
    }
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setArtifactSearch(artifactSearchInput)
    }, 300)
    return () => clearTimeout(timeout)
  }, [artifactSearchInput])

    const handleSearchWeapons = (search) => {
      setWeaponsSearchInput(search)
    }
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setWeaponsSearch(weaponsSearchInput)
    }, 300)
    return () => clearTimeout(timeout)
  }, [weaponsSearchInput])

   const changeFormData = (e, formData, setFormData) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
  }

  const handleCancelAddPosition = (e) => {
    setAddPositionDialog(false)
  }

  const handleOpenAddPosition = (e) => {
    setAddPositionDialog(true)
  }

  const handleClickCommon = (value) => {
    if (!searchCharactersInput.includes(value)) {
      setSearchCharactersInput((prev) => prev + (value + ' '))
    } else {
      setSearchCharactersInpu((prev) => prev.replace(value + ' ', ''))
    }
  }
  
  const handleCancelAddCharacterPositionDialog = (e) => {
    setAddCharacterPositionDialog(false)
  }

  const handleCloseAddCharacterPositionDialog = (e) => {
    setAddCharacterPositionDialog(false)
  }


  const handleConfirmAddCharacterPositionDialog = async (e) => {
    const updatedForm = {
      ...characterPositionFormData,
      party_position_id: positionId,
    };
    let response = await addPartyPositionCharacter(updatedForm)
     if (response?.data?.success) {
      setRefetchParty((prev) => !prev)
      setAddCharacterPositionDialog(false)
    }
  }

  const handleConfirmAddPositionDialog = async (e) => {
    const updatedForm = {
      ...positionFormData,
      party_id: partyId,
    };
    let response = await addPartyPosition(updatedForm)
    if (response?.data?.success) {
      setPositionFormData({
        name: '',
        description: '',
        party_id: '',
      })
      setRefetchParty((prev) => !prev)
      setAddPositionDialog(false)
    }
  }

  const handleConfirmEditPositionDialog = async (e) => {
    let response = await editPartyPosition(positionFormData, positionId)
    if (response?.data?.success) {
      setPositionFormData({
        name: '',
        description: '',
        party_id: '',
      })
      setRefetchParty((prev) => !prev)
      setEditPositionDialog(false)
    }
  }

   const confirmEditPartyDialog = async (e) => {
      setApiLoading(true)
      let response = await editParty(partyFormData)
      if (response?.data?.success) {  
        setRefetchParty((prev) => !prev)
        setEditPartyDialog(false)
      }
      setApiLoading(false)
    }

  const handleOpenAddPositionDialog = (party) => {
    setAddPositionDialog(true)
    setPartyId(party.id)
  }
  const handleOpenAddCharacterPositionDialog = (position) => {
    setAddCharacterPositionDialog(true)
    setPositionId(position.id)
  }

   const handleOpenPerksDialog = (position) => {
    
  }


  const handleClickAddCharacterPosition = async (character) => {
    const payload = {
        character_id: character?.id,
        party_position_id: positionId
    };
    
    let response = await addPartyPositionCharacter(payload)

    if (response?.data?.success) {
      setCharacterPoisitionFormData({
        name: '',
        description: '',
        element: '',
        value: 100,
        party_position_id: '',
      })
      setRefetchParty((prev) => !prev)
      setAddCharacterPositionDialog(false)
    }
  }


  const handleMoveVertical = async (character_position) => {
     setApiLoading(true)
    const payload = {
        id: character_position?.id,
    };
    
    let response = await moveVerticalCharacter(payload)

    if (response?.data?.success) {
      setRefetchParty((prev) => !prev)
    }
     setApiLoading(false)
  }


    const handleCharactersChangePage = (e, page) => {
    setCharactersPage(page);
  };

  const handleCharactersRowsPerPage = (e) => {
    setCharactersRows(parseInt(e.target.value, 10));
    setCharactersPage(0);
  };


  const handleArtifactsPage = (e, page) => {
    setArtifactPage(page);
  };

  const handleArtifactsRowPerPage = (e) => {
    setArtifactRowsPerPage(parseInt(e.target.value, 10));
    setArtifactPage(0);
  };

    const handleWeaponsPage = (e, page) => {
    setWeaponsPage(page);
  };

  const handleWeaponsRowPerPage = (e) => {
    setWeaponsRowsPerPage(parseInt(e.target.value, 10));
    setWeaponsPage(0);
  };



  const handleRemoveCharacter = async (character) => {
      setApiLoading(true)
      const payload = {
        id: character?.id,
      };
      let response = await removePartyPositionCharacter(payload)
      if (response?.data?.success) {
        setRefetchParty((prev) => !prev)
      }
      setApiLoading(false)
    }


    
  const handleRemovePosition = async (position) => {
      setApiLoading(true)
      const payload = {
        id: position?.id,
      };
      let response = await removePosition(payload)
      if (response?.data?.success) {
        setRefetchParty((prev) => !prev)
      }
      setApiLoading(false)
    }

    
      const handleAddPartyMyParty = async (item) => {
        setApiDialog(false)
        const payload = {
            id: party_id,
        };
        
        let response = await addMyParty(payload)
    
      }


        
      const handleDeleteParty = async (item) => {
        setConfirmDeletePartyDialog(false)
        const payload = {
            id: party_id,
        };
        let response = await deleteParty(payload)
          if (response?.data?.success) {
            if (partyData[0]?.copied_from) {
             router.push('/my-party') // ✅ Redirect to /login
            } else {
             router.push('/dashboard') // ✅ Redirect to /login
            }
      }
    
      }



    useEffect(() => {
      setPartyFormData({
        id: partyData[0]?.id,
        name: partyData[0]?.name,
        element_id: partyData[0]?.element_id,
        reaction: partyData[0]?.reaction,
        description: partyData[0]?.description,
      })
    }, [partyData])



       const handleAddWeapon = async (weapon) => {
        const payload = {
          weapon_id: weapon?.id,
          party_character_id: partyCharacterId
        };
        let response = await addPartyWeapon(payload)
        if (response?.data?.success) {
          setRefetchParty((prev) => !prev)
          setWeaponsRefetch((prev) => !prev)
        }
      }
    
    
      const handleRemoveWeapon = async (weapon) => {
        const payload = {
          weapon_id: weapon?.id,
          party_character_id: partyCharacterId
        };
        let response = await removePartyWeapon(payload)
        if (response?.data?.success) {
          setRefetchParty((prev) => !prev)
          setWeaponsRefetch((prev) => !prev)
        }
      }
    
       const handleAddArtifact = async (artifact) => {
        const payload = {
          artifact_id: artifact?.id,
          party_character_id: partyCharacterId
        };
        let response = await addPartyArtifact(payload)
        if (response?.data?.success) {
          setArtifactRefech((prev) => !prev)
          setRefetchParty((prev) => !prev)
        }
      }
    
    
      const handleRemoveArtifact = async (artifact) => {
        const payload = {
          artifact_id: artifact?.id,
          party_character_id: partyCharacterId
        };
        let response = await removePartyArtifact(payload)
        if (response?.data?.success) {
          setArtifactRefech((prev) => !prev)
           setRefetchParty((prev) => !prev)
        }
      }


      const handleOpenEditPositionDialog = (position) => {
        setPositionFormData({
          name: position?.name ?? '',
          description: position?.description ?? '',
          party_id: position?.party_id,
        })
        setPositionId(position?.id)
        setEditPositionDialog(true)
      }
    
    

      const toggleRow = (positionId, rowIndex) => {
        setOpenRows((prev) => {
          const current = prev[positionId] || [];
          const isOpen = current.includes(rowIndex);
      
          return {
            ...prev,
            [positionId]: isOpen
              ? current.filter((i) => i !== rowIndex) // close it
              : [...current, rowIndex],              // open it
          };
        });
      };

    const handleOpenStat = async (party_artifact) => {
      console.log('party_artifact', party_artifact.party_artifact[0].id)
      setPartyArtifactId(party_artifact.party_artifact[0].id)
      setStatDialog(true)
    }

    const handleConfirmStatDialog = async () => {
           

      const updatedForm = {
        ...statFormData,
        party_artifact_id: partyArtifactId,
      };
      let response = await addStatLine(updatedForm)
      if (response?.data?.success) {
          setStatFormData({
            sands: '',
            goblet: '',
            circlet: '',
            substat: []
          })
        setArtifactRefech((prev) => !prev)
        setStatDialog(false)      
      }

    }

    const handleConfirmPieceDialog = async () => {
      const updatedForm = {
        ...pieceFormData,
        party_artifact_id: partyArtifactId,
      };
      let response = await addPiece(updatedForm)
      if (response?.data?.success) {
        setStatFormData({
          type: 'sands',
          stat_id: '',
        })
        setArtifactRefech((prev) => !prev)
        setPieceDialog(false)      
      }

    }
    
    const handleOpenPiece = async (party_artifact) => {
      console.log('party_artifact', party_artifact.party_artifact[0].id)
      setPartyArtifactId(party_artifact.party_artifact[0].id)
      setPieceDialog(true)
    }

    const handleRedirectCharacters = (characterName) => {
      setCharacterSearchContext(characterName)
      router.push(`/characters`)
    }

     
  const { columns } = characterTable({handleClickAddCharacterPosition})
  const { columns: artifactColumns, collapses } = artifactTable({handleAddArtifact, handleRemoveArtifact, handleOpenStat, openRowsArtifact, toggleRowArtifact, handleOpenPiece})
  const { columns: weaponColumns } = weaponTable({handleAddWeapon, handleRemoveWeapon})

  return (
    <>
        { apiLoading && <Spinner /> }
          <CustomConfirmDialog size="xs" open={apiDialog}
              handleClose={(e) => setApiDialog(false)} 
              handleConfirm={(e) => handleAddPartyMyParty()}  
              title="Add Party to My Party" 
              message="Are you sure you want to add party to your parties?"
            />
             <CustomConfirmDialog size="xs" open={confirmDeletePartyDialog}
              handleClose={(e) => setConfirmDeletePartyDialog(false)} 
              handleConfirm={(e) => handleDeleteParty()}  
              title="Delete Party" 
              message="Are you sure you want to delete party?"
            />
        <CustomDialog open={editPartyDialog}
              size="sm"
              handleClose={() => setEditPartyDialog(false)} 
              handleConfirm={confirmEditPartyDialog}  
              title="Edit Party" 
              content={<EditPartyForm partyFormData={partyFormData} 
                                 setPartyFormData={setPartyFormData}
                                 changeFormData={changeFormData}
                                 options={elementsData} />} />
        <CustomDialog open={statDialog}
              size="sm"
              handleClose={() => setStatDialog(false)} 
              handleConfirm={handleConfirmStatDialog}  
              title="Add Stat" 
              content={<AddStatForm formData={statFormData} 
                                 setFormData={setStatFormData}
                                 changeFormData={changeFormData}
                                 options={perks} />} />
        <CustomDialog open={pieceDialog}
              size="sm"
              handleClose={() => setPieceDialog(false)} 
              handleConfirm={handleConfirmPieceDialog}  
              title="Add Artifact Piece" 
              content={<AddArtifactPieceForm formData={pieceFormData} 
                                 setFormData={setPieceFormData}
                                 changeFormData={changeFormData}
                                 options={perks} />} />
       <CustomDialog open={addPositionDialog}
              handleClose={handleCancelAddPosition} 
              handleConfirm={handleConfirmAddPositionDialog}  
              title="Add Party Position" 
              size="sm"
              content={<AddPartyPosition positionFormData={positionFormData} 
                                 setPositionFormData={setPositionFormData}
                                 changeFormData={changeFormData}
                                  />}
            />
        <CustomDialog open={editPositionDialog}
              handleClose={(e) => setEditPositionDialog(false)} 
              handleConfirm={handleConfirmEditPositionDialog}  
              title="Edit Position" 
              size="sm"
              content={<EditPositionForm positionFormData={positionFormData} 
                                 setPositionFormData={setPositionFormData}
                                 changeFormData={changeFormData}
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
                                  commonsData={commonsData}
                                  page={charactersPage} 
                                  handleChangePage={handleCharactersChangePage} 
                                  rowsPerPage={charactersRows}
                                  handleChangeRowsPerPage={handleCharactersRowsPerPage} 
                                  total={charactersTotal}
                                  loading={charactersLoading}
                                  />}
            />
            <CustomTableDialog open={artifactsDialog}
              size="md"
              handleClose={(e)=>setArtifactsDialog(false)} 
              handleConfirm={(e)=>setArtifactsDialog(false)}  
              title="Add Artifacts" 
              content={<AddArtifacts collapses={collapses} columns={artifactColumns}
                                  data={artifacts}
                                  handleSearch={handleSearchArtifacts}
                                  searchInput={artifactSearchInput}
                                  handleChip={handleClickCommon}
                                  chipData={commonsData}
                                  page={artifactPage} 
                                  handleChangePage={handleArtifactsPage} 
                                  rowsPerPage={artifactRowsPerPage}
                                  handleChangeRowsPerPage={handleArtifactsRowPerPage} 
                                  total={artifactsTotal}
                                  loading={artifactsLoading}
                                  />}
            />
              <CustomTableDialog open={weaponsDialog}
              size="md"
              handleClose={(e)=>setWeaponsDialog(false)} 
              handleConfirm={(e)=>setWeaponsDialog(false)}  
              title="Add Weapons" 
              content={<AddWeapons columns={weaponColumns}
                                  data={weapons}
                                  handleSearch={handleSearchWeapons}
                                  searchInput={weaponsSearchInput}
                                  handleChip={handleClickCommon}
                                  chipData={commonsData}
                                  page={weaponsPage} 
                                  handleChangePage={handleWeaponsPage} 
                                  rowsPerPage={weaponsRowsPerPage}
                                  handleChangeRowsPerPage={handleWeaponsRowPerPage} 
                                  total={weaponsTotal}
                                  loading={weaponsLoading}
                                  />}
            />
      <Grid container spacing={2}>
        {
          partyData && partyData?.map((party, index) => (
            <Fragment key={index}>
              <Grid item size={12}>
                 <Button  color='secondary' startIcon={<ReplyOutlinedIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} onClick={(e) => router.back()} variant="contained">Back</Button>
              </Grid>
              <Grid item size={12}>
                <Grid container spacing={2}>
                  <Grid item size={{xs: 12, md: 8, lg: 8}}>
                    <Paper sx={{ padding: 2, height: '100%', backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${ stealth ? 'https://genshin.jmp.blue/characters/tighnari/gacha-splash.png' : party?.character?.namecard_background_url})`,
                      backgroundSize: 'cover', // or 'contain' depending on your layout
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right' }}>
                      <Grid container>
                        <Grid item size={12} sx={{mb: 1}}>
                           <Grid container spacing={2}>
                                <Grid item size={{xs: 12, md: 6, lg: 6}}>
                                    <Typography gutterBottom variant="h6" component="div">
                                      <Box component="span" color="secondary.main">
                                        {party?.copied_from?.name && party?.copied_from?.name }
                                      </Box>
                                      <Box component="span" color="text.primary">
                                      {party?.copied_from?.name &&  ' | ' }
                                        {party?.name}
                                      </Box>
                                    </Typography>
                                </Grid>
                                <Grid item size={{xs: 12, md: 6, lg: 6}} sx={{display: 'flex', justifyContent:  {
                                      xs: 'flex-start', // applies when xs (mobile)
                                      md: 'flex-end'    // applies from md and up
                                    }}}>
                                  <Box>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      size="small"
                                      onClick={() => setConfirmDeletePartyDialog(true)}
                                      sx={{ mr: 1, mb: 1, minWidth: '36px', padding: '6px' }} // Make button compact
                                    >
                                      <DeleteOutlineIcon fontSize="small" />
                                    </Button>

                                    <Button
                                      variant="contained"
                                      color="info"
                                      size="small"
                                      onClick={() => setEditPartyDialog(true)}
                                      sx={{ mr: 1, mb: 1, minWidth: '36px', padding: '6px' }}
                                    >
                                      <ModeEditOutlineOutlinedIcon fontSize="small" />
                                    </Button>
                                    <Button startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                        sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mb: 1}} onClick={(e) => handleOpenAddPositionDialog(party)} color="primary" variant="contained" size="small"> Add Position</Button>
                                          <Button hidden={party?.copied_from} startIcon={<FileUploadOutlinedIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                        sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mb: 1}} onClick={(e) => setApiDialog(true)} color="primary" variant="contained" size="small">Add My Party</Button>    
                                    </Box>
                                </Grid>
                           </Grid>
                        </Grid>
                        <hr style={{ width: '100%' }} />
                        <Grid item size={12} >
                          <Typography variant="subtitle1">{party?.element?.name}&nbsp;&nbsp;•&nbsp;&nbsp;{party?.reaction}</Typography>
                        </Grid>
                        <Grid item size={12} sx={{mt: 1}}>
                          <Typography>{party?.description}</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item size={{xs: 12, md: 4, lg: 4}}>
                    <Paper >
                      <Table>
                        <TableBody>
                          {party?.positions?.map((position, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Typography>{position?.name}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{position?.description}</Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Grid> 
              </Grid>
              
              <Grid item size={12}>
                <Grid container spacing={2}>
                  {
                    party && party?.positions?.map((position, index) => (
                      <Grid key={index} item size={{xs: 12, md: 6, lg: 6}}>
                        <Paper elevation={3} >
                          <Grid container spacing={0}>
                            <Grid item size={{xs: 12, md: 12, lg: 12}} >
                              <Grid container spacing={2} sx={{px: 2, py: 1}}>
                                <Grid item size={{xs: 12, md: 6, lg: 6}} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                    <Typography sx={{fontWeight: 100 }}>{position?.name}</Typography>&nbsp;&nbsp;•&nbsp;&nbsp;<Typography sx={{ fontWeight: 100 }}>{position?.description}</Typography>
                                </Grid>
                                <Grid item size={{xs: 12, md: 6, lg: 6}} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                  <IconButton
                                    color="info"
                                    onClick={() => handleOpenEditPositionDialog(position)}
                                    aria-label="Edit Position"
                                  >
                                    <ModeEditOutlineOutlinedIcon />
                                  </IconButton>
                                  <IconButton
                                    color="primary"
                                    onClick={() => handleOpenAddCharacterPositionDialog(position)}
                                    aria-label="add character to position"
                                  >
                                    <AddCircleOutlineIcon />
                                  </IconButton>
                                  <IconButton
                                      color="error"
                                      onClick={(e) => {
                                        handleRemovePosition(position);
                                      }}
                                    >
                                  <DeleteOutlineIcon sx={{ fontSize: '24px' }} />
                                </IconButton>
                            </Grid>
                              </Grid>
                            
                            </Grid>
                            
                            <hr style={{ width: '100%' }} />
                             <Grid key={index} item size={12}>
                                <Table>
                                <TableBody>
                                  { position && position?.characters_value?.map((character, index) => (
                                    <Fragment key={index}>
                                    <TableRow>
                                       <TableCell sx={{pr: 0, width: '40px'}}>
                                       <IconButton onClick={() => toggleRow(position?.id, index)}>
  {openRows[position?.id]?.includes(index) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
</IconButton>
                                    </TableCell>
                                      <TableCell sx={{pl: 0}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                        
                                        <IconButton color='info' onClick={() => handleRedirectCharacters(character?.character?.name)}>
                                          <ReplyAllOutlinedIcon sx={{ fontSize: '16px'}}/>
                                        </IconButton>
                                        <Typography>{character?.character?.name}</Typography>
                                        </Box>
                                      </TableCell>
                                     
                                      
                                      <TableCell>
                                        <Typography>{character?.party_weapon[0]?.weapon?.name}</Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography>{character?.party_artifact[0]?.artifact?.name}</Typography>
                                      </TableCell>
                                      <TableCell>
                                            <Box display="flex" justifyContent="flex-end" alignItems="center" flexWrap="wrap" gap={1}>
                                              <IconButton
                                                color="warning"
                                                onClick={(e) => {
                                                  setPartyCharacterId(character?.id)
                                                  setWeaponsPayload({
                                                    character_id: character?.character?.id,
                                                    weapon_type_id: character?.character?.weapon_type_id,
                                                    party_character_id: character?.id
                                                  })
                                                  setWeaponsDialog(true);
                                                }}
                                              >
                                                <ConstructionOutlinedIcon sx={{ fontSize: '24px' }} />
                                            </IconButton>
                                            <IconButton
                                                color="primary"
                                                onClick={(e) => {
                                                  setPartyCharacterId(character?.id)
                                                  setArtifactPayload({
                                                    character_id: character?.character?.id,
                                                    party_character_id: character?.id
                                                  })
                                                  setArtifactsDialog(true);
                                                }}
                                              >
                                                <CompostOutlinedIcon sx={{ fontSize: '24px' }} />
                                            </IconButton>
                                             <IconButton
                                                color="info"
                                                onClick={(e) => {
                                                  handleMoveVertical(character);
                                                }}
                                              >
                                                <SwapVerticalCircleIcon sx={{ fontSize: '24px' }} />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={(e) => {
                                                  handleRemoveCharacter(character);
                                                }}
                                              >
                                                <DeleteOutlineIcon sx={{ fontSize: '24px' }} />
                                            </IconButton>
                                          </Box>
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{padding: 0}}>
                                        <Collapse in={openRows[position?.id]?.includes(index)}>
                                                <Box
                                              sx={{
                                                p: 2,  
                                              }}
                                            >
                                                <Typography>Perks</Typography>
                                                </Box>
                                                </Collapse>
                                        </TableCell>
                                        <TableCell colSpan={4} sx={{padding: 0}}>
                                        <Collapse in={openRows[position?.id]?.includes(index)}>
  <Box
    sx={{
      maxHeight: 87,              // Limit visible height (2 Chip rows)
      overflowY: 'auto',
       display: 'flex',
       flexWrap: 'wrap',  
       alignContent: 'flex-start',
      p: 1,  
    }}
  >
                                         {character?.party_weapon?.map((weapon, index) => (
                                        weapon.weapon?.perks?.map((perk, index) => (
                                          <Chip
                                          icon={<ConstructionOutlinedIcon/>}
                                          key={index}
                                          label={perk?.perk?.name}
                                          color="warning"
                                          variant={ "contained" }
                                            sx={{mr: 1, mb: 1, fontSize: '16px'}}
                                          />
                                        ))
                                    ))
                                }
                                         {character?.party_artifact?.map((artifact, index) => (
                                        artifact.artifact?.perks?.map((perk, index) => (
                                          <Chip
                                           icon={<CompostOutlinedIcon/>}
                                          key={index}
                                          label={perk?.perk?.name}
                                          color="info"
                                          variant={ "contained" }
                                            sx={{mr: 1, mb: 1, fontSize: '16px'}}
                                          />
                                        ))
                                    ))
                                }
                                        {
                                          character?.character?.perks.map((perk, index) => (
                                            <Chip
                                              key={index}
                                              label={perk.perk.name}
                                              color={perk?.perk?.common?.color ?? 'primary'}
                                              variant="contained"
                                              sx={{mr: 1, mb: 1, fontSize: '16px'}}
                                            />
                                          ))
                                        }
                                        </Box>
                                        </Collapse>
                                      </TableCell>
                                    </TableRow>
                                    </Fragment>
                                  ))}
                                </TableBody>
                                </Table>
                             </Grid>
                            
                          </Grid>
                        </Paper>
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>
            </Fragment>
          ))
        }
      </Grid>
      
    </>
  );
}
