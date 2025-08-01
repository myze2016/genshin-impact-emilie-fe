import { FormControl, InputLabel, Input, FormHelperText, Grid, Paper, Typography, Box } from "@mui/material";
import CustomTableRowSearchV2 from "@/components/table/tableRowSearchV2";
import { Widgets } from "@mui/icons-material";
import { getWeaponSearch } from "@/hooks/useWeapon";
import { useEffect, useState, Fragment } from "react";
import weaponTable from "../tables/weaponTable";
import CustomTableDialog from "@/components/dialog/table";
import { addCharacterWeapon, removeCharacterWeapon } from "@/hooks/useCharacterWeapon";
const AddWeaponsForm = ({ chipData, characterId, weaponTypeId, dialog, setRefetchCharacters, setDialog }) => {
    const [payload, setPayload] = useState('')
    const [refetch, setRefetch] = useState('')
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [ page, setPage] = useState(0)
    const [ rowsPerPage, setRowsPerPage] = useState(10)
    const { data, loading, total } = getWeaponSearch(characterId, weaponTypeId, refetch, search, page+1, rowsPerPage)
    
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

    const handleAddWeapon = async (weapon) => {
        const payload = {
            weapon_id: weapon?.id,
            character_id: characterId
        };
        let response = await addCharacterWeapon(payload)
        if (response?.data?.success) {
            setRefetch((prev) => !prev)
            setRefetchCharacters((prev) => !prev)
        }
    }

    const handleRemoveWeapon = async (weapon) => {
        const payload = {
            weapon_id: weapon?.id,
            character_id: characterId
        };
        let response = await removeCharacterWeapon(payload)
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
    
    const { columns } = weaponTable({handleAddWeapon, handleRemoveWeapon })

    return (
        <Fragment>
            <CustomTableDialog size="md" open={dialog}
                handleClose={handleCloseDialog} 
                handleConfirm={handleCloseDialog}  
                title="Add Weapon Perks"
                content={
                    <Box sx={{Width: '100%'}}>
                        <Grid container spacing={2}>
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
export default AddWeaponsForm