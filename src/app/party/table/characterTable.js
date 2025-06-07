import { TableCell, Button, IconButton } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const characterTable = ({handleClickAddCharacterPosition}) => {

  const getElementColor = (element) => {
    switch (element?.toLowerCase()) {
      case 'pyro':
        return '#8b3a2f'; // darker red-brown
      case 'hydro':
        return '#336b87'; // dark teal-blue
      case 'electro':
        return '#5e4b8b'; // dark violet
      case 'cryo':
        return '#4a707a'; // cool dark cyan
      case 'anemo':
        return '#3a5f4f'; // dark muted green
      case 'geo':
        return '#7a6652'; // earthy brown
      case 'dendro':
        return '#486b45'; // dark forest green
      default:
        return 'transparent';
    }
    };


  const columns = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell sx={{backgroundColor: getElementColor(item?.element)}} key={index} align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Element', value: 'element',  cell: (item,index) => {
        return (
          <TableCell sx={{backgroundColor: getElementColor(item?.element)}} key={index} align="left">{item?.element}</TableCell>
        )
      }
    },
    { name: 'Actions', value: '', 
      cell: (item, index) => {
          return (
            <Fragment key={index}>
             
              <TableCell sx={{backgroundColor: getElementColor(item?.element)}} key={index} align="left">  
                  <IconButton
                    color="primary"
                    onClick={() => handleClickAddCharacterPosition(item)}
                    aria-label="add character to position"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
              </TableCell>
            </Fragment>
          )
      }
    },
  ]

  return {
    columns,
  }
}
  
export default characterTable