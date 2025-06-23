import { FormControl, InputLabel, Input, FormHelperText, Grid, Paper, Typography, Box } from "@mui/material";
import CustomTableRowSearchV2 from "@/components/table/tableRowSearchV2";
import { useState, useEffect, Fragment } from "react";
import { getArtifactSearch } from "@/hooks/useArtifact";
import artifactTable from "../tables/artifactTable";
import CustomTableDialog from "@/components/dialog/table";
const AddArtifactsForm = ({ chipData, characterId, dialog, setDialog }) => {
    const [payload, setPayload] = useState('')
    const [refetch, setRefetch] = useState('')
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [ page, setPage] = useState(0)
    const [ rowsPerPage, setRowsPerPage] = useState(10)
    const { data, loading, total } = getArtifactSearch(characterId, refetch, search, page+1, rowsPerPage)

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

    const handleAddArtifact = async (perk) => {
        const payload = {
            perk_id: perk?.id,
            character_id: characterId
        };
        let response = await addCharacterArtifact(payload)
        if (response?.data?.success) {
            setRefetch((prev) => !prev)
        }
    }

    const handleRemoveArtifact = async (perk) => {
        const payload = {
            perk_id: perk?.id,
            character_id: characterId
        };
        let response = await removeCharacterArtifact(payload)
        if (response?.data?.success) {
            setRefetch((prev) => !prev)
        }
    }

    const handleCloseDialog = (e) => {
        setRefetch((prev) => !prev)
        setSearchInput('')
        setDialog(false)
    }
    
    const { columns } = artifactTable({handleAddArtifact, handleRemoveArtifact})
    
    return (
           <Fragment>
            <CustomTableDialog size="md" open={dialog}
                handleClose={handleCloseDialog} 
                handleConfirm={handleCloseDialog}  
                title="Add Character Artifact"
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
export default AddArtifactsForm