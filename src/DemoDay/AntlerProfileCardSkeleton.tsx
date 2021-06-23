import React from 'react';
import _isFunction from 'lodash/isFunction';

import { makeStyles, createStyles, Typography, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import BasicCard, { IBasicCardProps } from '../Card/BasicCard';
import CardTitle from '../Card/CardTitle';

const useStyles = makeStyles(theme =>
  createStyles({
    flex: {
      display: 'flex',
      height: '100%',
    },
    main: {
      flexGrow: 1,
      marginRight: 'var(--spacing-card)',

      display: 'flex',
      flexDirection: 'column',
      '& > * + *': {
        marginTop: 'var(--spacing-card)',
      },
    },

    name: { flexGrow: 1 },

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

export default function AntlerProfileCardSkeleton(
  props: Partial<IBasicCardProps>
) {
  const classes = useStyles();

  return (
    <BasicCard
      {...props}
      body={
        <div className={classes.flex}>
          <div className={classes.main}>
            <Typography variant="overline">
              <Skeleton width="30%" />
            </Typography>

            <CardTitle className={classes.name}>
              <Skeleton width="50%" />
              <Skeleton width="60%" />
            </CardTitle>

            <Grid container spacing={1}>
              <Grid item>
                <Skeleton variant="rect" width={40} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="rect" width={40} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="rect" width={40} height={40} />
              </Grid>
            </Grid>
          </div>

          <Skeleton variant="rect" className={classes.photo} />
        </div>
      }
      style={{ boxShadow: 'none', transition: 'none', ...props.style }}
    />
  );
}
