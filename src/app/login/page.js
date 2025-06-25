'use client'

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Divider,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { useRouter } from 'next/navigation'
import { login } from '@/hooks/useAuth'
import { useUser } from '@/context/UserContext'

export default function EmilieLogin() {
  const router = useRouter()
  const { refetch } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const response = await login(formData)
    if (response?.data?.token) {
      localStorage.setItem('token', response?.data?.token)
      refetch()
      router.push('/dashboard')
    } 
    // TODO: Add actual auth logic
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          borderRadius: 4,
          width: '100%',
          maxWidth: 420,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'primary.main',
          boxShadow: '0 0 24px rgba(129,199,132,0.2)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            fontFamily: 'inherit',
            textAlign: 'center',
            mb: 2,
          }}
        >
          Apothecary Login
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            mb: 3,
          }}
        >
          Crafted with care, distilled with purpose.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              InputProps={{
                style: { color: '#e0ffe6' },
              }}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              InputProps={{
                style: { color: '#e0ffe6' },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              endIcon={<LoginIcon />}
              sx={{
                fontWeight: 'bold',
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Log In
            </Button>
          </Stack>
        </Box>

        <Button
          onClick={() => router.push('/register')}
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<PersonAddAltIcon />}
          sx={{
            mt: 3,
            fontWeight: 'bold',
            borderRadius: 2,
            borderColor: 'secondary.main',
            color: 'secondary.main',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(209,196,233,0.08)',
              borderColor: 'secondary.light',
            },
          }}
        >
          Create an Account
        </Button>

        <Divider sx={{ my: 4, borderColor: 'primary.main' }} />

        <Typography
          variant="caption"
          sx={{ textAlign: 'center', display: 'block', color: 'text.secondary' }}
        >
          ⊹ Brewed in the style of Emilie ⊹
        </Typography>
      </Paper>
    </Box>
  )
}