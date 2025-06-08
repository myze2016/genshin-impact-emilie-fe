import { TableCell, Button, IconButton, Box, Stack, Chip } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const characterTable = ({handleClickAddCharacterPosition}) => {

  const columns = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell key={index} align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Element', value: 'element',  cell: (item,index) => {
        return (
            <TableCell  sx={{minWidth: '100px', textAlign: 'center'}} key={index}><Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} ><img src={item?.element?.image_url} alt={item?.element?.name}  style={{ width: 40, height: 40 }}/> </Box></TableCell>
        )
      }
    },
      { name: 'Perk', value: 'perk',  cell: (item,index) => {
        return (
          <TableCell  key={index} sx={{width: '50%'}} align="left"> <Stack direction="row"
                                spacing={1}
                                sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                {item?.perks?.map((perk, index) => (
                                        <Chip
                                        key={index}
                                        label={perk?.perk?.name}
                                        color="primary"
                                        variant={ "contained" }
                                        style={{ fontSize: '16px' }}
                                        />
                                    ))
                                }
                            </Stack></TableCell>
        )
      }
    },
    { name: 'Actions', value: '', 
      cell: (item, index) => {
          return (
            <Fragment key={index}>
             
              <TableCell key={index} align="left">  
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