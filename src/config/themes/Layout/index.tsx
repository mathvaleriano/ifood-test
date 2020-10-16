import React, { memo } from 'react'
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'

type Props = {
  children: React.ReactElement
}

const Layout = ({ children }: Props) => (
  <>
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">
          Playlists
      </Typography>
      </Toolbar>
    </AppBar>

    <Container maxWidth="lg">
      {children}
    </Container>
  </>
)

export default memo(Layout)