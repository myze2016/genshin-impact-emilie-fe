import { Fragment } from 'react'
import { Box, Avatar, Typography, useTheme, Stack } from '@mui/material'

export const CustomToast = ({ title, msg, icon, color }) => {
    const theme = useTheme()

    return (
        <Box
        sx={{
          p: 2,
          width: '100%',
          bgcolor: '#1e2d24', // Darker, richer background
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)', // Softer shadow
          border: '1px solid #2e473a', // Adds visual definition
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Avatar
            sx={{
              bgcolor: color || '#4da58d',
              width: 32,
              height: 32,
              boxShadow: '0 0 0 2px #1e2d24', // subtle halo effect
            }}
          >
            {icon || <Coffee size={18} />}
          </Avatar>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: '#d4ffe5',
              fontSize: '0.95rem',
            }}
          >
            {title}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{
            color: '#9fc8b4',
            fontSize: '0.85rem',
            lineHeight: 1.4,
          }}
        >
          {msg}
        </Typography>
      </Box>
    )
}
