import { TableCell } from "@mui/material"
const TableColumnsPerks = () => {
  const columns = [
    { name: 'Name', value: 'name', cell: (item,index) => {
      return (
        <TableCell key={index} align="left">{item?.name}</TableCell>
      )
    } },
    { name: 'Description', value: 'description',  cell: (item,index) => {
        return (
          <TableCell key={index} align="left">{item?.description}</TableCell>
        )
      }
    },
  ]

  return {
    columns,
  }
}
  
export default TableColumnsPerks