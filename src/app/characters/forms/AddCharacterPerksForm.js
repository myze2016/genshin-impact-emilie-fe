import { FormControl, InputLabel, Input, FormHelperText, Grid, Paper, Typography, Box } from "@mui/material";
import CustomTableRowSearchV2 from "@/components/table/tableRowSearchV2";
import { Widgets } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { getCharacterPerks } from "@/hooks/useCharacter";
const AddCharacterPerksForm = ({ tableColumns, chipData, payload }) => {
    
    const [refetch, setRefetch] = useState(false)
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [ page, setPage] = useState(0)
    const [ rowsPerPage, setRowsPerPage] = useState(10)
    const { data, loading, total } = getCharacterPerks(payload, refetch, search, page+1, rowsPerPage)
    
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

    return (
        <Box sx={{Width: '100%'}}>
            <Grid container spacing={2}>
                    <Grid item size={{xs: 12, md: 12, lg: 12}}>
                        <CustomTableRowSearchV2 minWidth="650" 
                            headers={tableColumns} 
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
    );
}
export default AddCharacterPerksForm