import React from 'react';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import Thumbnail, { IThumbnailProps } from '../Thumbnail';

const useStyles = makeStyles(() =>
  createStyles({
    overline: {
      display: 'flex',
    },
    overlineSecondary: {
      marginLeft: 'auto',
    },

    title: {
      whiteSpace: 'pre-line',
      wordBreak: 'break-word',
    },

    image: {
      width: 80,
      height: 80,
    },
  })
);

export interface IProfileCardHeadingProps {
  isMobile: boolean;

  overline?: React.ReactNode;
  overlineSecondary?: React.ReactNode;
  title?: React.ReactNode;
  // titleHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6;

  image?: IThumbnailProps & { elem?: React.ReactNode };
}

export default function ProfileCardHeading({
  isMobile,
  overline,
  overlineSecondary,
  title,
  image,
}: IProfileCardHeadingProps) {
  const classes = useStyles();

  return (
    <>
      {(overline || overlineSecondary) && (
        <Grid container alignItems="flex-start">
          <Grid item xs>
            <Typography variant="overline" display="block">
              {overline}
            </Typography>
          </Grid>

          {overlineSecondary && (
            <Grid item>
              <Typography variant="overline" display="block">
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
              className={classes.title}
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
                  className={classes.image}
                  title={typeof title === 'string' ? title : ''}
                  alt={typeof title === 'string' ? title : ''}
                  shape="square"
                  {...image}
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
