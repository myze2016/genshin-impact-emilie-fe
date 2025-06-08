import { TextField,InputAdornment,IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
const CustomSearch = ({ search, handleSearch, fullWidth=false, label="Search" }) => {

    return (
        <TextField
            label={label}
            variant="outlined"
            size="small"
            fullWidth={fullWidth}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            slotProps={{
                input: {
                    startAdornment:  <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: '#a9cbb3' }} /></InputAdornment>,
                    endAdornment: search && (
                        <InputAdornment position="end">
                            <IconButton
                            onClick={() => handleSearch('')}
                            size="small"
                            edge="end"
                            >
                            <CloseIcon sx={{ fontSize: 18, color: '#a9cbb3' }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    )
}
export default CustomSearch