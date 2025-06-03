import { TableCell, Button } from "@mui/material"
import { Fragment } from "react"

const tableColumns = ({addCharacterPosition}) => {

  const getElementColor = (element) => {
    switch (element?.toLowerCase()) {
      case 'pyro':
        return '#ffcdd2'; // light red
      case 'hydro':
        return '#bbdefb'; // light blue
      case 'electro':
        return '#e1bee7'; // light purple
      case 'cryo':
        return '#b2ebf2'; // light cyan
      case 'anemo':
        return '#c8e6c9'; // light green
      case 'geo':
        return '#ffe0b2'; // light orange
      case 'dendro':
        return '#dcedc8'; // another light green
      default:
        return 'transparent';
    }
    };

  const headers = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell sx={{backgroundColor: getElementColor(item?.element)}} key={index} align="right">{item?.name}</TableCell>
      )
    } },
    { name: 'Element', value: 'element',  cell: (item,index) => {
        return (
          <TableCell sx={{backgroundColor: getElementColor(item?.element)}} key={index} align="right">{item?.element}</TableCell>
        )
      }
    },
    { name: 'Actions', value: '', 
      cell: (item, index) => {
          return (
            <Fragment key={index}>
              <TableCell sx={{backgroundColor: getElementColor(item?.element)}} key={index} align="right"> <Button onClick={(e) => addCharacterPosition(item)}> Add Character</Button></TableCell>
            </Fragment>
          )
      }
    },
  ]

  return {
    headers,
  }
}
  
export default tableColumns