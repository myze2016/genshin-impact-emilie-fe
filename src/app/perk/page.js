'use client'
import { Grid, Button } from "@mui/material"
import { useState } from "react";
import { addCommon, getCommons } from "@/hooks/useCommon";
import { addPerk, getPerks } from "@/hooks/usePerk";
import CustomDialog from "@/components/dialog";
import CustomTableV2 from "@/components/table/tableV2";
import TableColumnsPerks from "./table/tableColumnsPerks";
import FormAddPerk from "./form/formAddPerk";
import FormAddCommons from "./form/formAddCommons";

export default function Page() {
  const [ payloadPerks, setPayloadPerks ] = useState('')
  const [ refetchPerks, setRefetchPerks ] = useState(false)
  const [ searchPerks, setSearchPerks ] = useState('')
  const { data: dataPerks, loading: loadingPerks } = getPerks(payloadPerks, refetchPerks, searchPerks)

  const [ payloadCommons, setPayloadCommons ] = useState('')
  const [ refetchCommons, setRefetchCommons ] = useState(false)
  const [ searchCommons, setSearchCommons ] = useState('')
  const { data: dataCommons, loading: loadingCommons } = getCommons(payloadCommons, refetchCommons, searchCommons)

  const [ loadingApi, setLoadingApi ] = useState(false)

  const [ addDialogCommons, setAddDialogCommons ] = useState(false)
  const [ addDialogPerk, setAddDialogPerk] = useState(false)

  const [ formDataCommon, setFormDataCommon ] = useState({
    name: '',
  })

  const [ formDataPerk, setFormDataPerk] = useState({
    name: '',
    description: '',
  })

  const openAddDialogPerk = (e) => {
    setAddDialogPerk(true)
  }

  const closeAddDialogPerk = (e) => {
    setAddDialogPerk(false)
  }

  const handleClickConcateCommon = (name) => {
    let spacedName = name + ' '
    setFormDataPerk((prev) => ({
      ...prev,
      name: prev.name + spacedName
    }));
  }

  const handleChangeFormData = (e, formData, setFormData) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
  }

  const confirmAddDialogPerk = async (e) => {
    setLoadingApi(true)
    let response = await addPerk(formDataPerk)
    if (response?.data?.success) {
      setFormDataPerk({
        name: '',
        description: '',
      })
      setRefetchPerks((prev) => !prev)
      setAddDialogPerk(false)
    }
    setLoadingApi(false)
  }

  const closeAddDialogCommons = () => {
    setAddDialogCommons(false)
  }

  const openAddDialogCommons = () => {
    setAddDialogCommons(true)
  }

  const handleClickAddCommon = async (e) => {
    setLoadingApi(true)
    let response = await addCommon(formDataCommon)
    if (response?.data?.success) {
      setFormDataCommon({
        name: '',
        description: '',
      })
      setRefetchCommons((prev) => !prev)
      setAddDialogCommons(false)
    }
    setLoadingApi(false)
  }
  
  const { columns } = TableColumnsPerks()
  
  return (
    <>
      <CustomDialog open={addDialogPerk}
        handleClose={closeAddDialogPerk} 
        handleConfirm={confirmAddDialogPerk}  
        title="Add Perk" 
        size="md"
        content={<FormAddPerk formDataPerk={formDataPerk} 
                          setFormDataPerk={setFormDataPerk}
                          handleChangeFormData={handleChangeFormData}
                          dataCommons={dataCommons} 
                          handleClickConcateCommon={handleClickConcateCommon} />}
      />
      <CustomDialog open={addDialogCommons}
          handleClose={closeAddDialogCommons} 
          handleConfirm={()=>{}}  
          title="Add Commons" 
          size="md"
          content={<FormAddCommons formDataCommon={formDataCommon} 
                              setFormDataCommon={setFormDataCommon}
                              handleChangeFormData={handleChangeFormData}
                              dataCommons={dataCommons}
                              handleClickAddCommon={handleClickAddCommon} />}
      />
      <Grid container spacing={2}>
        <Grid size={12}>
            <Button onClick={openAddDialogPerk} variant="contained" sx={{mr: 1}}>Add Perk</Button>
            <Button onClick={openAddDialogCommons} variant="contained">Tag Common</Button>
        </Grid>
        <Grid size={12}>
          <CustomTableV2 minWidth="650" headers={columns} data={dataPerks} />
        </Grid>
      </Grid>
      
    </>
  );
}
