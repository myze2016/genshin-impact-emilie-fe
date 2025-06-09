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
    { name: 'Actions', value: 'actions', width: '240px',  cell: (item,index) => {
        return (
          <TableCell key={index} align="left">    <IconButton
                  color="primary"
                  onClick={(e) => {
                    handleRemovePerk(item);
                  }}
                >
                  <DeleteOutlineIcon color="error" sx={{ fontSize: '24px' }} />
                </IconButton> </TableCell>
        )
      }
    },
  ]

  return {
    columns,
  }
}
  
export default perkTable