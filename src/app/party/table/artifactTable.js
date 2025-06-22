import { TableCell, Button, IconButton, Box, CircularProgress, Stack, Chip, Collapse, Table, TableBody, TableHead, TableRow, Grid, Typography } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import XCircleOutlineIcon from '@mui/icons-material/Cancel';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const artifactTable = ({handleAddArtifact, handleRemoveArtifact, handleOpenStat, openRowsArtifact, toggleRowArtifact,handleOpenPiece }) => {
  const columns = [
{ name: '', value: 'collapse', cell: (item,index,rowIndex) => {
      return (
        <TableCell sx={{
          backgroundColor: item?.party_artifact?.length > 0 
          ? 'rgba(165, 214, 167, 0.15)' // soft success green
          : 'transparent'
  }} key={index} align="left">
                                            <IconButton onClick={() => toggleRowArtifact(rowIndex)}>
                                                {openRowsArtifact[rowIndex] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
                              item?.party_artifact?.length > 0 && <IconButton 
          hidden={true}
                color="info"
                onClick={(e) => handleOpenStat(item)}
                aria-label="add character to position"
              >
                { <AddCircleOutlineIcon /> }
              </IconButton> }
               <IconButton
          hidden={item?.party_artifact?.length == 0 }
                color="primary"
                onClick={() => handleOpenPiece(item)}
                aria-label="add character to position"
              >
                { <ArrowCircleUpIcon /> }
              </IconButton>
              </Box>
            </TableCell>
          )
      }
    },
  ]

//   const collapses = [
//   {
//     name: '',
//     value: 'collapse',
//     cell: (item, index, rowIndex) => {

//       return (
//         <Fragment key={index}>
//         <TableCell  sx={{ padding: 0 }} colSpan={4}>
//           <Collapse in={openRowsArtifact[rowIndex]} timeout="auto" unmountOnExit>
//             <Table size="small">
//                <TableHead>
//                 <TableRow>
//                   <TableCell></TableCell>
//                   <TableCell>Sands</TableCell>
//                   <TableCell>Goblet</TableCell>
//                   <TableCell>Circlet</TableCell>
//                   <TableCell>Substats</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {item?.party_artifact[0]?.stat_line?.map((line, statlineIndex) => (
//                   <TableRow key={statlineIndex}>
//                     <TableCell></TableCell>
//                     <TableCell>{line.sands_stat?.name}</TableCell>
//                     <TableCell>{line.goblet_stat?.name}</TableCell>
//                     <TableCell>{line.circlet_stat?.name}</TableCell>
//                     <TableCell>
//                       {line.sub_stat?.map(s => s.stat?.name).join(', ')}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Collapse>
//         </TableCell>
//         </Fragment>
//       );
//     }
//   }
// ];

  const collapses = [
  {
    name: '',
    value: 'collapse',
    cell: (item, index, rowIndex) => {

      return (
        <Fragment key={index}>
        <TableCell  sx={{ padding: 0 }} colSpan={4}>
          <Collapse in={openRowsArtifact[rowIndex]} timeout="auto" unmountOnExit>
           <Grid container spacing={2} sx={{ p: 1}}>
              {(() => {
                const pieces = item?.party_artifact[0]?.party_artifact_piece || [];

    // Group pieces by type
                const grouped = pieces.reduce((acc, piece) => {
                  const type = piece?.type || 'substat';
                  if (!acc[type]) acc[type] = [];
                  acc[type].push(piece);
                  return acc;
                }, {});

                const types = ['sands', 'goblet', 'circlet', 'substat']; // fixed order
                console.log('grouped', grouped)
                return types.map((type) => (
                  grouped[type]?.length > 0 && (
                    <Grid sx={{
    border: '1px solid',
    borderColor: 'secondary.main',
    borderRadius: 2,
    p: 1.5
  }} key={type} item size={3} md={3} lg={3}>
                      <Grid container >
                        <Grid sx={{ mb: '5px'}} key={type} item size={12} md={12} lg={12}>
                          <Typography sx={{ textTransform: 'capitalize' }}>{type}</Typography>
                        </Grid>
                        {grouped[type].map((piece, index) => (
                            <Chip
                            size="small"
                              color="primary"
                              key={index}
                              label={piece?.stat?.name}
                              sx={{ fontSize: '14px', mr: '5px' }}
                              variant="contained"
                            />
                        ))}
                      </Grid>
                    </Grid>
                  )
                ));
              })()}
            </Grid>
          </Collapse>
        </TableCell>
        </Fragment>
      );
    }
  }
];


  return {
    columns,
    collapses
  }
}
  
export default artifactTable
