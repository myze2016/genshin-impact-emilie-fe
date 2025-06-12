'use client'

import { Grid, Typography, Button, Box, Chip, Stack, Paper, Table, TableRow, TableCell, TableBody, IconButton } from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import { getParty, addPartyPosition, addPartyPositionCharacter, removePartyPositionCharacter, editParty, moveVerticalCharacter, removePosition } from "../../../hooks/useParty";
import AddPartyPosition from "../form/AddPartyPosition";
import AddPartyPositionCharacter from "../form/AddPartyPositionCharacter";
import CustomDialog from "@/components/dialog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getCharacters } from "@/hooks/useCharacter";
import characterTable from "../table/characterTable";
import { useParams, useRouter } from "next/navigation";
import CustomTableDialog from "@/components/dialog/table";
import { getCommons } from "@/hooks/useCommon";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import EditPartyForm from "../form/EditPartyForm";
import { getElements } from "@/hooks/useElements";
import Spinner from "@/components/Spinner";

export default function Party() {
  const params = useParams();
  const party_id = params?.id;

  const [refetchParty, setRefetchParty] = useState(false)
  const [partyPayload, setPartyPayload] = useState({
    id: party_id,
  })
  const { data: partyData, loading: partyLoading } = getParty(partyPayload, refetchParty)
  
  const [ apiLoading, setApiLoading] = useState(false)
  const [ editPartyDialog, setEditPartyDialog] = useState(false)

  const [ elementsPayload, setElementsPayload] = useState('')
  const [ refetchElements, setRefetchElements] = useState(false)
  const { data: elementsData, loading: elementsLoading } = getElements(elementsPayload, refetchElements)
   
  const [charactersPage, setCharactersPage] = useState(0)
  const [charactersPayload, setCharactersPayload] = useState('')
  const [refetchCharacters, setRefetchCharacters] = useState(false)
  const [searchCharacters, setSearchCharacters] = useState('')
  const [searchCharactersInput, setSearchCharactersInput] = useState('')
  const [charactersRows, setCharactersRows] = useState(5)
  const { data: charactersData, loading: charactersLoading, total: charactersTotal } = getCharacters(charactersPayload, refetchCharacters, searchCharacters, charactersPage+1, charactersRows)


  const [commonsPayload, setCommonsPayload] = useState('')
  const [refetchCommons, setRefetchCommons] = useState(false)
  const [searchCommons, setSearchCommons] = useState('')
  const { data: commonsData, loading: commonsLoading } = getCommons(commonsPayload, refetchCommons, searchCommons)

  const [addPositionDialog, setAddPositionDialog] = useState(false)
  const [addCharacterPositionDialog, setAddCharacterPositionDialog] = useState(false)


  const [partyId, setPartyId] = useState('')
  const [positionId, setPositionId] = useState('')
  const [partyFormData, setPartyFormData] = useState({
    name: '',
    element_id: '',
    reaction: '',
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

   const changeFormData = (e, formData, setFormData) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    console.log('updatedForm', updatedForm)
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


    useEffect(() => {
      setPartyFormData({
        id: partyData[0]?.id,
        name: partyData[0]?.name,
        element_id: partyData[0]?.element_id,
        reaction: partyData[0]?.reaction,
        description: partyData[0]?.description,
      })
    }, [partyData])

  const { columns } = characterTable({handleClickAddCharacterPosition})

  return (
    <>
        { apiLoading && <Spinner /> }
        <CustomDialog open={editPartyDialog}
              size="sm"
              handleClose={() => setEditPartyDialog(false)} 
              handleConfirm={confirmEditPartyDialog}  
              title="Edit Party" 
              content={<EditPartyForm partyFormData={partyFormData} 
                                 setPartyFormData={setPartyFormData}
                                 changeFormData={changeFormData}
                                 options={elementsData} />} />

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
      <Grid container spacing={2}>
        {
          partyData && partyData?.map((party, index) => (
            <Fragment key={index}>
              <Grid item size={12}>
                <Grid container spacing={2}>
                      <Grid item size={8}>
                           <Paper sx={{ padding: 2, height: '100%', backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${party?.character?.namecard_background_url})`,
                          backgroundSize: 'cover', // or 'contain' depending on your layout
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right' }}>
                          <Grid container>
                            <Grid item size={12} sx={{mb: 1}}>
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">{party?.name}</Typography>
                                <Box>
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleDelete()}
                                sx={{ mr: 1, minWidth: '36px', padding: '6px' }} // Make button compact
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </Button>

                              <Button
                                variant="contained"
                                color="info"
                                size="small"
                                onClick={() => setEditPartyDialog(true)}
                                sx={{ mr: 1, minWidth: '36px', padding: '6px' }}
                              >
                                <ModeEditOutlineOutlinedIcon fontSize="small" />
                              </Button>
                                  <Button startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1}} onClick={(e) => handleOpenAddPositionDialog(party)} color="primary" variant="contained" size="small"> Add Position</Button>
                                            
                                </Box>
                              </Box>
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
                      <Grid item size={4}>
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
                      <Grid key={index} item size={6}>
                        <Paper  >
                          <Grid container spacing={0}>
                            <Grid item size={12} >
                              <Box sx={{px: 2}} display="flex" justifyContent="space-between" alignItems="center">
                                <Typography sx={{ fontWeight: 'bold' }}>{position?.name}</Typography>
                                <Box  display="flex" justifyContent="flex-end" alignItems="center">
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
                                            </Box>
                              </Box>
                            </Grid>
                            <hr style={{ width: '100%' }} />
                             <Grid key={index} item size={12}>
                                <Table>
                                <TableBody>
                                  { position && position?.characters_value?.map((character, index) => (
                                    <TableRow key={index}>
                                      <TableCell>
                                        <Typography>{character?.character?.name}</Typography>
                                      </TableCell>
                                      <TableCell width="50%">
  <Box
    sx={{
      maxHeight: 80,              // Limit visible height (2 Chip rows)
      overflowY: 'auto',
       display: 'flex',
       flexWrap: 'wrap',  
       alignContent: 'flex-start',
      pr: 1,  
    }}
  >
                                         {character?.character?.weapons?.map((weapon, index) => (
                                        weapon.weapon?.perks?.map((perk, index) => (
                                          <Chip
                                          key={index}
                                          label={perk?.perk?.name}
                                          color="secondary"
                                          variant={ "contained" }
                                            sx={{mr: 1, mb: 1, fontSize: '16px'}}
                                          />
                                        ))
                                    ))
                                }
                                         {character?.character?.artifacts?.map((artifact, index) => (
                                        artifact.artifact?.perks?.map((perk, index) => (
                                          <Chip
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
                                              color="primary"
                                              variant="contained"
                                              sx={{mr: 1, mb: 1, fontSize: '16px'}}
                                            />
                                          ))
                                        }
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                                              
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
