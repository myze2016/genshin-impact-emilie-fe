import { TableCell, Button, IconButton, Box, CircularProgress, Stack, Chip } from "@mui/material"
import { Fragment } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import XCircleOutlineIcon from '@mui/icons-material/Cancel';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const weaponTable = ({handleAddWeapon, handleRemoveWeapon}) => {
    const router = useRouter()
  const { weaponSearchContext, setWeaponSearchContext } = useUser()
    const handleRedirectWeapon = (weaponName) => {
      setWeaponSearchContext(weaponName)
      router.push(`/weapons`)
    }

  const columns = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell sx={{
          backgroundColor: item?.character_weapon?.length > 0 
          ? 'rgba(165, 214, 167, 0.15)' // soft success green
          : 'transparent'
  }} key={index} align="left"> <IconButton color='info' onClick={() => handleRedirectWeapon(item?.name)}>
                                          <ReplyAllOutlinedIcon sx={{ fontSize: '16px'}}/>
                                        </IconButton> {item?.name}</TableCell>
      )
    } },
     { name: 'Perk', value: 'perk',  cell: (item,index) => {
        return (
          <TableCell  key={index} sx={{backgroundColor: item?.character_weapon?.length > 0 
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
                backgroundColor: item?.character_weapon?.length > 0 
                ? 'rgba(165, 214, 167, 0.15)' // soft success green
                : 'transparent',
  }} align="left"> 
        <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}>
           <IconButton
                hidden={item?.character_weapon?.length > 0}
                color="primary"
                onClick={() => handleAddWeapon(item)}
                aria-label="add character to position"
              >
                
               { <AddCircleOutlineIcon /> }
              </IconButton>
          <IconButton
                hidden={item?.character_weapon?.length === 0}
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