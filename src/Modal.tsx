import React, { useState } from 'react';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogProps,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  Grid,
  Button,
  ButtonProps,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import { spacingFn } from './Theme/spacing';
import CloseIcon from '@material-ui/icons/Close';

import { TransitionGrow, TransitionSlide } from './Transition';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '--spacing-modal': spacingFn('s') + 'px',
      '--spacing-modal-contents': spacingFn('s') + 'px',

      [theme.breakpoints.down('xs')]: {
        '--spacing-modal': spacingFn('xs') + 'px',
      },
    },

    paper: {
      userSelect: 'none',
      overflowX: 'hidden',

      padding: 'var(--spacing-modal)',
      paddingBottom: 'var(--spacing-modal-contents)',
    },

    titleRow: {
      padding: 0,
      paddingBottom: 'var(--spacing-modal)',

      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    title: {
      ...theme.typography.h5,
      [theme.breakpoints.down('sm')]: theme.typography.h6,
    },
    closeButton: {
      margin: theme.spacing(-1.5),
      marginLeft: 'var(--spacing-modal)',
    },

    content: {
      padding: '0 var(--spacing-modal)',
      margin: '0 calc(var(--spacing-modal) * -1)',

      ...theme.typography.body1,

      // https://codepen.io/evank/pen/wWbRNO
      background: `
        linear-gradient(${theme.palette.background.paper} 50%, ${fade(
        theme.palette.background.paper,
        0
      )}),
        linear-gradient(${fade(theme.palette.background.paper, 0)}, ${
        theme.palette.background.paper
      } 50%) 0 100%,
        linear-gradient(to top, ${theme.palette.divider} 1px, ${fade(
        theme.palette.divider,
        0
      )}),
        linear-gradient(to top, ${theme.palette.divider} 1px, ${fade(
        theme.palette.divider,
        0
      )}) 0 calc(100% - 0.5px)`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'white',
      backgroundSize: '100% 2px, 100% 3px, 100% 1px, 100% 1px',
      backgroundAttachment: 'local, local, scroll, scroll',
    },

    actions: {
      paddingTop: 'var(--spacing-modal-contents)',
      '& button': { minWidth: 100 },
    },
  })
);

export interface IModalProps extends Partial<Omit<DialogProps, 'title'>> {
  onClose: () => void;

  title: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;

  children?: React.ReactNode;
  body?: React.ReactNode;

  actions?: {
    primary?: Partial<ButtonProps>;
    secondary?: Partial<ButtonProps>;
  };
}

export default function Modal({
  onClose,
  title,
  header,
  footer,
  children,
  body,
  actions,
  ...props
}: IModalProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 300);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={isMobile ? TransitionSlide : TransitionGrow}
      onClose={handleClose}
      fullWidth
      fullScreen={isMobile}
      aria-labelledby="modal-title"
      classes={{ root: classes.root, paper: classes.paper }}
      {...props}
    >
      <DialogTitle
        id="modal-title"
        className={classes.titleRow}
        disableTypography
      >
        <Typography
          className={classes.title}
          component="h2"
          color="textPrimary"
        >
          {title}
        </Typography>

        <IconButton
          onClick={handleClose}
          className={classes.closeButton}
          aria-label="Close"
          color="secondary"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {header}

      <DialogContent className={classes.content}>
        {children || body}
      </DialogContent>

      {footer}

      {actions && (
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          className={classes.actions}
        >
          {actions.secondary && (
            <Grid item>
              <Button {...actions.secondary} />
            </Grid>
          )}

          {actions.primary && (
            <Grid item>
              <Button variant="contained" {...actions.primary} />
            </Grid>
          )}
        </Grid>
      )}
    </Dialog>
  );
}
