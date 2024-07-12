'use client'
import SideMenu from '@/components/layouts/sidebar'
import { Grid } from '@mui/material'
import React from 'react'
import { RecoilRoot } from 'recoil'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <RecoilRoot>
        <Grid container>
          <Grid item md={2}>
            <SideMenu directories={['規程', 'マニュアル', 'QA']} />{/*仮置き*/}
          </Grid>
          <Grid item md={10} p={10}>
            {children}
          </Grid>
        </Grid>
      </RecoilRoot>
    </div>
  )
}
