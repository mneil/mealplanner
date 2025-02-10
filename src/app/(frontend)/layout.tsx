// 'use client'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'
import config from '@/payload.config'
import * as React from 'react'
import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'

import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'

import * as Layout from './components/Layout'
import Navigation from './components/Navigation'
import Header from './components/Header'

export default async function RootLayout(props: { children: React.ReactNode }) {
  // console.log('ARGUMENTS', ...arguments)
  // const [drawerOpen, setDrawerOpen] = React.useState(false)
  const { children } = props

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  return (
    <html>
      <head></head>
      <body>
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          {/* {drawerOpen && (
            <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
              <Navigation />
            </Layout.SideDrawer>
          )} */}
          <Stack
            id="tab-bar"
            direction="row"
            spacing={1}
            sx={{
              justifyContent: 'space-around',
              display: { xs: 'flex', sm: 'none' },
              zIndex: '999',
              bottom: 0,
              position: 'fixed',
              width: '100dvw',
              py: 2,
              backgroundColor: 'background.body',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Button
              variant="plain"
              color="neutral"
              component="a"
              href="/joy-ui/getting-started/templates/email/"
              size="sm"
              startDecorator={<EmailRoundedIcon />}
              sx={{ flexDirection: 'column', '--Button-gap': 0 }}
            >
              Email
            </Button>
            <Button
              variant="plain"
              color="neutral"
              component="a"
              href="/joy-ui/getting-started/templates/team/"
              size="sm"
              startDecorator={<PeopleAltRoundedIcon />}
              sx={{ flexDirection: 'column', '--Button-gap': 0 }}
            >
              Team
            </Button>
            <Button
              variant="plain"
              color="neutral"
              aria-pressed="true"
              component="a"
              href="/joy-ui/getting-started/templates/files/"
              size="sm"
              startDecorator={<FolderRoundedIcon />}
              sx={{ flexDirection: 'column', '--Button-gap': 0 }}
            >
              Files
            </Button>
          </Stack>
          <Layout.Root
            sx={[
              {
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
                  // md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
                },
              },
              // drawerOpen && {
              //   height: '100vh',
              //   overflow: 'hidden',
              // },
            ]}
          >
            <Layout.Header>
              <Header user={user} />
            </Layout.Header>
            <Layout.SideNav>
              <Navigation />
            </Layout.SideNav>
            <Layout.Main>{children}</Layout.Main>
          </Layout.Root>
        </CssVarsProvider>
      </body>
    </html>
  )
}
