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
    progress: { color: theme.palette.text.disabled },
    content: { maxWidth: '25em' },
    message: { marginTop: theme.spacing('xxs') },
  })
);

export interface ILoadingProps extends Partial<GridProps> {
  /** Override the default “Loading” message */
  message?: string;
  /** Set height to `100vh`. Default: `false` */
  fullScreen?: boolean;
}

/**
 * Display a loading screen with a spinner
 * Override with props that are passed to the root MUI `Grid` component.
 */
export default function Loading({
  message = 'Loading',
  fullScreen = false,
  ...props
}: ILoadingProps) {
  const classes = useStyles();

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
        <CircularProgress className={classes.progress} />
        <Typography
          variant="overline"
          color="textPrimary"
          component="h1"
          className={classes.message}
        >
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
}
