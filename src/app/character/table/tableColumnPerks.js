import { TableCell, Button } from "@mui/material"
import { Fragment } from "react"

const tableColumnPerks = ({handleAddCharacterPerk}) => {
  const headers = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell sx={{
    backgroundColor: item?.character_perks?.length > 0 ? 'lightgreen' : 'transparent'
  }} key={index} align="right">{item?.name}</TableCell>
      )
    } },
    { name: 'Description', value: 'description',  cell: (item,index) => {
        return (
          <TableCell sx={{
    backgroundColor: item?.character_perks?.length > 0 ? 'lightgreen' : 'transparent'
  }} key={index} align="right">{item?.description}</TableCell>
        )
      }
    },
    { name: 'Actions', value: '', 
      cell: (item, index) => {
          return (
            <Fragment key={index}>
              <TableCell  sx={{
    backgroundColor: item?.character_perks?.length > 0 ? 'lightgreen' : 'transparent'
  }} key={index} align="right"> <Button onClick={(e)=>handleAddCharacterPerk(item)}> Add Perks</Button></TableCell>
            </Fragment>
          )
      }
    },
  ]

  return {
    headers,
  }
}
  
export default tableColumnPerks