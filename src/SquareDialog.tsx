import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Dialog,
  DialogProps,
  IconButton,
  DialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { SlideTransitionMui } from './Modal/SlideTransition';

export const useDialogStyles = makeStyles(theme =>
  createStyles({
    paper: {
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(2),
        maxWidth: `calc(100% - ${theme.spacing(2 * 2)}px) !important`,
      },
    },
    paperFullScreen: { maxWidth: '100% !important' },

    closeButton: {
      position: 'absolute',
      zIndex: 1,

      top: theme.spacing(3),
      right: theme.spacing(3),

      [theme.breakpoints.down('xs')]: {
        top: theme.spacing(1.5),
        right: theme.spacing(1.5),
      },
    },

    content: {
      padding: theme.spacing(8),
      [theme.breakpoints.down('sm')]: { padding: theme.spacing(6) },
      [theme.breakpoints.down('xs')]: { padding: theme.spacing(6, 4, 4) },
    },
  })
);

export interface ISquareDialogProps extends DialogProps {
  overrideClasses?: Partial<ReturnType<typeof useDialogStyles>>;
  hideCloseButton?: boolean;
}

export default function SquareDialog({
  children,
  overrideClasses,
  hideCloseButton,
  ...props
}: ISquareDialogProps) {
  const classes = useDialogStyles();

  return (
    <Dialog
      PaperProps={{ square: true, elevation: 0 }}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      scroll="body"
      TransitionComponent={SlideTransitionMui}
      {...props}
      classes={{
        ...props.classes,
        paper: clsx(classes.paper, overrideClasses?.paper),
        paperFullScreen: clsx(
          classes.paperFullScreen,
          overrideClasses?.paperFullScreen
        ),
      }}
    >
      {!!props.onClose && !hideCloseButton && (
        <IconButton
          color="secondary"
          onClick={props.onClose as any}
          className={clsx(classes.closeButton, overrideClasses?.closeButton)}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      )}

      <DialogContent
        className={clsx(classes.content, overrideClasses?.content)}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
