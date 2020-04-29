import React from 'react';
import clsx from 'clsx';
import Div100vh from 'react-div-100vh';

import {
  makeStyles,
  createStyles,
  Grid,
  GridProps,
  Typography,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      textAlign: 'center',
    },

    content: { maxWidth: '25em' },

    icon: {
      color: theme.palette.text.disabled,
      fontSize: '3.5rem',
    },

    message: {
      textTransform: 'uppercase',
      marginTop: theme.spacing(1),
      letterSpacing: 1,
    },

    basicIcon: { display: 'block' },
  })
);

export interface IEmptyStateProps extends Partial<GridProps> {
  message?: React.ReactNode;
  description?: React.ReactNode;
  Icon?: typeof ErrorIcon;
  fullScreen?: boolean;
  basic?: boolean;
}

export default function EmptyState({
  message = 'Nothing here',
  description,
  Icon = ErrorIcon,
  fullScreen = false,
  basic = false,
  ...props
}: IEmptyStateProps) {
  const classes = useStyles({});

  if (basic)
    return (
      <Grid container alignItems="center" spacing={1} {...props}>
        <Grid item>
          <Icon className={classes.basicIcon} />
        </Grid>

        <Grid item>
          {message}
          {description && ': '}
          {description}
        </Grid>
      </Grid>
    );

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
        <Icon className={classes.icon} />

        <Typography
          variant="h6"
          className={classes.message}
          color="textSecondary"
          gutterBottom
        >
          {message}
        </Typography>

        {description && (
          <Typography color="textSecondary" variant="body2">
            {description}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
