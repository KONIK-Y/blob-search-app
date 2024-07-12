'use client'

import { Box, Container } from '@mui/material'
import { LoginForm } from '../components/login-form'

export const LoginPage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <LoginForm />
      </Container>
    </Box>
  )
}
