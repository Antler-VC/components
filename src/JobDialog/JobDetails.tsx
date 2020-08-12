import React from 'react';

import { Typography } from '@material-ui/core';

import { IJobDialogProps } from './JobDialog';

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
        {description}
      </Typography>

      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        style={{ whiteSpace: 'pre-line' }}
      >
        {descriptionResponsibilities}
      </Typography>

      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        style={{ whiteSpace: 'pre-line' }}
      >
        {descriptionOffers}
      </Typography>
    </>
  );
}
