import React from 'react';

import { Typography } from '@material-ui/core';

import { IJobDialogProps } from './JobDialog';
import PlainTextWithLinks from '../PlainTextWithLinks';

export default function JobDetails({
  data: { description, descriptionResponsibilities, descriptionOffers },
}: Pick<IJobDialogProps, 'data'>) {
  return (
    <>
      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        style={{ whiteSpace: 'pre-line' }}
      >
        <PlainTextWithLinks>{description}</PlainTextWithLinks>
      </Typography>

      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        style={{ whiteSpace: 'pre-line' }}
      >
        <PlainTextWithLinks>{descriptionResponsibilities}</PlainTextWithLinks>
      </Typography>

      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        style={{ whiteSpace: 'pre-line' }}
      >
        <PlainTextWithLinks>{descriptionOffers}</PlainTextWithLinks>
      </Typography>
    </>
  );
}
