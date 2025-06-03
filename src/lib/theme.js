// lib/theme.js
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark', // or 'light'
    primary: {
      main: '#81c784', // soft green (Dendro-inspired)
    },
    secondary: {
      main: '#d1c4e9', // lavender/gold accent
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