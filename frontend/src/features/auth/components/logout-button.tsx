'use client'

import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'

export const LogoutButton = ({ color }: { color: string }) => {
  return (
    <Button
      onClick={() => {
        signOut()
      }}
    >
      SignOut
    </Button>
  )
}
