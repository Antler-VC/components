import React from 'react';

import { makeStyles, createStyles, Grid, CardContent } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { SquareCard } from '@antlerengineering/components';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: '100%',
      minHeight: 128 + theme.spacing(2 * 2),
      pointerEvents: 'none',
    },

    container: { padding: theme.spacing(2) },

    name: {
      transform: 'none',
      height: '1.25rem',
      marginTop: theme.spacing(0.75),
    },

    photo: {
      width: 128,
      height: 128,

      [theme.breakpoints.down('sm')]: {
        width: 80,
        height: 80,
      },
    },
  })
);

export default function ProfileCardSkeleton() {
  const classes = useStyles();

  return (
    <SquareCard className={classes.root} elevation={0} square>
      <Grid container spacing={2} wrap="nowrap" className={classes.container}>
        <CardContent component={Grid} item xs>
          <Skeleton variant="text" style={{ width: '30%' }} />

          <Skeleton
            variant="text"
            className={classes.name}
            style={{ width: '50%' }}
          />
          <Skeleton
            variant="text"
            className={classes.name}
            style={{ width: '70%' }}
          />
        </CardContent>

        <Grid item>
          <Skeleton variant="rect" className={classes.photo} />
        </Grid>
      </Grid>
    </SquareCard>
  );
}
