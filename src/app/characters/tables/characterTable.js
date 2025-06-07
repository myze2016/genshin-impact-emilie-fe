import { TableCell, Button, Stack, Chip, Box, CircularProgress } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const characterTable = ({openAddCharacterPerksDialog}) => {

  const getElementColor = (element) => {
    switch (element?.toLowerCase()) {
      case 'pyro':
        return '#8b3a2f'; // darker red-brown
      case 'hydro':
        return '#336b87'; // dark teal-blue
      case 'electro':
        return '#5e4b8b'; // dark violet
      case 'cryo':
        return '#4a707a'; // cool dark cyan
      case 'anemo':
        return '#3a5f4f'; // dark muted green
      case 'geo':
        return '#7a6652'; // earthy brown
      case 'dendro':
        return '#486b45'; // dark forest green
      default:
        return 'transparent';
    }
    };

  const columns = [
     { name: ' ', value: 'icon_side_url', cell: (item,index) => {
      return (
        <TableCell  sx={{paddingRight: 0, minWidth: '80px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}} key={index}><img src={item?.icon_side_url} alt={item?.name} style={{ width: 50, height: 57, display: 'block' }}/> </TableCell>
      )
    } },
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell sx={{width: '15%'}}  key={index} align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Element', value: 'element',  cell: (item,index) => {
        return (
          <TableCell sx={{width: '10%'}}   key={index} align="left">{item?.element}</TableCell>
        )
      }
    },
     { name: 'Perk', value: 'perk',  cell: (item,index) => {
        return (
          <TableCell sx={{width: '50%'}}  key={index} align="left"> <Stack direction="row"
                                spacing={1}
                                sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                {item?.perks?.map((perk, index) => (
                                        <Chip
                                        key={index}
                                        label={perk?.perk?.name}
                                        color="primary"
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
            <Fragment key={index}>
              <TableCell sx={{width: '20%'}} key={index} align="left"> <Button startIcon={<AddCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} onClick={(e) => openAddCharacterPerksDialog(item)} color="primary" variant="contained" size="small"> Add Perks</Button></TableCell>
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