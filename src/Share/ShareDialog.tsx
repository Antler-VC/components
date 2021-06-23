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

import Modal from '../Modal/Modal';
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

        {open && (
          <Modal
            onClose={handleClose}
            title={heading || 'Share'}
            fullScreen={false}
          >
            {typeof window !== 'undefined' && (
              <Typography variant="body1" className={classes.link}>
                {url || window.location.origin + window.location.pathname}
              </Typography>
            )}

            <ShareButtons
              size={isXs ? 24 : 36}
              spacing={isXs ? 1 : 2}
              url={url}
            />
          </Modal>
        )}
      </>
    );
  }
);

export default ShareDialog;
