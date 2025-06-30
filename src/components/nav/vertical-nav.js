'use client'

import { useState, useEffect } from 'react';
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
  Collapse,
  useTheme,
} from '@mui/material';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import CompostOutlinedIcon from '@mui/icons-material/CompostOutlined';
import GroupIcon from '@mui/icons-material/Group';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';
import ArchitectureOutlinedIcon from '@mui/icons-material/ArchitectureOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import AssistantIcon from '@mui/icons-material/Assistant';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';


const drawerWidth = 240;
const collapsedWidth = 72;

const navItems = [
   {
    label: 'Character',
    href: '/characters',
    icon: <PersonIcon />
  },
  { label: 'Perk', href: '/perks', icon: <ArrowCircleUpIcon /> },
  { label: 'Artifact', href: '/artifacts', icon: <CompostOutlinedIcon /> },
  { label: 'Weapon', href: '/weapons', icon: <ConstructionOutlinedIcon /> },
  {
    label: 'Party',
    icon: <GroupIcon />,
    children: [
      { label: 'Party', href: '/dashboard', icon: <GroupsIcon  /> },
      { label: 'My Party', href: '/my-party', icon: <GroupAddIcon /> },
    ],
  },
  { label: 'Abyss', href: '/abyss', icon: <AssistantIcon /> },
  { label: 'My Artifact', href: '/my-artifact', icon: <BuildCircleIcon /> },
   
   
];

export default function VerticalNav({ collapsed, setCollapsed }) {
  const theme = useTheme();
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    const updated = {};
    navItems.forEach((item) => {
      if (item.children) {
        const activeChild = item.children.some((child) => pathname.startsWith(child.href));
        if (activeChild) {
          updated[item.label] = true;
        }
      }
    });
    setOpenGroups((prev) => ({ ...prev, ...updated }));
  }, [pathname]);

  const toggleGroup = (label) => {
    setCollapsed(!collapsed);
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

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
          background: `linear-gradient(180deg, #263b35 0%, #1b2a21 100%)`,
          borderRight: `1px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      {/* Header */}
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
              color: theme.palette.text.primary,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              textShadow: `0 0 3px ${theme.palette.primary.main}aa, 0 0 6px ${theme.palette.primary.main}66`,
            }}
          >
            Emilie
          </Typography>
        )}
        <IconButton sx={{ color: theme.palette.text.primary }} onClick={() => setCollapsed(!collapsed)} size="small">
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Navigation */}
      <List sx={{ overflow: 'hidden' }}>
        {navItems.map((item) =>
          !item.children ? (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={pathname.startsWith(item.href)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: collapsed ? 0 : 2,
                py: 1.5,
              }}
            >
              <Tooltip title={collapsed ? item.label : ''} placement="right">
                <ListItemIcon
                  sx={{
                    color: theme.palette.text.primary,
                    minWidth: 0,
                    mr: collapsed ? 0 : 2,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
              {!collapsed && <ListItemText sx={{ color: theme.palette.text.primary }} primary={item.label} />}
            </ListItemButton>
          ) : (
            <Box key={item.label}>
              <ListItemButton
                onClick={() => toggleGroup(item.label)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  px: collapsed ? 0 : 2,
                  py: 1.5,
                }}
              >
                <Tooltip title={collapsed ? item.label : ''} placement="right">
                  <ListItemIcon
                    sx={{
                      color: theme.palette.text.primary,
                      minWidth: 0,
                      mr: collapsed ? 0 : 2,
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {!collapsed && (
                  <>
                    <ListItemText sx={{ color: theme.palette.text.primary }} primary={item.label} />
                    {openGroups[item.label] ? <ExpandLess /> : <ExpandMore />}
                  </>
                )}
              </ListItemButton>

              <Collapse in={openGroups[item.label] && !collapsed} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.href}
                      component={Link}
                      href={child.href}
                      selected={pathname.startsWith(child.href)}
                      sx={{
                        pl: 4,
                        py: 1.2,
                        color: theme.palette.text.primary,
                      }}
                    >
                      <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText primary={child.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          )
        )}
      </List>
    </Drawer>
  );
}
