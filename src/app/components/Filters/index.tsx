import React, { memo } from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'
import useBehavior from './useBehavior'

const Grid = React.lazy(() => import('@material-ui/core/Grid'))

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0)
  }
}))

const Filters = () => {
  const classes = useStyles()
  const fields = useBehavior()

  return (
    <React.Suspense fallback={<CircularProgress color="primary" size={32} />}>
      <Grid container spacing={2} className={classes.root}>
        {fields.map((field, index) => (
          <Grid item xs={12} sm={4} md key={`filter-${index}`}>
            {field}
          </Grid>
        ))}
      </Grid>
    </React.Suspense>
  )
}

export default memo(Filters)