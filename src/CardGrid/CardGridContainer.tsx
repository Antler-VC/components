import React from 'react'

import { useTheme, useMediaQuery, Grid, GridProps } from '@material-ui/core'

export default function CardGridContainer(props: Partial<GridProps>) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  return <Grid container {...props} spacing={isSm ? 2 : 4} />
}
