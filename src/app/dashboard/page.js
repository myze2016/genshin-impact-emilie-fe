'use client'

import { Grid, Typography, Button, Card, CardContent, CardActionArea, IconButton, CardActions, TablePagination, Box} from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import { getParties, addParty, addPartyImage } from "../../hooks/useParty";
import AddParty from "./form/AddParty";
import CustomDialog from "@/components/dialog";
import { getCharactersName } from "@/hooks/useCharacter";
import AddPartyImage from "./form/AddPartyImage";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Spinner from "@/components/Spinner";
import AddIcon from '@mui/icons-material/Add';
import { Add } from "@mui/icons-material";
import CustomTableDialog from "@/components/dialog/table";
import { getElements } from "@/hooks/useElements";
import CustomSearch from "@/components/Search";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useElementContext } from "@/context/ElementContext";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

export default function Dashboard() {
  const { user, partyContextId, setPartyContextId } = useUser()
  const router = useRouter()
  const [refetchParties, setRefetchParties] = useState(false)
  const [partiesPayload, setPartiesPayload] = useState('')
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { data: partiesData, loading: partiesLoading, total: partiesTotal } = getParties(partiesPayload, refetchParties, search, page+1, rowsPerPage)

  const [ elementsPayload, setElementsPayload] = useState('')
  const [ refetchElements, setRefetchElements] = useState(false)
  // const { data: elementsData, loading: elementsLoading } = getElements(elementsPayload, refetchElements)
       const { data: elementsData, loading: elementsLoading } = useElementContext()

  const [charactersPage, setCharactersPage] = useState(0)
  const [charactersPayload, setCharactersPayload] = useState('')
  const [refetchCharacters, setRefetchCharacters] = useState(false)
  const [searchCharacters, setSearchCharacters] = useState('')
  const [searchCharactersInput, setSearchCharactersInput] = useState('')
  const [charactersRows, setCharactersRows] = useState(9)
  const { data: charactersData, loading: charactersLoading, total: charactersTotal } = getCharactersName(charactersPayload, refetchCharacters, searchCharacters, charactersPage+1, charactersRows)

  const [ apiLoading, setApiLoading ] = useState(false)
  const [addImageDialog, setAddImageDialog] = useState(false)
  const [addPartyDialog, setAddPartyDialog] = useState(false)
  const [partyId, setPartyId] = useState('')


  const [partyFormData, setPartyFormData] = useState({
    name: '',
    element_id: '',
    reaction: '',
  })
  const [imageFormData, setImageFormData] = useState({
    character_id: '',
  })

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacters(searchCharactersInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchCharactersInput])

 
  const changeFormData = (e, formData, setFormData) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
  }

  const selectImage = async (character) => {
    setApiLoading(true)
    let response = await addPartyImage({character_id: character.id, party_id: partyId})
    if (response?.data?.success) {
      setRefetchParties((prev) => !prev)
      setAddImageDialog(false)
    }
    setApiLoading(false)
  }

  const closeAddPartyDialog = (e) => {
    setAddPartyDialog(false)
  }

  const confirmAddPartyDialog = async (e) => {
    setApiLoading(true)
    let response = await addParty(partyFormData)
    if (response?.data?.success) {  
      setRefetchParties((prev) => !prev)
      setPartyFormData({
        name: '',
        element_id: '',
        reaction: '',
      })
      setAddPartyDialog(false)
    }
    setApiLoading(false)
  }

  const clickAddPartyImage = (e, party) => {
    e.stopPropagation()
    setPartyId(party.id)
    setAddImageDialog(true)
  }

  const closeAddImageDialog = () => {
    setAddImageDialog(false)
  }

    const clickCharactersPage = (e, page) => {
    setCharactersPage(page);
  };

  const selectCharactersRows = (e) => {
    setCharactersRows(parseInt(e.target.value, 10));
    setCharactersPage(0);
  };

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacters(searchCharactersInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchCharactersInput])

  const handleSearch = (search) => {
    setSearchInput(search)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchInput])


  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  
  const handleChangePage = (e, page) => {
    setPage(page);
  };

  const handleRedirectParty = (e, id) => {
    setPartyContextId(id)
    router.push('/party');
  }



  return (
    <>
     { apiLoading && <Spinner /> }
      <CustomDialog open={addPartyDialog}
              size="sm"
              handleClose={closeAddPartyDialog} 
              handleConfirm={confirmAddPartyDialog}  
              title="Add Party" 
              content={<AddParty partyFormData={partyFormData} 
                                 setPartyFormData={setPartyFormData}
                                 changeFormData={changeFormData}
                                 options={elementsData} />}
            />
      <CustomTableDialog open={addImageDialog}
              size="lg"
              handleClose={closeAddImageDialog} 
              handleConfirm={closeAddImageDialog}  
              title="Add Party Image" 
              content={<AddPartyImage 
                                 charactersData={charactersData}
                                 selectImage={selectImage}
                                 charactersPage={charactersPage}
                                 charactersTotal={charactersTotal}
                                  clickCharactersPage={clickCharactersPage} 
                                  charactersRows={charactersRows} 
                                  selectCharactersRows={selectCharactersRows}
                                  search={searchCharactersInput}
                                  setSearch={setSearchCharactersInput} />}
            />
       
      <Grid container spacing={2}>
        <Grid item size={8}>
           <Button  color='secondary' startIcon={<ReplyOutlinedIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1}} onClick={(e) => router.back()} variant="contained">Back</Button>
          <Button startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
          sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} 
          onClick={(e) => setAddPartyDialog(true)} variant="contained">Add Party</Button>
        </Grid>
        <Grid item size={4} >
            <Grid container  justifyContent="flex-end" spacing={2} >
            <CustomSearch  search={searchInput}
              handleSearch={handleSearch}
              fullWidth={false}>
            </CustomSearch>
          </Grid>
        </Grid>
        <Grid item size={12}>

       
          <Grid container spacing={2}>
            {
              partiesData && partiesData?.map((party, index) => (
                <Fragment key={index}>
                    <Card
                    sx={{
                      width: 345,
                      height: 160,
                      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${party?.character?.gacha_splash_url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'top',
                      overflowY: 'auto',
                      position: 'relative'
                    }}
                  >
                    <CardActionArea
                      component="a"
                      onClick={(e)=> handleRedirectParty(e, party.id)}
                      sx={{ height: '100%', display: 'block' }}
                    >
                      <CardContent
                        sx={{
                          height: '100%',
                          pt: 2,
                          px: 2
                        }}
                      >
                        <Typography gutterBottom variant="h6" component="div">
                          {party?.name}
                        </Typography>
                        <Typography variant="body2" color="secondary">
                          {party?.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                   
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent navigation
                        e.preventDefault();
                        clickAddPartyImage(e, party);
                      }}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <AddCircleOutlineIcon sx={{ fontSize: '28px' }} />
                    </IconButton>
                  </Card>
                </Fragment>
              ))
            }
          </Grid>
        </Grid>
        <Grid item size={{xs: 12, md: 12, lg: 12}}>
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end', // or 'flex-end'
              mt: 4,
            }}
          >

              <TablePagination
                component="div"
                count={partiesTotal}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
              </Box>

        </Grid>
      </Grid>
      
    </>
  );
}
