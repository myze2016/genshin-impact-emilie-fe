// lib/theme.js
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: '#81c784', 
    },
    secondary: {
      main: '#d1c4e9', 
    },
     error: {
      main: '#b85c38',    
      contrastText: '#f0e6d2', 
    },
    background: {
      default: '#1b2a21',
      paper: '#233528',
    },
    text: {
      primary: '#e0ffe6',
      secondary: '#a9cbb3',
    },
  },
  typography: {
    fontFamily: `'Cinzel', serif`,
  },
})

export default theme