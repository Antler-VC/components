import React from 'react';

import {
  makeStyles,
  createStyles,
  Button,
  ButtonProps,
} from '@material-ui/core';

import GoIcon from './GoIcon';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(1, 5, 1, 4),
    },

    endIcon: {
      position: 'absolute',
      right: theme.spacing(2),
      top: '50%',
      transform: 'translateY(-50%)',

      animation: theme.transitions.create('$float-in', {
        easing: theme.transitions.easing.easeOut,
      }),

      transition: theme.transitions.create('transform'),
      '$root:hover &': { transform: `translateX(25%) translateY(-50%)` },
    },
    '@keyframes float-in': {
      from: {
        opacity: 0,
        transform: `translateX(-50%) translateY(-50%)`,
      },
      to: {
        opacity: 1,
        transform: `translateY(-50%)`,
      },
    },

    startIcon: {
      position: 'absolute',
      left: theme.spacing(2),
      top: '50%',
      transform: 'translateY(-50%)',
    },
  })
);

export default function CtaButton(props: ButtonProps<any>) {
  const classes = useStyles();
  return (
    <Button
      size="large"
      variant="contained"
      color="primary"
      endIcon={<GoIcon />}
      classes={{ ...classes, ...(props.classes ?? {}) }}
      {...props}
    />
  );
}
