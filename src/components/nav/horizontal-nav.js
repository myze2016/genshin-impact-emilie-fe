'use client'

import { AppBar, Toolbar, Typography, Button, Box, Container, useTheme, Tooltip, IconButton, Avatar, Menu, MenuItem } from '@mui/material'
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Link from 'next/link'
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import CompostOutlinedIcon from '@mui/icons-material/CompostOutlined';
import { getUser, logout } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';
import AssistantIcon from '@mui/icons-material/Assistant';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
export default function Nav() {
    const { user } = useUser()
    const router = useRouter()
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const navItems = [
    { label: 'Home', href: '/dashboard', icon: <HomeIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} /> },
     { label: 'My Party', href: '/my-party', icon: <GroupAddIcon /> },
     { label: 'Abyss', href: '/abyss', icon: <AssistantIcon /> },
  { label: 'My Artifact', href: '/my-artifact', icon: <BuildCircleIcon /> },
  ]

  const handleLogout = async (e) => {
    const response = await logout('') // Assuming this logs the user out

    localStorage.removeItem('token')
    router.push('/login') // ✅ Redirect to /login
    

  }

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
            {!false && true && (
    <>
     <Tooltip title="Account settings" arrow>
  <IconButton
    onClick={handleMenuOpen}
    sx={{
      ml: 1,
      p: 0.5,
      bgcolor: 'background.paper',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      '&:hover': {
        bgcolor: 'primary.main',
        transform: 'scale(1.05)',
        boxShadow: '0 0 10px rgba(129, 199, 132, 0.4)',
      },
    }}
    size="small"
  >
    <Avatar
      sx={{
        width: 40,
        height: 40,
        bgcolor: 'primary.main',
        color: 'background.default',
        fontFamily: 'Cinzel, serif',
        fontWeight: 700,
        fontSize: '1.15rem',
        boxShadow: '0 2px 12px rgba(129, 199, 132, 0.5)',
      }}
    >
      {user?.name?.charAt(0).toUpperCase() || 'U'}
    </Avatar>
  </IconButton>
</Tooltip>

<Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleMenuClose}
  onClick={handleMenuClose}
  PaperProps={{
    elevation: 10,
    sx: {
      mt: 1.8,
      minWidth: 220,
      px: 1,
      py: 1,
      borderRadius: 3,
      bgcolor: 'background.paper',
      color: 'text.primary',
      fontFamily: 'Cinzel, serif',
      boxShadow: '0 12px 36px rgba(0,0,0,0.45)',
      '& .MuiAvatar-root': {
        width: 28,
        height: 28,
        fontSize: '0.9rem',
        bgcolor: 'primary.main',
        color: 'background.default',
        fontWeight: 600,
      },
      '& .MuiMenuItem-root': {
        borderRadius: 2,
        py: 1.2,
        px: 2,
        fontWeight: 500,
        transition: 'background 0.25s ease, transform 0.2s ease',
        '&:hover': {
          bgcolor: 'primary.main',
          color: 'background.default',
          transform: 'scale(1.02)',
          boxShadow: '0 3px 14px rgba(129, 199, 132, 0.4)',
        },
      },
    },
  }}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
>
  <MenuItem disabled sx={{ color: 'text.primary' }}>
    <Avatar sx={{ mr: 1 }} /> {user?.name}
  </MenuItem>
  <MenuItem onClick={handleLogout}>Logout</MenuItem>
</Menu>
    </>
  )}
          </Box>
        </Toolbar>
    </AppBar>
  )
}
