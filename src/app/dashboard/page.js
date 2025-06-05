'use client'

import { Grid, Typography, Button, Card, CardContent, CardActionArea, IconButton, CardActions } from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import { getParties, addParty, addPartyImage } from "../../hooks/useParty";
import AddParty from "./form/AddParty";
import CustomDialog from "@/components/dialog";
import { getCharactersName } from "@/hooks/useCharacter";
import AddPartyImage from "./form/AddPartyImage";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Dashboard() {
  const [refetch, setRefetch] = useState(0)
  const [payload, setPayload] = useState('')
  const [imageDialog, setImageDialog] = useState(false)
  const [partyId, setPartyId] = useState('')
  const [addDialog, setAddDialog] = useState(false)
  const [search, setSearch] = useState('')
  const { data: parties, loading } = getParties(payload, refetch)
  const [debouncedInput, setDebouncedInput] = useState("")
  const [debouncedInputCharacter, setDebouncedInputCharacter] = useState("")
  const [pageCharacter, setPageCharacter] = useState(0)
  const [rowsPerPageCharacter, setRowsPerPageCharacter] = useState(99)

  const [characterPayload , setCharacterPayload] = useState({
    search: '',
  })
  const [refetchCharacter, setRefetchCharacter] = useState(true)
  const { data: characters, loading: characterloading, total } = getCharactersName(characterPayload, refetchCharacter, debouncedInputCharacter, pageCharacter+1, rowsPerPageCharacter)

  const [formData, setFormData] = useState({
    name: '',
    element: '',
    reaction: '',
  })
  const [formDataImage, setFormDataImage] = useState({
    character_id: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    element: '',
    reaction: '',
  })

   const handleSearch = (search) => {
      setSearch(search)
    }
  
    useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInput(search)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  const handleChangeForm = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
  }

  const handleSelectImage = async (item) => {
    await addPartyImage({character_id: item.id, party_id: partyId})
    setRefetch((prev) => !prev)
    setImageDialog(false)
  }

  const handleCancelAdd = (e) => {
    setAddDialog(false)
  }

  const handleConfirmAdd = async (e) => {
    await addParty(formData)
    setRefetch((prev) => !prev)
    setAddDialog(false)
  }

  const handleAddImage = (e, party) => {
    e.stopPropagation()
    setPartyId(party.id)
    setImageDialog(true)
  }

  const handlCloseImage = (party) => {
    setImageDialog(false)
  }

  const handleAddPartyImage = async (e) => {
    await addPartyImage(formData)
    setRefetch((prev) => !prev)
    setImageDialog(false)
  }



  return (
    <>
      <CustomDialog open={addDialog}
              size="sm"
              handleClose={handleCancelAdd} 
              handleConfirm={handleConfirmAdd}  
              title="Add Party" 
              content={<AddParty formData={formData} 
                                 setFormData={setFormData}
                                 handleChangeForm={handleChangeForm} />}
            />
      <CustomDialog open={imageDialog}
              size="sm"
              handleClose={handlCloseImage} 
              handleConfirm={handlCloseImage}  
              title="Add Party Image" 
              content={<AddPartyImage formData={formDataImage} 
                                 setFormData={setFormDataImage}
                                 handleChangeForm={handleChangeForm}
                                 data={characters}
                                 handleSelectImage={handleSelectImage} />}
            />
       
      <Grid container spacing={2}>
        <Grid item size={12}>
          <Button onClick={(e) => setAddDialog(true)} variant="contained">Add Party</Button>
        </Grid>
        <Grid item size={12}>

       
          <Grid container spacing={2}>
            {
              parties && parties?.map((party, index) => (
                <Fragment key={index}>
                    <Card key={index} sx={{ width: 345, height: 160, 
                       backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${party?.character?.gacha_splash_url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'top', overflowY: 'auto' }}>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                            <Typography gutterBottom variant="h6" component="div">
                            {party?.name}
                          </Typography>
                            <IconButton
                      color="primary"
                      onClick={(e) => handleAddImage(e, party)}
                      aria-label="add character to position"
                      
                    >
                      <AddCircleOutlineIcon sx={{ fontSize: '28px' }} />
                    </IconButton>
                            </CardActions>
                             
                           
                          <CardActionArea href={`/party/${party.id}`} sx={{ height: '100%' }}>
                        
                        <CardContent sx={{
                            height: '100%',
                          }}>
                             
                        
                          <Typography variant="body2" color="secondary">
                            {party?.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                          </Card>
                </Fragment>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
      
    </>
  );
}
