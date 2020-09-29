import React, { useState } from 'react';

import {
  makeStyles,
  createStyles,
  Grid,
  GridProps,
  IconButton,
  Snackbar,
} from '@material-ui/core';

import {
  TwitterShareButton,
  FacebookShareButton,
  // FacebookMessengerShareButton,
  LinkedinShareButton,
} from 'react-share';

import TwitterIcon from '../assets/icon-twitter.svg';
import FacebookIcon from '../assets/icon-facebook.svg';
// import MessengerIcon from 'assets/icon-messenger.svg';
import LinkedinIcon from '../assets/icon-linkedin.svg';
import LinkIcon from '@material-ui/icons/Link';

import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      padding: `${theme.spacing(1.5)}px !important`,
      '&:hover': {
        backgroundColor: `${theme.palette.action.hover} !important`,
      },
    },
  })
);

export interface IShareButtonsProps extends Partial<GridProps> {
  size?: number;
  url?: string;
}

export default function ShareButtons({
  size = 18,
  url: urlProp,
  ...props
}: IShareButtonsProps) {
  const classes = useStyles();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const url =
    urlProp ||
    (typeof window !== `undefined`
      ? window.location.origin + window.location.pathname
      : 'https://demoday.antler.co/');

  return (
    <Grid container alignItems="center" {...props}>
      <Grid item>
        <IconButton
          component={TwitterShareButton}
          url={url}
          aria-label="Share to Twitter"
          className={classes.button}
        >
          <TwitterIcon width="1em" style={{ fontSize: size }} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          component={FacebookShareButton}
          url={url}
          aria-label="Share to Facebook"
          className={classes.button}
        >
          <FacebookIcon width="1em" style={{ fontSize: size }} />
        </IconButton>
      </Grid>
      {/* <Grid item>
        <IconButton
          component={FacebookMessengerShareButton as any}
          url={url}
          aria-label="Share to Messenger"
          className={classes.button}
          appId="1814412788582291" // Private FB app ID
        >
          <MessengerIcon width={18} />
        </IconButton>
      </Grid> */}
      <Grid item>
        <IconButton
          component={LinkedinShareButton}
          url={url}
          aria-label="Share to LinkedIn"
          className={classes.button}
        >
          <LinkedinIcon width="1em" style={{ fontSize: size }} />
        </IconButton>
      </Grid>
      <Grid item>
        <CopyToClipboard text={url} onCopy={() => setShowSnackbar(true)}>
          <IconButton
            color="secondary"
            aria-label="Copy link to page"
            className={classes.button}
          >
            <LinkIcon style={{ fontSize: size }} />
          </IconButton>
        </CopyToClipboard>

        <Snackbar
          message="Link copied"
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          open={showSnackbar}
          onClose={() => setShowSnackbar(false)}
          onClick={() => setShowSnackbar(false)}
          autoHideDuration={3000}
        />
      </Grid>
    </Grid>
  );
}
