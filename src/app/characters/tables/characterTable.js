import { TableCell, Button, Stack, Chip, Box, CircularProgress } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import CompostOutlinedIcon from '@mui/icons-material/CompostOutlined';


const characterTable = ({openAddCharacterPerksDialog, handleOpenWeaponDialog, handlOpenArtifactDialog}) => {

  const columns = [
     { name: ' ', value: 'icon_side_url', width: '100px', cell: (item,index) => {
      return (
        <TableCell  sx={{minWidth: '100px', textAlign: 'center'}} key={index}><Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}} ><img src={item?.icon_side_url} alt={item?.name} style={{ width: 50, height: 57 }}/> </Box></TableCell>
      )
    } },
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell key={index}  align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Element', value: 'element',  cell: (item,index) => {
        return (
             <TableCell sx={{width: '10%'}}   key={index} align="left">{item?.element?.name}</TableCell>
        )
      }
    },
    { name: 'Weapon', value: 'weapon',  cell: (item,index) => {
        return (
             <TableCell sx={{width: '10%'}}   key={index} align="left">{item?.weapon_type?.name}</TableCell>
        )
      }
    },
     { name: 'Perk', value: 'perk',  cell: (item,index) => {
        return (
          <TableCell  key={index} sx={{width: '50%'}} align="left"> <Stack direction="row"
                                sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                  {item?.weapons?.map((weapon, index) => (
                                        weapon.weapon?.perks?.map((perk, index) => (
                                          <Chip
                                          key={index}
                                          label={perk?.perk?.name}
                                          color="secondary"
                                          variant={ "contained" }
                                          sx={{ fontSize: '16px', mr: 1 }}
                                          />
                                        ))
                                    ))
                                }
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
              <TableCell key={index} align="left"> <Button startIcon={<ArrowCircleUpIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mt: 1}} onClick={(e) => openAddCharacterPerksDialog(item)} color="primary" variant="contained" size="small"> Add Perks</Button>
                                      <Button startIcon={<ConstructionOutlinedIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mt: 1}} onClick={(e) => handleOpenWeaponDialog(item)} color="error" variant="contained" size="small"> Add Weapons</Button>
                                      <Button startIcon={<CompostOutlinedIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }, mr: 1, mt: 1}} onClick={(e) => handlOpenArtifactDialog(item)} color="info" variant="contained" size="small"> Add Artifacts</Button></TableCell>
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