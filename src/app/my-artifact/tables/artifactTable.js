import { TableCell, Button, Stack, Chip, Box, CircularProgress } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';


const artifactTable = ({handleOpenPerksDialog}) => {

  const columns = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell key={index}  align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Perk', value: 'perk',  cell: (item,index) => {
      return (
        <TableCell  key={index} sx={{width: '50%'}} align="left"> <Stack direction="row"
                              sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                              {item?.perks?.map((perk, index) => (
                                      <Chip
                                      key={index}
                                      label={perk?.perk?.name}
                                      color="primary"
                                      variant={ "contained" }
                                      sx={{ fontSize: '16px', mr: 1 }}
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
              <TableCell key={index} align="left"> <Button color="info" startIcon={<SearchIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} onClick={(e) => handleOpenPerksDialog(item)} variant="contained" size="small"> View Characters</Button></TableCell>
            </Fragment>
          )
      }
    },
  ]

  return {
    columns,
  }
}
  
export default artifactTable