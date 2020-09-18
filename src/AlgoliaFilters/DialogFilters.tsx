import React, { useState } from 'react';

import {
  makeStyles,
  createStyles,
  Grid,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogContent,
  Typography,
  ListItemSecondaryAction,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import MultiSelect from '@antlerengineering/multiselect';

import {
  IAlgoliaFiltersPassedProps,
  IAlgoliaFiltersInternalProps,
} from './AlgoliaFilters';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      margin: theme.spacing(-2, -2, 1, -1),
      width: `calc(100% + ${theme.spacing(3)}px)`,
    },

    searchBox: {
      paddingTop: 14,
      paddingBottom: 15,
    },

    count: {
      position: 'static',
      marginLeft: 'auto',
      paddingLeft: theme.spacing(1.5),
      transform: 'none',
      color: theme.palette.text.disabled,
    },

    closeButton: { marginRight: theme.spacing(-1.5) },
    actionBar: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  })
);

export default function DialogFilters({
  label,
  filters,
  search = true,

  filterValues,
  setFilterValues,
  facetValues,
  handleResetFilters,
  query,
  setQuery,
  handleQueryChange,
}: IAlgoliaFiltersPassedProps & IAlgoliaFiltersInternalProps) {
  const classes = useStyles();

  const [showDialog, setShowDialog] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  if (search && showSearch)
    return (
      <Grid container spacing={1} alignItems="center" className={classes.root}>
        <Grid item xs>
          <TextField
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              handleQueryChange(e.target.value);
            }}
            variant="filled"
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              classes: { inputHiddenLabel: classes.searchBox },
            }}
            aria-label={`Search${label ? ' ' + label : ''}`}
            placeholder={`Search${label ? ' ' + label : ''}`}
            hiddenLabel
            fullWidth
            autoFocus
          />
        </Grid>

        <Grid item>
          <IconButton
            aria-label="Close search bar"
            onClick={() => setShowSearch(false)}
          >
            <DoneIcon />
          </IconButton>
        </Grid>
      </Grid>
    );

  const filtersLength = Object.values(filterValues).reduce(
    (a, c) => (c.length > 0 ? a + 1 : a),
    0
  );

  const handleClose = () => setShowDialog(false);

  return (
    <>
      <Grid container spacing={1} alignItems="center" className={classes.root}>
        <Grid item xs>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowDialog(true)}
          >
            Filters{filtersLength > 0 && `: ${filtersLength}`}
          </Button>
        </Grid>

        {search && (
          <Grid item>
            <IconButton
              aria-label={`Search ${label}`}
              color={query ? 'primary' : 'default'}
              onClick={() => setShowSearch(true)}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>

      <Dialog open={showDialog} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogContent>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs>
              <Typography variant="h6" color="textSecondary">
                Filters
              </Typography>
            </Grid>

            <Grid item>
              <IconButton
                onClick={handleClose}
                aria-label="Close filters"
                className={classes.closeButton}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container spacing={1} direction="column" wrap="nowrap">
            {filters.map(({ Component, ...filter }) => {
              const hits = facetValues[filter.facet] ?? [];
              const value = filterValues[filter.facet] ?? [];
              const onChange = (value: string[]) =>
                setFilterValues(other => ({ ...other, [filter.facet]: value }));

              const MultiSelectProps = {
                label: filter.label,
                options:
                  hits.map(item => ({
                    value: item.value,
                    label: filter.labelTransformer
                      ? filter.labelTransformer(item.value)
                      : item.value,
                    count: item.count,
                  })) ?? [],
                itemRenderer: (option: {
                  value: string;
                  label: string;
                  count?: number;
                }) => (
                  <React.Fragment key={option.value}>
                    {option.label}
                    <ListItemSecondaryAction className={classes.count}>
                      <Typography
                        variant="body2"
                        color="inherit"
                        component="span"
                      >
                        {(option as any).count}
                      </Typography>
                    </ListItemSecondaryAction>
                  </React.Fragment>
                ),
                searchable: facetValues[filter.facet]?.length > 10,
                multiple: true,
              } as const;

              return (
                <Grid item key={filter.facet}>
                  {Component ? (
                    <Component
                      hits={hits}
                      value={value}
                      onChange={onChange}
                      MultiSelectProps={MultiSelectProps}
                    />
                  ) : (
                    <MultiSelect
                      {...MultiSelectProps}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>

          <Grid container justify="space-between" className={classes.actionBar}>
            <Button
              onClick={handleResetFilters}
              disabled={query === '' && Object.keys(filterValues).length === 0}
            >
              Clear
            </Button>

            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              size="large"
            >
              Done
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
