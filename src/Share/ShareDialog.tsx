import React, { useState } from 'react';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  IconButton,
  IconButtonProps,
  Typography,
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';

import SquareDialog from '../SquareDialog';
import ShareButtons from './ShareButtons';

const useStyles = makeStyles(theme =>
  createStyles({
    subtitle: {
      color: theme.palette.text.disabled,
      textTransform: 'uppercase',
    },

    link: {
      userSelect: 'all',
      marginBottom: theme.spacing(3),
      overflowWrap: 'anywhere',
    },
  })
);

export interface IShareDialogProps extends Partial<IconButtonProps> {
  heading?: React.ReactNode;
  url?: string;
}

export const ShareDialog = React.forwardRef(
  ({ heading, url, ...props }: IShareDialogProps, _) => {
    const classes = useStyles();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
      <>
        <IconButton
          color="primary"
          aria-label="Share"
          {...props}
          onClick={() => setOpen(true)}
        >
          <ShareIcon />
        </IconButton>

        <SquareDialog open={open} onClose={handleClose}>
          <Typography
            variant="subtitle2"
            component="h1"
            className={classes.subtitle}
            gutterBottom
            id="dialog-title"
          >
            {heading || 'Share Demo Day'}
          </Typography>

          {typeof window !== 'undefined' && (
            <Typography
              variant="subtitle2"
              component="h2"
              className={classes.link}
            >
              {url || window.location.origin + window.location.pathname}
            </Typography>
          )}

          <ShareButtons
            size={isXs ? 24 : 36}
            spacing={isXs ? 1 : 2}
            url={url}
          />
        </SquareDialog>
      </>
    );
  }
);

export default ShareDialog;
