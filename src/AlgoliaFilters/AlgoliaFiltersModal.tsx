import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Button,
  Dialog,
  IconButton,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';

import { TransitionSlide } from '../Transition';

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      backgroundColor: theme.palette.background.paper,
      '&&': { boxShadow: theme.shadows[1] },
      borderRadius: 0,
      height: 56,

      justifyContent: 'space-between',
      padding: theme.spacing(0, 'xs'),
    },

    buttonActive: {
      backgroundColor: theme.palette.antler.aRed[100],
    },

    closeButton: {
      display: 'flex',
      position: 'absolute',
      top: 4,
      right: 4,

      color: theme.palette.text.primary,
    },
  })
);

export interface IAlgoliaFiltersModalProps {
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  filtersCount: number;
}

export default function AlgoliaFiltersModal({
  children,
  openModal,
  setOpenModal,
  filtersCount,
}: IAlgoliaFiltersModalProps) {
  const classes = useStyles();

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        endIcon={<FilterListIcon />}
        fullWidth
        className={clsx(
          classes.button,
          filtersCount > 0 && classes.buttonActive
        )}
      >
        Filters {filtersCount > 0 && `(${filtersCount})`}
      </Button>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        TransitionComponent={TransitionSlide}
        fullWidth
        maxWidth="xs"
        disableBackdropClick
      >
        <IconButton
          aria-label="Close"
          onClick={() => setOpenModal(false)}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Dialog>
    </>
  );
}
