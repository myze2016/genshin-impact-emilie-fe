import { TableCell, Button } from "@mui/material"
import { Fragment } from "react"

const tableColumns = ({handleOpenViewCharacterPerks}) => {
  const headers = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell key={index} align="right">{item?.name}</TableCell>
      )
    } },
    { name: 'Element', value: 'element',  cell: (item,index) => {
        return (
          <TableCell key={index} align="right">{item?.element}</TableCell>
        )
      }
    },
    { name: 'Actions', value: '', 
      cell: (item, index) => {
          return (
            <Fragment key={index}>
              <TableCell key={index} align="right"> <Button onClick={handleOpenViewCharacterPerks}> Add Perks</Button></TableCell>
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