import React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',

      paddingBottom: theme.spacing('xxs'),
      borderBottom: `1px solid ${theme.palette.divider}`,

      '* + &': { marginTop: theme.spacing('l') },
      marginBottom: theme.spacing('m'),

      [theme.breakpoints.down('xs')]: {
        '* + &': { marginTop: theme.spacing('m') },
        marginBottom: theme.spacing('xs'),
      },
    },
  })
);

export interface IResultsHeaderProps {
  text: React.ReactNode;
  children?: React.ReactNode;
  headingLevel?: string;
}

export default function ResultsHeader({
  text,
  children,
  headingLevel = 'h2',
}: IResultsHeaderProps) {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Typography
        variant="overline"
        component={headingLevel as any}
        color="textSecondary"
      >
        {text}
      </Typography>
      {children}
    </header>
  );
}
