import { TableCell, Button } from "@mui/material"
import { Fragment } from "react"

const tableColumns = () => {
  const headers = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell key={index} align="right">{item?.name}</TableCell>
      )
    } },
    { name: 'Description', value: 'description',  cell: (item,index) => {
        return (
          <TableCell key={index} align="right">{item?.description}</TableCell>
        )
      }
    },
    { name: 'Actions', value: '', 
      cell: (item, index) => {
          return (
            <Fragment key={index}>
             
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