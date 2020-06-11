import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles, CardContent } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import SquareCard from '../SquareCard';

const useStyles = makeStyles(theme =>
  createStyles({
    disablePadding: { overflow: 'visible' },

    root: {
      height: '100%',
      minHeight: 350,
      pointerEvents: 'none',
    },

    content: {
      '$disablePadding &': { padding: 0 },
    },

    overline: { width: '40%' },

    logo: {
      maxWidth: 200,
      width: '80%',
      height: 80,

      margin: theme.spacing(2, 0),
    },

    teamName: {
      width: '20%',
      height: '1.75rem',
      marginBottom: theme.spacing(1),
    },
  })
);

export interface IStartupCardSkeletonProps {
  className?: string;
  disablePadding?: boolean;
}

export default function StartupCardSkeleton({
  className,
  disablePadding = false,
}: IStartupCardSkeletonProps) {
  const classes = useStyles();

  return (
    <SquareCard
      className={clsx(
        classes.root,
        disablePadding && classes.disablePadding,
        className
      )}
      elevation={0}
      square
    >
      <CardContent className={classes.content}>
        <Skeleton variant="text" className={classes.overline} />

        <Skeleton variant="rect" className={classes.logo} />

        <Skeleton variant="text" className={classes.teamName} />

        <Skeleton variant="text" />
        <Skeleton variant="text" style={{ width: '80%' }} />
      </CardContent>
    </SquareCard>
  );
}
