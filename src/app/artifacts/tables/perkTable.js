import { TableCell, Button, IconButton, Box, CircularProgress } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import XCircleOutlineIcon from '@mui/icons-material/Cancel';

const perkTable = ({handleAddPerk, handleRemovePerk}) => {
  const columns = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell sx={{
          backgroundColor: item?.artifact_perks?.length > 0 
          ? 'rgba(165, 214, 167, 0.15)' // soft success green
          : 'transparent'
  }} key={index} align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Description', value: 'description',  cell: (item,index) => {
        return (
          <TableCell sx={{
            backgroundColor: item?.artifact_perks?.length > 0 
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
                backgroundColor: item?.artifact_perks?.length > 0 
                ? 'rgba(165, 214, 167, 0.15)' // soft success green
                : 'transparent',
  }} align="left"> 
        <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}>
           <IconButton
                color="primary"
                onClick={() => handleAddPerk(item)}
                aria-label="add character to position"
              >
                
               { <AddCircleOutlineIcon /> }
              </IconButton>
          <IconButton
                color="error"
                onClick={() => handleRemovePerk(item)}
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