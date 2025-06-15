import { TableCell, Button, IconButton, Box, Stack, Chip, Typography } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

const characterTable = ({handleViewParty}) => {

  const columns = [
    { name: 'Element', value: 'element', width: '80px',  cell: (item,index) => {
        return (
            <TableCell  sx={{textAlign: 'center'}} key={index}><Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} ><img src={item?.character?.icon_url} alt={item?.character?.name}  style={{ width: 40, height: 40 }}/> </Box></TableCell>
        )
      }
    },
       { name: 'Party', value: 'party', cell: (item,index) => {
      return (
        <TableCell key={index} align="left"> <Typography color="secondary">
    {item?.party_position?.party?.name}
  </Typography></TableCell>
      )
    } },
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell key={index} align="left">{item?.character?.name}</TableCell>
      )
    } },
    { name: 'Position', value: 'position', cell: (item,index) => {
      return (
        <TableCell key={index} align="left"><Typography color="error">{item?.party_position?.name}</Typography></TableCell>
      )
    } },
     { name: 'Weapon', value: 'weapon', cell: (item,index) => {
      return (
        <TableCell key={index} align="left">{item?.party_weapon ? item?.party_weapon[0]?.weapon?.name : '-----'}</TableCell>
      )
    } },
     
    { name: 'Actions', value: '', 
      cell: (item, index) => {
          return (
            <Fragment key={index}>
             
              <TableCell key={index} align="left">  
                <Button color="info" startIcon={<ReplyAllIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}}  href={`/party/${item?.party_position?.party.id}`} variant="contained" size="small"> View Party</Button>
                 
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