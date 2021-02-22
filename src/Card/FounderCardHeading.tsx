import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import Thumbnail, { IThumbnailProps } from '../Thumbnail';

const useStyles = makeStyles(() =>
  createStyles({
    multiline: {
      whiteSpace: 'pre-line',
      wordBreak: 'break-word',
    },

    image: {
      width: 80,
      height: 80,
    },
  })
);

export interface IFounderCardHeadingProps {
  isMobile: boolean;

  overline?: React.ReactNode;
  overlineSecondary?: React.ReactNode;
  title?: React.ReactNode;
  // titleHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6;

  image?: IThumbnailProps & { elem?: React.ReactNode };
}

export default function FounderCardHeading({
  isMobile,
  overline,
  overlineSecondary,
  title,
  image,
}: IFounderCardHeadingProps) {
  const classes = useStyles();

  return (
    <>
      {(overline || overlineSecondary) && (
        <Grid container alignItems="flex-start">
          <Grid item xs>
            <Typography
              variant="overline"
              display="block"
              className={classes.multiline}
            >
              {overline}
            </Typography>
          </Grid>

          {overlineSecondary && (
            <Grid item>
              <Typography
                variant="overline"
                display="block"
                className={classes.multiline}
              >
                {overlineSecondary}
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      {(title || image) && (
        <Grid container alignItems="flex-start" wrap="nowrap">
          <Grid item xs>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              className={classes.multiline}
              component="h2"
            >
              {title}
            </Typography>
          </Grid>

          {image && (
            <Grid item>
              {image.imageUrl && (
                <Thumbnail
                  size="200x200"
                  title={typeof title === 'string' ? title : ''}
                  alt={typeof title === 'string' ? title : ''}
                  shape="square"
                  {...image}
                  className={clsx(classes.image, image.className)}
                />
              )}
              {image.elem}
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}
