'use client'
import { Grid, Button } from "@mui/material"
import { useState } from "react";
import { addCommon, getCommons } from "@/hooks/useCommon";
import { addPerk, getPerks } from "@/hooks/usePerk";
import CustomDialog from "@/components/dialog";
import CustomTableV2 from "@/components/table/tableV2";
import perkTable from "./tables/perkTable";
import AddCommonsForm from "./forms/AddCommonsForm";
import AddPerkForm from "./forms/AddPerkForm";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



export default function Page() {
  const [ perksPayload, setPerksPayload ] = useState('')
  const [ refetchPerks, setRefetchPerks ] = useState(false)
  const [ searchPerks, setSearchPerks ] = useState('')
  const [ perksRows, setPerksRows ] = useState(10)
  const [ perksPage, setPerksPage ] = useState(0)
  const { data: perksData, loading: perksLoading, total: perksTotal } = getPerks(perksPayload, refetchPerks, searchPerks, perksPage+1, perksRows)

  const [ commonsPayload, setCommonsPayload ] = useState('')
  const [ refetchCommons, setRefetchCommons ] = useState(false)
  const [ searchCommons, setSearchCommons ] = useState('')
  const { data: commonsData, loading: loadingCommons } = getCommons(commonsPayload, refetchCommons, searchCommons)

  const [ apiLoading, setApiLoading ] = useState(false)

  const [ addCommonsDialog, setAddCommonsDialog ] = useState(false)
  const [ addPerkDialog, setAddPerkDialog] = useState(false)

  const [ commonFormData, setCommonFormData ] = useState({
    name: '',
  })

  const [ perkFormData, setPerkFormData] = useState({
    name: '',
    description: '',
  })

  const openAddPerkDialog = (e) => {
    setAddPerkDialog(true)
  }

  const closeAddPerkDialog = (e) => {
    setAddPerkDialog(false)
  }

  const clickCommon = (name) => {
    setFormDataPerk((prev) => ({
      ...prev,
      name: prev.name + (name + ' ')
    }));
  }

  const changeFormData = (e, formData, setFormData) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
  }

  const confirmAddPerkDialog = async (e) => {
    setApiLoading(true)
    let response = await addPerk(perkFormData)
    if (response?.data?.success) {
      setPerkFormData({
        name: '',
        description: '',
      })
      setRefetchPerks((prev) => !prev)
      setAddPerkDialog(false)
    }
    setApiLoading(false)
  }

  const closeAddCommonsDialog = () => {
    setAddCommonsDialog(false)
  }

  const openAddCommonsDialog = () => {
    setAddCommonsDialog(true)
  }

  const clickAddCommon = async (e) => {
    setApiLoading(true)
    let response = await addCommon(commonFormData)
    if (response?.data?.success) {
      setCommonFormData({
        name: '',
        description: '',
      })
      setRefetchCommons((prev) => !prev)
    }
    setApiLoading(false)
  }

  
  const clickPerksPage = (e, page) => {
    setPerksPage(page);
  };

  const selectPerksRows = (e) => {
    setPerksRows(parseInt(e.target.value, 10));
    setPerksPage(0);
  };
  
  const { columns } = perkTable()
  
  return (
    <>
      { apiLoading && <Spinner /> }
      <CustomDialog open={addPerkDialog}
        handleClose={closeAddPerkDialog} 
        handleConfirm={confirmAddPerkDialog}  
        title="Add Perk" 
        size="md"
        content={<AddPerkForm perkFormData={perkFormData} 
                          setPerkFormData={setPerkFormData}
                          changeFormData={changeFormData}
                          commonsData={commonsData} 
                          clickCommon={clickCommon} />}
      />
      <CustomDialog open={addCommonsDialog}
          handleClose={closeAddCommonsDialog} 
          handleConfirm={()=>{}}  
          title="Add Commons" 
          size="md"
          content={<AddCommonsForm commonFormData={commonFormData} 
                              setCommonFormData={setCommonFormData}
                              changeFormData={changeFormData}
                              commonsData={commonsData}
                              clickAddCommon={clickAddCommon}
                              loading={loadingCommons}/>}
      />
      <Grid container spacing={2}>
        <Grid size={12}>
            <Button startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                                  sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1}} onClick={openAddPerkDialog} variant="contained">Add Perk</Button>
            <Button startIcon={<MenuBookIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                                  sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} onClick={openAddCommonsDialog} variant="contained">Tag Common</Button>
        </Grid>
        <Grid size={12}>
          <CustomTableV2 minWidth="650" headers={columns} data={perksData} page={perksPage} handleChangePage={clickPerksPage} rowsPerPage={perksRows} handleChangeRowsPerPage={selectPerksRows} total={perksTotal} loading={perksLoading} />
        </Grid>
      </Grid>
      
    </>
  );
}
