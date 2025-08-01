import { TableCell, Button, IconButton, Box, Stack, Chip } from "@mui/material"
import { Fragment, useState, useEffect } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const characterTable = ({handleClickAddCharacterPosition}) => {
  const [stealth, setStealth] = useState('')
  useEffect(() => {
    const isStealth = localStorage.getItem('stealth') === 'true';
    if (isStealth) {
      setStealth(isStealth);
    }
  }, []);

  const columns = [
    { name: 'Element', value: 'element', width: '80px',  cell: (item,index) => {
        return (
            <TableCell  sx={{textAlign: 'center'}} key={index}><Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} ><img src={stealth ? 'https://genshin.jmp.blue/characters/tighnari/gacha-splash.png' : item?.element?.image_url} alt={item?.element?.name}  style={{ width: 40, height: 40 }}/> </Box></TableCell>
        )
      }
    },
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell key={index} align="left">{item?.name}</TableCell>
      )
    } },
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
                                {item?.artifacts?.map((artifact, index) => (
                                        artifact.artifact?.perks?.map((perk, index) => (
                                          <Chip
                                          key={index}
                                          label={perk?.perk?.name}
                                          color="info"
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