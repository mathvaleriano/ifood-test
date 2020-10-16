import React, { memo } from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#222326',
    },
    secondary: {
      main: '#1ed760',
    },
  },
});

export default memo(
  ({ children }) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
)