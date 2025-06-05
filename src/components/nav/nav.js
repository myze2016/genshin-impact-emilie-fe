'use client'

import { AppBar, Toolbar, Typography, Button, Box, Container, useTheme } from '@mui/material'
import Link from 'next/link'

export default function Nav() {
  const theme = useTheme()

  const navItems = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Character', href: '/character' },
    { label: 'Perk', href: '/perk' },
  ]

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: `linear-gradient(90deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        fontFamily: theme.typography.fontFamily,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1.25, justifyContent: 'space-between' }}>
       
          <Box
            sx={{
              backgroundImage: `url(https://genshin.jmp.blue/characters/sucrose/gacha-splash.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'top', // or 'center right'
              height: 'auto',
              width: 80,
            }}
          />

          <Typography
            variant="h5"
            sx={{
              ml: 2,
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
          <Box sx={{ display: 'flex', gap: 2.5, mr: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                sx={{
                  color: theme.palette.text.primary,
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  borderBottom: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  px: 1.2,
                  py: 0.4,
                  '&:hover': {
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
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
      </Container>
    </AppBar>
  )
}
