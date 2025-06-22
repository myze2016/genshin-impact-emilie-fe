import { TableCell, Button, IconButton, Box, CircularProgress, Stack, Chip, Collapse } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import XCircleOutlineIcon from '@mui/icons-material/Cancel';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const artifactTable = ({handleAddArtifact, handleRemoveArtifact, handleOpenStat, openRowsArtifact, toggleRowArtifact}) => {
  const columns = [
{ name: '', value: 'collapse', cell: (item,index,rowIndex) => {
      return (
        <TableCell sx={{
          backgroundColor: item?.party_artifact?.length > 0 
          ? 'rgba(165, 214, 167, 0.15)' // soft success green
          : 'transparent'
  }} key={index} align="left">
                                            <IconButton onClick={() => toggleRowArtifact(rowIndex)}>
                                                {openRowsArtifact[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </IconButton></TableCell>
      )
    } },
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell sx={{
          backgroundColor: item?.party_artifact?.length > 0 
          ? 'rgba(165, 214, 167, 0.15)' // soft success green
          : 'transparent'
  }} key={index} align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Perk', value: 'perk',  cell: (item,index) => {
        return (
          <TableCell  key={index} sx={{backgroundColor: item?.party_artifact?.length > 0 
                ? 'rgba(165, 214, 167, 0.15)' // soft success green
                : 'transparent', width: '50%'}} align="left"> <Stack direction="row"
                                sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                {item?.perks?.map((perk, index) => (
                                        <Chip
                                        key={index}
                                        label={perk?.perk?.name}
                                        color="primary"
                                        sx={{ fontSize: '16px', mr: 1 }}
                                        variant={ "contained" }
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
              <TableCell key={index} sx={{
                backgroundColor: item?.party_artifact?.length > 0 
                ? 'rgba(165, 214, 167, 0.15)' // soft success green
                : 'transparent',
  }} align="left"> 
        <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}>
           <IconButton
                hidden={item?.party_artifact?.length > 0 }
                color="primary"
                onClick={() => handleAddArtifact(item)}
                aria-label="add character to position"
              >
                
               { <AddCircleOutlineIcon /> }
              </IconButton>
          <IconButton
          hidden={item?.party_artifact?.length == 0 }
                color="error"
                onClick={() => handleRemoveArtifact(item)}
                aria-label="add character to position"
              >
                { <XCircleOutlineIcon /> }
              </IconButton>
                            {
                              item?.party_artifact?.length > 0 && <Button  startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} onClick={(e) => handleOpenStat(item)} size="small" variant="contained">Add Stat</Button>
                            } 
              </Box>
            </TableCell>
          )
      }
    },
  ]

  const collapses = [
{ name: '', value: 'collapse', cell: (item,index,rowIndex) => {
      return (
        <TableCell key={index} sx={{padding: 0}}>
                                                  <Collapse in={openRowsArtifact[rowIndex]}>
                                                <Box sx={{padding: 2}}>
                                                    
                                                </Box>
                                                </Collapse>
                                            </TableCell>
      )
    } },
    { name: 'Sands', value: 'sands', cell: (item,index,rowIndex) => {
      return (
          <TableCell key={index} sx={{padding: 0}}>
                                                  <Collapse in={openRowsArtifact[rowIndex]}>
                                              <Box sx={{padding: 2}}>
                                                    Sands
                                                </Box>
                                                </Collapse>
                                            </TableCell>
      )
    } },
    { name: 'Goblet', value: 'goblet',  cell: (item,index,rowIndex) => {
        return (
            <TableCell key={index} sx={{padding: 0}}>
                                                  <Collapse in={openRowsArtifact[rowIndex]}>
                                               <Box sx={{padding: 2}}>
                                                    Goblet
                                                </Box>
                                                </Collapse>
                                            </TableCell>
        )
      }
    },
     { name: 'Circlet', value: 'circlet',  cell: (item,index,rowIndex) => {
        return (
            <TableCell key={index} sx={{padding: 0}}>
                                                  <Collapse in={openRowsArtifact[rowIndex]}>
                                               <Box sx={{padding: 2}}>
                                                    Circlet
                                                </Box>
                                                </Collapse>
                                            </TableCell>
        )
      }
    },
      { name: 'Substat', value: 'substat',  cell: (item,index,rowIndex) => {
        return (
            <TableCell key={index} sx={{padding: 0}}>
                                                  <Collapse in={openRowsArtifact[rowIndex]}>
                                               <Box sx={{padding: 2}}>
                                                    Substat
                                                </Box>
                                                </Collapse>
                                            </TableCell>
        )
      }
    },
    
  ]

  return {
    columns,
    collapses
  }
}
  
export default artifactTable
