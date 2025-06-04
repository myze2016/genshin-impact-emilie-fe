import { TableCell, Button, Stack, Chip } from "@mui/material"
import { Fragment } from "react"

const tableColumns = ({handleOpenViewCharacterPerks}) => {

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

  const headers = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell   key={index} align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Element', value: 'element',  cell: (item,index) => {
        return (
          <TableCell key={index} align="left">{item?.element}</TableCell>
        )
      }
    },
     { name: 'Perk', value: 'perk',  cell: (item,index) => {
        return (
          <TableCell key={index} align="left"> <Stack direction="row"
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
              <TableCell  key={index} align="left"> <Button onClick={(e) => handleOpenViewCharacterPerks(item)} color="primary" variant="contained" size="small"> Add Perks</Button></TableCell>
            </Fragment>
          )
      }
    },
  ]

  return {
    headers,
  }
}
  
export default tableColumns