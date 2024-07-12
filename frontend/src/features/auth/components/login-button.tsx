'use client'

import { Button } from '@mui/material'
import { signIn } from 'next-auth/react'

export const LoginButton = () => {
  return (
    <Button
      onClick={() => {
        signIn()
      }}
    >
      SignIn
    </Button>
  )
}
