import React from 'react';
import clsx from 'clsx';
import Div100vh from 'react-div-100vh';

import {
  makeStyles,
  createStyles,
  Grid,
  GridProps,
  CircularProgress,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      textAlign: 'center',
    },
    content: { maxWidth: '25em' },
    message: {
      textTransform: 'uppercase',
      marginTop: theme.spacing(1),
      letterSpacing: 1,
    },
  })
);

export interface ILoadingProps extends Partial<GridProps> {
  message?: string;
  fullScreen?: boolean;
}

export default function Loading({
  message = 'Loading',
  fullScreen = false,
  ...props
}: ILoadingProps) {
  const classes = useStyles({});

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      component={fullScreen ? Div100vh : 'div'}
      style={{ height: fullScreen ? '100rvh' : '100%' }}
      {...props}
      className={clsx(classes.root, props.className)}
    >
      <Grid item className={classes.content}>
        <CircularProgress />
        <Typography
          variant="h6"
          className={classes.message}
          color="textSecondary"
        >
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
}
