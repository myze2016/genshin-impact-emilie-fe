// lib/theme.js
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#81c784', // Soft green
    },
    secondary: {
      main: '#d1c4e9', // Pale lavender
    },
    error: {
      main: '#b85c38', // Burnt sienna (vintage apothecary bottle vibe)
      contrastText: '#f0e6d2', // Soft parchment white
    },
    success: {
      main: '#a5d6a7', // Light lush green, very Emilie
      contrastText: '#1b2a21', // Background tone for readability
    },
    info: {
      main: '#7bb6c3', // Muted teal blue (cool, balanced)
      contrastText: '#1b2a21',
    },
    warning: {
      main: '#d4a373', // Warm vintage amber
      contrastText: '#1b2a21',
    },
    background: {
      default: '#1b2a21', // Deep forest green
      paper: '#233528', // Darker leaf tone
    },
    text: {
      primary: '#e0ffe6', // Pale mint
      secondary: '#a9cbb3', // Soft sage
    },
  },
  typography: {
    fontFamily: `'Cinzel', serif`, // Fits Emilie’s refined aesthetic
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})

export default theme