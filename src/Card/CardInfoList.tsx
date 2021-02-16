import React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';
import { spacingFn } from 'Theme/spacing';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'grid',
      gap: spacingFn('xxs', 'xs'),
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'baseline',

      margin: 0,
      marginTop: 'var(--spacing-card)',

      '& dt, & dd': {
        lineHeight: theme.typography.overline.lineHeight,
      },
    },
  })
);

export interface ICardInfoListProps {
  infoList?: {
    name: React.ReactNode;
    value: React.ReactNode;
  }[];
}

export default function CardInfoList({ infoList = [] }: ICardInfoListProps) {
  const classes = useStyles();

  if (infoList.length === 0) return null;

  return (
    <dl className={classes.root}>
      {infoList.map(({ name, value }, i) => (
        <React.Fragment key={i}>
          <Typography component="dt" variant="overline">
            {name}
          </Typography>
          <Typography component="dd" variant="body2">
            {value}
          </Typography>
        </React.Fragment>
      ))}
    </dl>
  );
}
