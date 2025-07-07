import { TableCell, Button, IconButton, Chip, Typography } from "@mui/material"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';

const perkTable = ({handleRemovePerk, handleMatchCommon}) => {
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
    { name: 'Matched Common', value: 'type',  cell: (item,index) => {
        return (
          <TableCell key={index} align="left"> 
            { item.common && <Chip
              key={index}
              onClick={() => handleFillCommon(common?.name)}
              label={item?.common?.name}
              color={item?.common?.color}
              sx={{ fontSize: '16px', mr: 1 }}
              variant="contained" /> }
          </TableCell>
        )
      }
    },
    { name: 'Type', value: 'type',  cell: (item,index) => {
        return (
          <TableCell key={index} align="left"><Typography color="secondary">{item?.type}</Typography></TableCell>
        )
      }
    },
    { name: 'Actions', value: 'actions',  cell: (item,index) => {
        return (
          <TableCell key={index} align="left">    
            <Button startIcon={<DeleteOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                        sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mb: 1}} onClick={(e) => handleRemovePerk(item)} color="error" variant="contained" size="small"> Remove Perk</Button>
            <Button startIcon={<SearchIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
        sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mb: 1}} onClick={(e) => handleMatchCommon(item)} color="info" variant="contained" size="small"> Match Common</Button>
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