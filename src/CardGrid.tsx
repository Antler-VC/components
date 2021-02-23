import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles } from '@material-ui/core';
import { spacingFn } from './Theme/spacing';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',

      display: 'grid',
      gridTemplateColumns: 'repeat(var(--card-columns), 1fr)',
      columnGap: 'var(--grid-gutter)',
      rowGap: 'var(--grid-gutter)',

      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        columnGap: spacingFn('xs'),
        rowGap: spacingFn('xs'),
      },

      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '1fr',
      },
    },
  })
);

export default function CardGrid(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const classes = useStyles();

  return <div {...props} className={clsx(classes.root, props.className)} />;
}
