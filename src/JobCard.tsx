import React from 'react';
import clsx from 'clsx';
import { format, differenceInDays } from 'date-fns';

import {
  makeStyles,
  createStyles,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import SquareCard, { ISquareCardProps } from './SquareCard';
import Thumbnail from './Thumbnail';

const useStyles = makeStyles(theme =>
  createStyles({
    content: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      height: '100%',
      paddingBottom: theme.spacing(2),
    },

    overline: { color: theme.palette.text.disabled },

    teamName: {
      textTransform: 'none',
      letterSpacing: 1,
    },
    jobTitle: { fontWeight: 'normal' },

    logo: {
      maxWidth: 200,
      width: '80%',
      height: 80,
      objectFit: 'contain',
      objectPosition: 'center left',

      margin: theme.spacing(0.5, 0, 2),
      display: 'block',
    },

    oneLine: {
      whiteSpace: 'pre-line',

      display: '-webkit-box',
      boxOrient: 'vertical',
      lineClamp: 3,
    },

    deadline: {
      display: 'block',
      marginTop: 'auto',
      paddingTop: theme.spacing(2),
      color: theme.palette.text.disabled,
    },
    deadlineError: { color: theme.palette.error.main },
  })
);

export interface IJobCardProps {
  CardProps: Partial<ISquareCardProps>;
  teamName: string;
  jobFunction: string;
  location: string;
  logo?: { downloadURL: string }[];
  jobTitle: string;
  description: string;
  applicationDeadline: number;
  actions?: React.ReactNode;
}

export default function JobCard({
  CardProps,
  teamName,
  jobFunction,
  location,
  logo,
  jobTitle,
  description,
  applicationDeadline,
  actions,
}: IJobCardProps) {
  const classes = useStyles();

  const dateDiff = differenceInDays(applicationDeadline * 1000, new Date());

  return (
    <SquareCard {...((CardProps ?? {}) as any)}>
      <CardContent className={classes.content}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item>
            <Typography
              variant="overline"
              className={clsx(classes.overline, classes.teamName)}
              display="block"
            >
              {teamName}
            </Typography>
          </Grid>

          <Grid item xs>
            <Typography
              variant="overline"
              className={classes.overline}
              align="right"
              display="block"
            >
              {jobFunction || '&nbsp;'}
            </Typography>
            <Typography variant="overline" align="right" display="block">
              {location || '&nbsp;'}
            </Typography>
          </Grid>
        </Grid>

        {logo?.[0]?.downloadURL && (
          <Thumbnail
            imageUrl={logo[0].downloadURL}
            size="400x400"
            shape="square"
            className={classes.logo}
          />
        )}

        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          className={classes.jobTitle}
        >
          {jobTitle}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.oneLine}
        >
          {description}
        </Typography>

        <Typography
          variant="button"
          className={clsx(
            classes.deadline,
            dateDiff <= 3 && classes.deadlineError
          )}
        >
          {dateDiff <= 0
            ? 'Last day to apply'
            : dateDiff <= 3
            ? `${dateDiff} days left`
            : `Until ${format(applicationDeadline * 1000, 'd MMM yyyy')}`}
        </Typography>
      </CardContent>

      {actions}
    </SquareCard>
  );
}
