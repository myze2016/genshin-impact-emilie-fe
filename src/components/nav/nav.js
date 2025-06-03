'use client'

import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import Link from 'next/link'

export default function Nav() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Party', href: '/party' },
    { label: 'Character', href: '/character' },
    { label: 'Perk', href: '/perk' },
  ]

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(90deg, #2f4034, #45694a)',
        fontFamily: `'Cinzel', serif`,
        borderBottom: '2px solid #c0e6ca',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1, justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            sx={{
              ml: 2,
              fontWeight: 600,
              color: '#d3ffe5',
              letterSpacing: '0.08em',
              textShadow: '1px 1px 6px #1e2f23',
            }}
          >
            Emilie
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                sx={{
                  color: '#e3ffe9',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderBottom: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderBottom: '2px solid #a3e4b5',
                    color: '#ffffff',
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