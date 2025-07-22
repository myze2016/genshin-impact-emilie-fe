'use client'
import { Grid, Button, Tabs, Tab, Box } from "@mui/material"
import { useState, useEffect } from "react";
import { addCommon, getCommons, removeCommon } from "@/hooks/useCommon";
import { addPerk, getPerks, removePerk } from "@/hooks/usePerk";
import CustomDialog from "@/components/dialog";
import CustomTableV2 from "@/components/table/tableV2";
import perkTable from "./tables/perkTable";
import AddCommonsForm from "./forms/AddCommonsForm";
import AddPerkForm from "./forms/AddPerkForm";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Spinner from "@/components/Spinner";
import CustomSearch from "@/components/Search";
import { matchCommon } from "@/hooks/usePerk";
import { useCommonContext } from "@/context/CommonContext";

export default function Page() {
  const [ perksPayload, setPerksPayload ] = useState('')
  const [ refetchPerks, setRefetchPerks ] = useState(false)
  const [tabValueInput, setTabValueInput] = useState('Perk')
  const [tabValue, setTabValue] = useState('Perk')
  const [ searchPerks, setSearchPerks ] = useState('')
    const [ searchPerksInput, setSearchPerksInput ] = useState('')
  const [ perksRows, setPerksRows ] = useState(10)
  const [ perksPage, setPerksPage ] = useState(0)
  const { data: perksData, loading: perksLoading, total: perksTotal } = getPerks(tabValue, perksPayload, refetchPerks, searchPerks, perksPage+1, perksRows)

  const [ commonsPayload, setCommonsPayload ] = useState('')
  const [ refetchCommons, setRefetchCommons ] = useState(false)
  const [ searchCommons, setSearchCommons ] = useState('')
  // const { data: commonsData, loading: loadingCommons } = getCommons(commonsPayload, refetchCommons, searchCommons)
   const { data: commonsData, loading: loadingCommons, refetch } = useCommonContext()

  const [ apiLoading, setApiLoading ] = useState(false)

  const [ addCommonsDialog, setAddCommonsDialog ] = useState(false)
  const [ addPerkDialog, setAddPerkDialog] = useState(false)

  const [ commonFormData, setCommonFormData ] = useState({
    name: '',
    color: 'primary',
  })

  const [ perkFormData, setPerkFormData] = useState({
    name: '',
    type: 'Perk',
    color: '#81c784',
    description: '',
  })

  const openAddPerkDialog = (e) => {
    setAddPerkDialog(true)
  }


  const handleClosePerkDialog = (e) => {
    setAddPerkDialog(false)
    resetPerkFormData()
  }

  const resetPerkFormData = () => {
    setPerkFormData({
      name: '',
      type: 'Perk',
      color: '#81c784',
      description: '',
    })
  }

  const handleCloseCommonDialog = (e) => {
    setAddCommonsDialog(false)
    resetCommonFormData()
  }

  const resetCommonFormData = () => {
    setCommonFormData({
      name: '',
      color: 'primary',
    })
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
        type: 'Perk',
        color: '#81c784',
        description: '',
      })
      setRefetchPerks((prev) => !prev)
      setAddPerkDialog(false)
    }
    setApiLoading(false)
  }

  const openAddCommonsDialog = () => {
    setAddCommonsDialog(true)
  }



  const handleRefetch = (query) => {
     switch (query) {
      case 'commons':
        refetch()
        // setRefetchCommons((prev) => !prev)
        break;
      default:
        break;
    }
  }


  const handleClear = (query) => {
     switch (query) {
      case 'common':
        setCommonFormData({
          name: '',
          color: 'primary',
        })
        break;
      default:
        break;
    }
  }

  const handleRemovePerk = async (perk) => {
    setApiLoading(true)
    const payload = {
      id: perk?.id,
    };
    let response = await removePerk(payload)
    if (response?.data?.success) {
      setRefetchPerks((prev) => !prev)
    }
    setApiLoading(false)
  }

   const handleMatchCommon = async (perk) => {
    setApiLoading(true)
    const payload = {
      id: perk?.id,
    };
    let response = await matchCommon(payload)
    if (response?.data?.success) {
      setRefetchPerks((prev) => !prev)
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


    useEffect(() => {
      const timeout = setTimeout(() => {
        setSearchPerks(searchPerksInput)
      }, 300)
  
      return () => clearTimeout(timeout)
    }, [searchPerksInput])
  
  
     const handleSearch = (search) => {
      setSearchPerksInput(search)
    }

    useEffect(() => {
      const timeout = setTimeout(() => {
        setTabValue(tabValueInput)
        const updatedForm = { ...perkFormData, type: tabValueInput }
        setPerkFormData(updatedForm)
      }, 300)
  
      return () => clearTimeout(timeout)
    }, [tabValueInput])
  
  const { columns } = perkTable({handleRemovePerk, handleMatchCommon})
  
  return (
    <>
      { apiLoading && <Spinner /> }
      <CustomDialog open={addPerkDialog}
        handleClose={handleClosePerkDialog} 
        handleConfirm={confirmAddPerkDialog}  
        title="Add Perk" 
        size="md"
        content={<AddPerkForm perkFormData={perkFormData} 
                          setPerkFormData={setPerkFormData}
                          changeFormData={changeFormData}
                          commonsData={commonsData} />}
      />
      <CustomDialog open={addCommonsDialog}
          handleClose={handleCloseCommonDialog} 
          handleConfirm={handleCloseCommonDialog}  
          title="Add Commons" 
          size="md"
          content={<AddCommonsForm commonFormData={commonFormData} 
                              setCommonFormData={setCommonFormData}
                              changeFormData={changeFormData}
                              commonsData={commonsData}
                              loading={loadingCommons}
                              setApiLoading={setApiLoading} 
                              handleRefetch={handleRefetch}
                              handleClear={handleClear} />}
      />
      <Grid container spacing={2}>
        <Grid size={8}>
            <Button startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                                  sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mb: 1}} onClick={openAddPerkDialog} variant="contained">Add {tabValue} </Button>
            <Button startIcon={<MenuBookIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                                  sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mb: 1}} onClick={openAddCommonsDialog} variant="contained">Tag Common</Button>
        </Grid>
         <Grid item size={4} >
               <Grid container  justifyContent="flex-end" spacing={2} >
                <CustomSearch  search={searchPerksInput}
                  handleSearch={handleSearch}
                  fullWidth={false}>
                </CustomSearch>
              </Grid>
            </Grid>
        <Grid size={12}>
          <Tabs
            value={tabValueInput}
            onChange={(e, newValue) => setTabValueInput(newValue)}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="Perk" label="Perk" />
            <Tab value="Synergy" label="Synergy" />
            <Tab value="Stat" label="Stat" />
          </Tabs>
        </Grid>
        <Grid size={12}>
          <CustomTableV2 minWidth="650" headers={columns} data={perksData} page={perksPage} handleChangePage={clickPerksPage} rowsPerPage={perksRows} handleChangeRowsPerPage={selectPerksRows} total={perksTotal} loading={perksLoading} />
        </Grid>
      </Grid>
      
    </>
  );
}
