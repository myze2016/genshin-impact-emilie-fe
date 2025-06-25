import { Grid, Box, Button } from "@mui/material";
import CustomTableRowSearchV2 from "@/components/table/tableRowSearchV2";
import { useState, useEffect, Fragment } from "react";
import { getCharacterPerks } from "@/hooks/useCharacter";
import perkTable from "../tables/perkTable";
import { addCharacterPerk, deleteCharacterPerk } from "@/hooks/useCharacter";
import CustomTableDialog from "@/components/dialog/table";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const AddCharacterPerksForm = ({ refetch, setRefetch, chipData, characterId, setRefetchCharacters, dialog, setDialog, setAddPerkDialog }) => {
    
    const [payload, setPayload] = useState('')
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [ page, setPage] = useState(0)
    const [ rowsPerPage, setRowsPerPage] = useState(10)
    const { data, loading, total } = getCharacterPerks(characterId, refetch, search, page+1, rowsPerPage)
    
    const handleClickChip = (value) => {
        if (!searchInput.includes(value)) {
            setSearchInput((prev) => prev + (value + ' '))
        } else {
            setSearchInput((prev) => prev.replace(value + ' ', ''))
        }
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

    const handleChangePage = (e, page) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleAddCharacterPerk = async (perk) => {
        const payload = {
            perk_id: perk?.id,
            character_id: characterId
        };
        let response = await addCharacterPerk(payload)
        if (response?.data?.success) {
            setRefetch((prev) => !prev)
             setRefetchCharacters((prev) => !prev)
        }
    }

    const handleRemoveCharacterPerk = async (perk) => {
        const payload = {
            perk_id: perk?.id,
            character_id: characterId
        };
        let response = await deleteCharacterPerk(payload)
        if (response?.data?.success) {
            setRefetch((prev) => !prev)
             setRefetchCharacters((prev) => !prev)
        }
    }

    const handleCloseDialog = (e) => {
        setRefetch((prev) => !prev)
        setSearchInput('')
        setDialog(false)
    }
    
    const { columns } = perkTable({handleAddCharacterPerk, handleRemoveCharacterPerk})

    return (
        <Fragment>
            <CustomTableDialog size="md" open={dialog}
                handleClose={handleCloseDialog} 
                handleConfirm={handleCloseDialog}  
                title="Add Character Perks"
                content={
                    <Box sx={{Width: '100%'}}>
                        <Grid container spacing={0}>
                            <Grid item size={{xs: 12, md: 12, lg: 12}}>
                            <Button  startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, m: 1}} onClick={(e) => setAddPerkDialog(true)} variant="contained">Create Perk</Button>
                            </Grid>
                            <Grid item size={{xs: 12, md: 12, lg: 12}}>
                                <CustomTableRowSearchV2 minWidth="650" 
                                    headers={columns} 
                                    data={data} 
                                    chipData={chipData}  
                                    handleSearch={handleSearch} 
                                    search={searchInput} 
                                    handleSearchChip={handleClickChip} 
                                    loading={loading} 
                                    page={page} 
                                    handleChangePage={handleChangePage} 
                                    rowsPerPage={rowsPerPage} 
                                    handleChangeRowsPerPage={handleChangeRowsPerPage} 
                                    total={total}/>
                            </Grid>
                        </Grid>
                    </Box> 
                }
            />
            
        </Fragment>
        
    );
}
export default AddCharacterPerksForm