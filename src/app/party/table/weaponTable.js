import { TableCell, Button, IconButton, Box, CircularProgress, Stack, Chip, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import XCircleOutlineIcon from '@mui/icons-material/Cancel';
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';

const weaponTable = ({handleAddWeapon, handleRemoveWeapon}) => {
   const router = useRouter()
    const { weaponSearchContext, setWeaponSearchContext } = useUser()
      const handleRedirectWeapon = (weaponName) => {
        setWeaponSearchContext(weaponName)
        router.push(`/weapons`)
      }

  const columns = [
    { name: '', value: 'include', width: '30px', cell: (item,index) => {
      return (
        <TableCell sx={{
          width: '30px',
          pr: 0,
          backgroundColor: item?.party_weapon?.length > 0 
          ? 'rgba(165, 214, 167, 0.15)' // soft success green
          : 'transparent'
  }} key={index} align="left">
    <Box sx={{ display: 'flex'}}> <FormControlLabel sx={{ mr: 0}} control={<Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} readOnly checked={item?.character_weapon_count > 0} color="info" />}  />
    { item?.party_weapon?.length > 0 && <FormControlLabel sx={{ mr: 0}} control={<Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} checked={item?.party_weapon.include} color="info" />}  /> } </Box>
 
  </TableCell>
      )
    } },
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell sx={{
          pl: 1,
          backgroundColor: item?.party_weapon?.length > 0 
          ? 'rgba(165, 214, 167, 0.15)' // soft success green
          : 'transparent'
  }} key={index} align="left"><IconButton color='info' onClick={() => handleRedirectWeapon(item?.name)}>
  <ReplyAllOutlinedIcon sx={{ fontSize: '16px'}}/>
</IconButton>{item?.name}</TableCell>
      )
    } },
     { name: 'Perk', value: 'perk',  cell: (item,index) => {
        return (
          <TableCell  key={index} sx={{backgroundColor: item?.party_weapon?.length > 0 
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
                backgroundColor: item?.party_weapon?.length > 0 
                ? 'rgba(165, 214, 167, 0.15)' // soft success green
                : 'transparent',
  }} align="left"> 
        <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}>
           <IconButton
                hidden={item?.party_weapon?.length > 0}
                color="primary"
                onClick={() => handleAddWeapon(item)}
                aria-label="add character to position"
              >
                
               { <AddCircleOutlineIcon /> }
              </IconButton>
          <IconButton
                hidden={item?.party_weapon?.length === 0}
                color="error"
                onClick={() => handleRemoveWeapon(item)}
                aria-label="add character to position"
              >
                { <XCircleOutlineIcon /> }
              </IconButton>
              </Box>
            </TableCell>
          )
      }
    },
  ]

  return {
    columns,
  }
}
  
export default weaponTable