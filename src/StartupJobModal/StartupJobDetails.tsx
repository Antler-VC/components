import React from 'react';
import { format } from 'date-fns';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

import { IStartupJobModalProps } from './StartupJobModal';
import PlainTextWithLinks from '../PlainTextWithLinks';

const useStyles = makeStyles(() =>
  createStyles({
    description: {
      whiteSpace: 'pre-line',

      marginBottom: 'var(--spacing-modal-contents)',
      '&:last-child': { marginBottom: 0 },
    },
  })
);

export default function StartupJobDetails({
  data: {
    description,
    descriptionResponsibilities,
    descriptionOffers,
    applicationDeadline,
  },
}: Pick<IStartupJobModalProps, 'data'>) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="overline" component="h3" gutterBottom>
        Application Deadline
      </Typography>

      <Typography className={classes.description}>
        {format(applicationDeadline * 1000, 'd MMMM yyyy')}
      </Typography>

      <Typography variant="overline" component="h3" gutterBottom>
        Job Description
      </Typography>

      <Typography className={classes.description}>
        <PlainTextWithLinks>{description}</PlainTextWithLinks>
      </Typography>

      <Typography variant="overline" component="h3" gutterBottom>
        Responsibilities
      </Typography>

      <Typography className={classes.description}>
        <PlainTextWithLinks>{descriptionResponsibilities}</PlainTextWithLinks>
      </Typography>

      {descriptionOffers && (
        <Typography variant="overline" component="h3" gutterBottom>
          What We Offer
        </Typography>
      )}

      {descriptionOffers && (
        <Typography className={classes.description}>
          <PlainTextWithLinks>{descriptionOffers}</PlainTextWithLinks>
        </Typography>
      )}
    </>
  );
}
