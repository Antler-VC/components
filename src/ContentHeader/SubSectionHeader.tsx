import React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';
import { spacingFn } from '../Theme/spacing';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',

      '* + &': { marginTop: spacingFn('l') },
      marginBottom: spacingFn('m'),

      [theme.breakpoints.down('sm')]: {
        '* + &': { marginTop: spacingFn('m') },
        marginBottom: spacingFn('xs'),
      },

      '&::before': {
        content: '""',
        display: 'block',

        backgroundColor: theme.palette.divider,

        flexShrink: 0,
        height: 1,
        width: 88,
        marginRight: spacingFn('m'),

        [theme.breakpoints.down('sm')]: {
          width: 82,
          marginRight: spacingFn('xs'),
        },
      },
    },
  })
);

export interface ISubSectionHeaderProps {
  text?: React.ReactNode;
  children?: React.ReactNode;
  headingLevel?: string;
}

export default function SubSectionHeader({
  text,
  children,
  headingLevel = 'h3',
}: ISubSectionHeaderProps) {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Typography
        variant="overline"
        component={headingLevel as any}
        color="textSecondary"
      >
        {children || text}
      </Typography>
    </header>
  );
}
