import { Box } from '@mui/material'
import React from 'react'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Box
      sx={{
        width: '100%',
        margin: 0,
        position: 'relative',
        bgcolor: 'grey.200', // MUI uses grey instead of gray
      }}
    >
      {children}
    </Box>
  )
}
