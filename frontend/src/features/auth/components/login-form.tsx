import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export const LoginForm = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card
        sx={{
          minWidth: 350,
          bgcolor: 'background.paper',
          borderRadius: 'borderRadius',
        }}
      >
        <CardHeader
          title="Sign in"
          sx={{
            textAlign: 'center',
            bgcolor: 'black',
            color: 'white',
            borderTopLeftRadius: 'borderRadius',
            borderTopRightRadius: 'borderRadius',
          }}
        />
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Stack spacing={2} alignItems="center">
              <Button
                onClick={() =>
                  signIn('microsoft-entra-id', { callbackUrl: `/` })
                }
              >
                <Image
                  src="/assets/ms-symbollockup_signin_light.svg"
                  alt="EntraIDでログインする"
                  width={200}
                  height={40}
                />
              </Button>
              <Typography variant="caption" color="text.secondary">
                ※ 本アプリケーションは認可ユーザのみ利用可能です
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
