import React from 'react'

import { Grid, GridProps } from '@material-ui/core'

export default function CardGridItem(props: Partial<GridProps>) {
  return <Grid item xs={12} sm={6} lg={4} {...props} />
}
