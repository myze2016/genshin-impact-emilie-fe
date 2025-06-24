import { TableCell, Button, IconButton, Box, CircularProgress } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import XCircleOutlineIcon from '@mui/icons-material/Cancel';

const perkTable = ({handleAddCharacterPerk, handleRemoveCharacterPerk}) => {
  const columns = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell sx={{
          backgroundColor: item?.character_perks?.length > 0 
          ? 'rgba(165, 214, 167, 0.15)' // soft success green
          : 'transparent'
  }} key={index} align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Description', value: 'description',  cell: (item,index) => {
        return (
          <TableCell sx={{
            backgroundColor: item?.character_perks?.length > 0 
            ? 'rgba(165, 214, 167, 0.15)' // soft success green
            : 'transparent'
  }} key={index} align="left">{item?.description}</TableCell>
        )
      }
    },
    { name: 'Actions', value: '', 
      cell: (item, index) => {
          return (
              <TableCell key={index} sx={{
                backgroundColor: item?.character_perks?.length > 0 
                ? 'rgba(165, 214, 167, 0.15)' // soft success green
                : 'transparent',
  }} align="left"> 
        <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}>
           <IconButton
                hidden={ item?.character_perks?.length > 0 }
                color="primary"
                onClick={() => handleAddCharacterPerk(item)}
                aria-label="add character to position"
              >
                
               { <AddCircleOutlineIcon /> }
              </IconButton>
          <IconButton
                hidden={ item?.character_perks?.length === 0 }
                color="error"
                onClick={() => handleRemoveCharacterPerk(item)}
                aria-label="add character to position"
              >
                { <XCircleOutlineIcon /> }
              </IconButton>
              </Box>
            </TableCell>
          )
      }
    },
  ]

  return {
    columns,
  }
}
  
export default perkTable