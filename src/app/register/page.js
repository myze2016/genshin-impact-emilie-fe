'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Divider,
  CircularProgress,
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LoginIcon from '@mui/icons-material/Login'
import { register } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = { name, email, password }
      const response = await register(payload)
      if (response?.data?.success) {
        localStorage.setItem('token', response?.data?.token)
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
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
          maxWidth: 460,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'secondary.main',
          boxShadow: '0 0 24px rgba(209,196,233,0.2)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'secondary.main',
            fontFamily: 'inherit',
            textAlign: 'center',
            mb: 2,
          }}
        >
          Create Account
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}
        >
          Enter the world of botanicals and beginnings.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              endIcon={!loading && <PersonAddIcon />}
              sx={{
                fontWeight: 'bold',
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>

            <Button
              onClick={() => router.push('/login')}
              variant="outlined"
              fullWidth
              size="large"
              startIcon={<LoginIcon />}
              sx={{
                borderRadius: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(129,199,132,0.08)',
                  borderColor: 'primary.light',
                },
              }}
            >
              Back to Login
            </Button>
          </Stack>
        </form>

        {error && (
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: 2, textAlign: 'center' }}
          >
            {error}
          </Typography>
        )}

        <Divider sx={{ my: 4, borderColor: 'secondary.main' }} />

        <Typography
          variant="caption"
          sx={{ textAlign: 'center', display: 'block', color: 'text.secondary' }}
        >
          ⊹ Signed in spirit & scent, as Emilie would ⊹
        </Typography>
      </Paper>
    </Box>
  )
}