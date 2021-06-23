import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',

      display: 'grid',
      gridTemplateColumns: 'repeat(var(--num-cards), 1fr)',
      columnGap: 'var(--grid-gutter)',
      rowGap: 'var(--grid-gutter)',
    },

    maxCols1: {
      [theme.breakpoints.up('sm')]: { '--num-cards': 1 },
    },
    maxCols2: {
      [theme.breakpoints.up('md')]: { '--num-cards': 2 },
    },
    maxCols3: {
      [theme.breakpoints.up('lg')]: { '--num-cards': 3 },
    },
  })
);

export interface ICardGridProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  maxCols?: number;
}

export default function CardGrid({ maxCols, ...props }: ICardGridProps) {
  const classes = useStyles();

  return (
    <div
      {...props}
      className={clsx(
        classes.root,
        typeof maxCols === 'number' &&
          classes[`maxCols${maxCols}` as keyof typeof classes],
        props.className
      )}
    />
  );
}
