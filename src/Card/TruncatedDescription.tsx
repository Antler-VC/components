import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Typography,
  TypographyProps,
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      whiteSpace: 'pre-line',
      display: '-webkit-box',
      lineClamp: 3,
      boxOrient: 'vertical',
      overflow: 'hidden',
      maxHeight: 24 * 3,
    },

    expanded: {
      maxHeight: 'none',
      overflow: 'visible',
      display: 'block',
    },
  })
);

export interface ITruncatedDescriptionProps extends TypographyProps {
  expanded: boolean;
}

export default function TruncatedDescription({
  expanded,
  ...props
}: ITruncatedDescriptionProps) {
  const classes = useStyles();

  return (
    <Typography
      variant="body2"
      component={'p' as any}
      color="textSecondary"
      {...props}
      className={clsx(
        classes.root,
        expanded && classes.expanded,
        props.className
      )}
    />
  );
}
