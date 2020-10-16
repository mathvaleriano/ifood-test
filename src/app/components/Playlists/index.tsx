import React, { memo } from 'react'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { RootState } from 'core/redux/reducers'
import { useSelector } from 'react-redux'
import Item from './Item'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}))

const Playlists = () => {
  const classes = useStyles()
  const { items } = useSelector(({ spotify }: RootState) => spotify)

  return <>
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={1}>
        {items.map(item => (
          <Grid item xs={12} sm={4} md={3} key={item.id} zeroMinWidth>
            <Item image={item.images[0].url} name={item.name} />
          </Grid>
        ))}
        {items.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Sorry! No playlists found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  </>
}

export default memo(Playlists)