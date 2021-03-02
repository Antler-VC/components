import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',

      display: 'grid',
      gridTemplateColumns: 'repeat(var(--num-cards), 1fr)',
      columnGap: 'var(--grid-gutter)',
      rowGap: 'var(--grid-gutter)',
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
