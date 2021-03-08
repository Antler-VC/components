import React from 'react';

import {
  makeStyles,
  createStyles,
  Chip,
  ChipProps,
  Avatar,
} from '@material-ui/core';

import Thumbnail from '../Thumbnail';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      borderRadius: theme.shape.borderRadius,
      minHeight: 32,
    },

    outlined: {
      borderColor: 'transparent',
    },
    outlinedPrimary: {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.antler.aRed[100],
    },

    avatar: {
      '$root &': {
        marginRight: 0,
        backgroundColor: theme.palette.antler.aGray[200],
      },
    },

    label: {
      ...theme.typography.body2,
      color: undefined,
      textTransform: 'none',

      '$outlined &': { padding: theme.spacing(0, 'xxs') },
    },
  })
);

export interface IPersonChipProps extends Partial<Omit<ChipProps, 'avatar'>> {
  avatar?: string;

  component?: string;
}

export default function PersonChip({ avatar, ...props }: IPersonChipProps) {
  const classes = useStyles();

  return (
    <Chip
      size="medium"
      variant="outlined"
      avatar={
        avatar ? (
          <Thumbnail
            alt=""
            aria-hidden="true"
            imageUrl={avatar}
            size="100x100"
            shape="circle"
          />
        ) : (
          <Avatar />
        )
      }
      classes={classes}
      {...props}
    />
  );
}
