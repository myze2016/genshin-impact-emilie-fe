import { TableCell, Button } from "@mui/material"
import { Fragment } from "react"

const tableColumnPerks = ({handleAddCharacterPerk, removeCharacterPerk}) => {
  const headers = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell sx={{
    backgroundColor: item?.character_perks?.length > 0 ? 'lightgreen' : 'transparent'
  }} key={index} align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Description', value: 'description',  cell: (item,index) => {
        return (
          <TableCell sx={{
    backgroundColor: item?.character_perks?.length > 0 ? 'lightgreen' : 'transparent'
  }} key={index} align="left">{item?.description}</TableCell>
        )
      }
    },
    { name: 'Actions', value: '', 
      cell: (item, index) => {
          return (
            <Fragment key={index}>
              <TableCell  sx={{
    backgroundColor: item?.character_perks?.length > 0 ? 'lightgreen' : 'transparent'
  }} key={index} align="left"> <Button onClick={(e)=>handleAddCharacterPerk(item)}> Add Perk</Button><Button onClick={(e)=>removeCharacterPerk(item)}> Remove Perk</Button></TableCell>
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