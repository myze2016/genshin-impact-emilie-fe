import { TableCell, Button, IconButton, Box, Stack, Chip, Typography } from "@mui/material"
import { Fragment, useState, useEffect } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const characterTable = ({handleViewParty}) => {
    const [stealth, setStealth] = useState('')
    const { user, partyContextId, setPartyContextId } = useUser()
      const router = useRouter()

         const handleRedirectParty = (e, id) => {
    setPartyContextId(id)
    router.push('/party');
  }

  useEffect(() => {
    const isStealth = localStorage.getItem('stealth') === 'true';
    if (isStealth) {
      setStealth(isStealth);
    }
  }, []);

  const columns = [
    { name: 'Element', value: 'element', width: '80px',  cell: (item,index) => {
        return (
            <TableCell  sx={{textAlign: 'center'}} key={index}><Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} ><img src={stealth ? 'https://genshin.jmp.blue/characters/tighnari/gacha-splash.png' : item?.character?.icon_url} alt={item?.character?.name}  style={{ width: 40, height: 40 }}/> </Box></TableCell>
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
                                      sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}}  onClick={(e) => handleRedirectParty(e,item?.party_position?.party.id)}  variant="contained" size="small"> View Party</Button>
                 
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