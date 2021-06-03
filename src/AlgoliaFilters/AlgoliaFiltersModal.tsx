import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import Modal from '../Modal/Modal';
import AlgoliaFiltersFields, {
  IAlgoliaFiltersFieldsProps,
} from './AlgoliaFiltersFields';

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

    actions: {
      paddingTop: 'var(--spacing-modal-contents)',
    },
  })
);

export interface IAlgoliaFiltersModalProps extends IAlgoliaFiltersFieldsProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  filtersCount: number;

  applyFilters: () => void;
  clearFilters: () => void;
  hasUnappliedFilters: boolean;
  clearable: boolean;
}

export default function AlgoliaFiltersModal({
  openModal,
  setOpenModal,
  filtersCount,

  applyFilters,
  clearFilters,
  hasUnappliedFilters,
  clearable,

  ...fieldsProps
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

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        disableBackdropClick
        title={<Typography variant="overline">Filter</Typography>}
        body={<AlgoliaFiltersFields {...fieldsProps} />}
        actions={{
          primary: {
            children: 'Apply Filters',
            onClick: () => {
              applyFilters();
            },
            closeOnClick: true,
            disabled: !hasUnappliedFilters,
          },
          secondary: {
            children: 'Clear',
            onClick: clearFilters,
            closeOnClick: true,
            disabled: !clearable,
          },
        }}
      />
    </>
  );
}
