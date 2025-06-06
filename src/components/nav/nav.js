'use client'

import { AppBar, Toolbar, Typography, Button, Box, Container, useTheme } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Link from 'next/link'

export default function Nav() {
  const theme = useTheme()

  const navItems = [
    { label: 'Home', href: '/dashboard', icon: <HomeIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} /> },
    { label: 'Character', href: '/characters', icon: <PersonIcon/> },
    { label: 'Perk', href: '/perks', icon: <ArrowCircleUpIcon/> },
  ]

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: `linear-gradient(90deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        fontFamily: theme.typography.fontFamily,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
       <Toolbar
  disableGutters
  sx={{
    py: 0,
    justifyContent: 'space-between',
    background: `
      linear-gradient(
        to right,
        ${theme.palette.background.paper} 0%,
        ${theme.palette.background.default} 40%,
        ${theme.palette.primary.main}22 100%
      ),
      linear-gradient(
        to bottom,
        ${theme.palette.background.paper} 0%,
        ${theme.palette.background.default} 100%
      )
    `,
    
         boxShadow: `inset 0 -4px 6px -2px ${theme.palette.primary.main}55`,
  }}
>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
  {/* Image wrapper with gradient overlay */}
  <Box
  sx={{
    width: 240,
    height: 80,
    position: 'relative',
    overflow: 'hidden',
    borderTopRightRadius: '24px',
    borderBottomRightRadius: '24px',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }}
>
  {/* Image */}
 
   <Box
    component="img"
    src="https://genshin.jmp.blue/characters/emilie/gacha-card.png"
    alt="Emilie"
    sx={{
      width: '100%',
      height: 'auto',
      transform: 'scale(1.1)',
      transformOrigin: '20% 315%',
      display: 'block',
    }}
  />

  {/* Gradient to hide edges */}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      pointerEvents: 'none',
    }}
  />

 
</Box>
  {/* Title */}
  <Typography
    variant="h5"
    sx={{
      fontWeight: 700,
      color: theme.palette.primary.main,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      textShadow: `
        0 0 3px ${theme.palette.primary.main}aa,
        0 0 6px ${theme.palette.primary.main}66
      `,
      userSelect: 'none',
      fontStyle: 'normal',
    }}
  >
    Emilie
  </Typography>
</Box>
          <Box sx={{ display: 'flex', gap: 2.5, mr: 2 }}>
            {navItems.map((item) => (
              <Button
                startIcon={item.icon}
                key={item.href}
                component={Link}
                href={item.href}
                sx={{
                  color: theme.palette.text.primary,
                  textTransform: 'uppercase',
                 '& .MuiButton-startIcon': {  mr: 0.7, },
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  borderBottom: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  px: 1.2,
                  py: 0.4,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    filter: 'drop-shadow(0 0 3px rgba(129, 199, 132, 0.6))',
                    backgroundColor: 'transparent',
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: '2px',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
    </AppBar>
  )
}
