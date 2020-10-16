import React, { memo } from 'react'
import { Card, CardMedia, makeStyles } from '@material-ui/core'

type Props = {
  name: string,
  image: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    margin: 'auto'
  },
  media: {
    height: 200,
    width: 200
  },
}))

const Item = ({ name, image }: Props) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardMedia
        image={image}
        title={name} className={classes.media} />
    </Card>
  )
}

export default memo(Item)