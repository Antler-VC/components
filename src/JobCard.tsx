import React from 'react';
import clsx from 'clsx';

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
    content: { flexGrow: 1 },

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

    oneLine: { whiteSpace: 'pre-line' },
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
  actions,
}: IJobCardProps) {
  const classes = useStyles();

  return (
    <SquareCard {...((CardProps ?? {}) as any)}>
      <CardContent style={{ flexGrow: 1 }}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs>
            <Typography
              variant="overline"
              className={clsx(classes.overline, classes.teamName)}
              display="block"
            >
              {teamName}
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              variant="overline"
              className={classes.overline}
              align="right"
              display="block"
            >
              {jobFunction}
            </Typography>
            <Typography variant="overline" align="right" display="block">
              {location}
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
      </CardContent>

      {actions}
    </SquareCard>
  );
}
