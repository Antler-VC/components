import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { format } from 'date-fns';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Typography,
  CardMedia,
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/GetApp';

import DetailsModal, { IDetailsModalProps } from '../Modal/DetailsModal';
import Thumbnail from '../Thumbnail';
import GoIcon from '../GoIcon';
import RenderedHtml from '../RenderedHtml';

const useStyles = makeStyles(theme =>
  createStyles({
    paperWidthMd: { maxWidth: 992 },

    header: {
      marginTop: 'calc(var(--spacing-modal-contents) * -1)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-modal-contents)',
    },
    logo: {
      objectFit: 'contain',
      objectPosition: 'left',
      width: 100,
      height: 24,
    },

    headerImage: {
      objectFit: 'cover',
      width: '100%',
      height: '0',
      paddingTop: '50%',
      boxShadow: `0 0 0 1px ${theme.palette.divider} inset`,
    },

    description: {
      ...theme.typography.body1,
      maxWidth: '100%',
      color: theme.palette.text.primary,

      [theme.breakpoints.up('md')]: {
        fontSize: 21,
        lineHeight: '32px',
        // See https://app.zeplin.io/project/5df8c01a6049c216fb49a5e9/screen/608fc33a86ddb95bb09f1f98?did=6098ed3c35d0e010d3b00107&cmid=6098ed3c35d0e010d3b00108
      },
    },
  })
);

export interface IStartupUpdateModalProps
  extends Omit<IDetailsModalProps, 'title'> {
  data: {
    logo?: { downloadURL: string }[];
    featuredImage?: { downloadURL: string }[];
    website?: string;
    teamName: string;
    updateHeader: string;
    updateIntroduction: string;

    createdAt: number;
    attachment?: { downloadURL: string }[];
  };
  header?: React.ReactNode;
}

export default function StartupUpdateModal({
  data,
  header,
  ...props
}: IStartupUpdateModalProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  if (_isEmpty(data)) return null;

  return (
    <DetailsModal
      header={
        header || (
          <div className={classes.header}>
            {data.logo?.[0]?.downloadURL && (
              <Thumbnail
                className={classes.logo}
                imageUrl={data.logo?.[0]?.downloadURL}
                size="200x200"
                shape="square"
                alt={data.teamName}
              />
            )}
          </div>
        )
      }
      body={
        <>
          <Typography
            variant={isMd ? 'h4' : 'h5'}
            component="h1"
            color="textPrimary"
            gutterBottom
            id="modal-title"
          >
            {data.updateHeader}
          </Typography>
          <Typography variant="overline">
            {format(new Date(data.createdAt * 1000), 'd MMM y')}
          </Typography>

          {data.featuredImage?.[0]?.downloadURL && (
            <CardMedia
              image={data.featuredImage?.[0]?.downloadURL}
              className={classes.headerImage}
            />
          )}

          {Array.isArray(data.attachment) && data.attachment[0]?.downloadURL && (
            <Button
              color="secondary"
              startIcon={<DownloadIcon />}
              endIcon={<GoIcon />}
              component="a"
              href={data.attachment[0].downloadURL}
              target="_blank"
              rel="noopener"
            >
              Download Attachment
            </Button>
          )}

          <RenderedHtml
            html={data.updateIntroduction}
            className={classes.description}
          />
        </>
      }
      maxWidth={isMd ? 'md' : 'sm'}
      classes={{ paperWidthMd: classes.paperWidthMd }}
      {...props}
    />
  );
}
