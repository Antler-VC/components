import React from 'react';
import { format } from 'date-fns';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

import { IJobDialogProps } from './JobDialog';
import PlainTextWithLinks from '../PlainTextWithLinks';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {},

    subheading: {
      color: theme.palette.text.disabled,
      marginBottom: theme.spacing(1),
      display: 'block',

      '* + &': { marginTop: theme.spacing(4) },
    },

    description: {
      whiteSpace: 'pre-line',
      marginBottom: theme.spacing(8),

      '&:last-child': { marginBottom: 0 },
    },
  })
);

export default function JobDetails({
  data: {
    description,
    descriptionResponsibilities,
    descriptionOffers,
    applicationDeadline,
  },
}: Pick<IJobDialogProps, 'data'>) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="button"
        component="h2"
        className={classes.subheading}
      >
        Application Deadline
      </Typography>

      <Typography variant="overline">
        {format(applicationDeadline * 1000, 'd MMM yyyy')}
      </Typography>

      <Typography
        variant="button"
        component="h2"
        className={classes.subheading}
      >
        Job Description
      </Typography>

      <Typography className={classes.description}>
        <PlainTextWithLinks>{description}</PlainTextWithLinks>
      </Typography>

      <Typography
        variant="button"
        component="h2"
        className={classes.subheading}
      >
        Responsibilities
      </Typography>

      <Typography className={classes.description}>
        <PlainTextWithLinks>{descriptionResponsibilities}</PlainTextWithLinks>
      </Typography>

      {descriptionOffers && (
        <Typography
          variant="button"
          component="h2"
          className={classes.subheading}
        >
          What We Offer
        </Typography>
      )}

      {descriptionOffers && (
        <Typography className={classes.description}>
          <PlainTextWithLinks>{descriptionOffers}</PlainTextWithLinks>
        </Typography>
      )}
    </div>
  );
}
