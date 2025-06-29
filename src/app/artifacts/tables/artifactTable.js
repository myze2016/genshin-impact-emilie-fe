import { TableCell, Button, Stack, Chip, Box, CircularProgress, Typography } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const artifactTable = ({handleOpenPerksDialog, handleRunAi}) => {

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
              <TableCell key={index} align="left"> <Button startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1}} onClick={(e) => handleOpenPerksDialog(item)} color="primary" variant="contained" size="small"> Add Perks</Button>
                                      <Button hidden={item['4set'] === 'ERROR'}  onClick={(e) => handleRunAi(item)} color="primary" variant="contained" size="small"> <Box sx={{display: 'flex',  flexDirection: 'column', // stack vertically
    alignItems: 'flex-start', // align text to the left
    }}>Run AI  <Typography variant="caption" sx={{fontSize: '8px'}}>Dolphin-Minstrel</Typography> </Box></Button>
                                      </TableCell>
 {console.log('4set', item['4set'])}
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