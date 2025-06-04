'use client'

import { Grid, Typography, Button, Card, CardContent, CardActionArea } from "@mui/material"
import { Fragment, useState, useEffect } from "react";
import { getParties, addParty } from "../../hooks/useParty";
import AddParty from "./form/AddParty";
import CustomDialog from "@/components/dialog";


export default function Dashboard() {
  const [refetch, setRefetch] = useState(0)
  const [payload, setPayload] = useState('')
  const [addDialog, setAddDialog] = useState(false)
  const [search, setSearch] = useState('')
  const { data: parties, loading } = getParties(payload, refetch)
  const [debouncedInput, setDebouncedInput] = useState("")
  const [formData, setFormData] = useState({
    name: '',
    element: '',
    reaction: '',
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

  const handleCancelAdd = (e) => {
    setAddDialog(false)
  }

  const handleConfirmAdd = async (e) => {
    await addParty(formData)
    setRefetch((prev) => !prev)
    setAddDialog(false)
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
       
      <Grid container spacing={2}>
        <Grid item size={12}>
          <Button onClick={(e) => setAddDialog(true)} variant="contained">Add Party</Button>
        </Grid>
        <Grid item size={12}>
          <Grid container spacing={2}>
            {
              parties && parties?.map((party, index) => (
                <Fragment key={index}>
                    <Card sx={{ width: 345, height: 160 }}>
                      <CardActionArea href={`/party/${party.id}`} sx={{ height: '100%' }}>
                        <CardContent sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            height: '100%',
                          }}>
                          <Typography gutterBottom variant="h6" component="div">
                            {party?.name}
                          </Typography>
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
