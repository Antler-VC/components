import React from 'react';

import {
  makeStyles,
  createStyles,
  Paper,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

import AlgoliaFiltersFields, {
  IAlgoliaFiltersFieldsProps,
} from './AlgoliaFiltersFields';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing('s', 'xs', 0),
    },

    header: {
      marginBottom: theme.spacing('s'),
    },

    count: {
      position: 'static',
      marginLeft: 'auto',
      paddingLeft: theme.spacing(1.5),
      transform: 'none',
      color: theme.palette.text.disabled,
    },

    actionRow: {
      position: 'sticky',
      zIndex: 1,
      bottom: -theme.spacing('xs'),

      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1.5, 0),
      marginTop: theme.spacing(-1.5),
      marginBottom: 0,
    },
  })
);

export interface IAlgoliaFiltersInlineProps extends IAlgoliaFiltersFieldsProps {
  applyFilters: () => void;
  clearFilters: () => void;
  hasUnappliedFilters: boolean;
  clearable: boolean;
}

export default function AlgoliaFiltersInline({
  applyFilters,
  clearFilters,
  hasUnappliedFilters,
  clearable,

  ...fieldsProps
}: IAlgoliaFiltersInlineProps) {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.root}>
      <Typography variant="overline" component="h2" className={classes.header}>
        Filter
      </Typography>

      <AlgoliaFiltersFields {...fieldsProps} />

      <Grid
        container
        spacing={1}
        justify="space-between"
        className={classes.actionRow}
      >
        <Grid item>
          <Button onClick={clearFilters} disabled={!clearable}>
            Clear
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => applyFilters()}
            disabled={!hasUnappliedFilters}
          >
            Apply Filter
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
