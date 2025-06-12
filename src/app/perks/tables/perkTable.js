import { TableCell, Button, IconButton } from "@mui/material"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const perkTable = ({handleRemovePerk}) => {
  const columns = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell key={index} align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Description', value: 'description',  cell: (item,index) => {
        return (
          <TableCell key={index} align="left">{item?.description}</TableCell>
        )
      }
    },
    { name: 'Actions', value: 'actions', width: '480px',  cell: (item,index) => {
        return (
          <TableCell key={index} align="left">    
          <Button startIcon={<DeleteOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} onClick={(e) => handleRemovePerk(item)} color="error" variant="contained" size="small"> Remove Perk</Button>
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