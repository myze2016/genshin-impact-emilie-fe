'use client'

import { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Tooltip,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Link from 'next/link';

const drawerWidth = 240;
const collapsedWidth = 72;

export default function VerticalNav({collapsed,setCollapsed}) {
  const theme = useTheme();


  const navItems = [
    { label: 'Home', href: '/dashboard', icon: <HomeIcon /> },
    { label: 'Character', href: '/characters', icon: <PersonIcon /> },
    { label: 'Perk', href: '/perks', icon: <ArrowCircleUpIcon /> },
    { label: 'Artifact', href: '/artifacts', icon: <PersonIcon /> },
    { label: 'Weapon', href: '/weapons', icon: <ArrowCircleUpIcon /> },
  ];

  return (
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: collapsed ? collapsedWidth : drawerWidth,
            transition: 'width 0.3s',
            boxSizing: 'border-box',
            background: `linear-gradient(180deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
            borderRight: `1px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        {/* Top header/logo */}
        <Box
          sx={{
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            px: 2,
          }}
        >
          {!collapsed && (
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                textShadow: `0 0 3px ${theme.palette.primary.main}aa, 0 0 6px ${theme.palette.primary.main}66`,
              }}
            >
              Emilie
            </Typography>
          )}
          <IconButton onClick={() => setCollapsed(!collapsed)} size="small">
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Nav Items */}
        <List sx={{overflow: 'hidden'}}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
            >
              <Tooltip title={collapsed ? item.label : ''} placement="right">
                <ListItemIcon
                  sx={{ minWidth: 0, mr: collapsed ? 0 : 2, justifyContent: 'center' }}
                >
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
        </List>
      </Drawer>
  );
}