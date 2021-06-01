import React from 'react';

import {
  makeStyles,
  createStyles,
  Box,
  Typography,
  CardMedia,
  Button,
} from '@material-ui/core';

import BasicCard, { IBasicCardProps } from '../Card/BasicCard';
import RenderedHtml from '../RenderedHtml';
import Thumbnail from '../Thumbnail';
import GoIcon from '../GoIcon';

const useStyles = makeStyles(theme =>
  createStyles({
    logo: {
      objectFit: 'contain',
      objectPosition: 'left',
      width: 100,
      height: 24,
    },
    companyUrl: {
      margin: '-6px -8px -6px 0',
    },

    headerImage: {
      objectFit: 'cover',
      width: '100%',
      height: '0',
      paddingTop: '50%',
      boxShadow: `0 0 0 1px ${theme.palette.divider} inset`,
    },

    description: {
      whiteSpace: 'pre-line',
      display: '-webkit-box',
      lineClamp: 5,
      boxOrient: 'vertical',
      overflow: 'hidden',
      maxHeight: 24 * 5,

      marginTop: 0,
      '& > *:first-child': {
        marginTop: 0,
      },
    },
  })
);

interface IStartupUpdateCardProps extends Partial<IBasicCardProps> {
  data: {
    logo?: { downloadURL: string }[];
    featuredImage?: { downloadURL: string }[];
    website?: string;
    teamName: string;
    updateHeader: string;
    updateIntroduction: string;
  };
  showLogo?: boolean;
  startupPageButton?: React.ReactNode;
}

export default function StartupUpdateCard({
  data,
  showLogo,
  startupPageButton,
  ...props
}: IStartupUpdateCardProps) {
  const classes = useStyles();

  if (!data) return null;

  return (
    <BasicCard
      body={
        <>
          {showLogo && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {data.logo?.[0]?.downloadURL ? (
                <Thumbnail
                  className={classes.logo}
                  imageUrl={data.logo?.[0]?.downloadURL}
                  size="200x200"
                  shape="square"
                />
              ) : (
                <div />
              )}

              {startupPageButton}

              {data.website && !startupPageButton && (
                <Button
                  color="secondary"
                  component="a"
                  href={
                    data.website.startsWith('http')
                      ? data.website
                      : `https://${data.website}`
                  }
                  target="_blank"
                  rel="noopener"
                  endIcon={<GoIcon />}
                  className={classes.companyUrl}
                >
                  {data.teamName}
                </Button>
              )}
            </Box>
          )}

          {data.featuredImage?.[0]?.downloadURL && (
            <CardMedia
              image={data.featuredImage?.[0]?.downloadURL}
              className={classes.headerImage}
            />
          )}

          <Typography variant="h6" component="h3" gutterBottom>
            {data.updateHeader}
          </Typography>

          <RenderedHtml
            html={data.updateIntroduction}
            className={classes.description}
          />
        </>
      }
      {...props}
    />
  );
}
