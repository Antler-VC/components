import React, { useState, useEffect } from 'react';
import _isEqual from 'lodash/isEqual';
import createPersistedState from 'use-persisted-state';

import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  ListItemSecondaryAction,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

import MultiSelect from '@antlerengineering/multiselect';

import {
  IAlgoliaFiltersPassedProps,
  IAlgoliaFiltersInternalProps,
} from './AlgoliaFilters';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginBottom: theme.spacing(3) },

    resetFilters: { marginRight: -theme.spacing(1) },

    filterGrid: { marginTop: 0 },

    listItemText: { whiteSpace: 'pre-line' },
    count: {
      position: 'static',
      marginLeft: 'auto',
      paddingLeft: theme.spacing(1.5),
      transform: 'none',
      color: theme.palette.text.disabled,
    },

    filterSelectRow: { marginTop: theme.spacing(2) },
  })
);

export const MIN_DISPLAYED_FILTERS = 3;

const getInitiallyDisplayedFilters = (
  filters: IAlgoliaFiltersPassedProps['filters'],
  setFilters: string[]
) => {
  const displayedFilters: string[] = [];

  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    if (filter.initiallyDisplayed || setFilters.indexOf(filter.facet) > -1)
      displayedFilters.push(filter.facet);
  }

  let j = 0;
  while (displayedFilters.length < 3 && j < filters.length) {
    if (displayedFilters.indexOf(filters[j].facet) < 0)
      displayedFilters.push(filters[j].facet);
    j++;
  }

  return displayedFilters;
};

export default function InlineFilters({
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
  persistedStateId,
}: IAlgoliaFiltersPassedProps & IAlgoliaFiltersInternalProps) {
  const classes = useStyles();

  const setFilters = Object.keys(filterValues).filter(
    key => filterValues[key].length > 0
  );

  // Store displayed filters in persisted state
  const useDisplayedFiltersState =
    persistedStateId !== undefined && persistedStateId !== ''
      ? createPersistedState('algoliaFilters-displayed-' + persistedStateId)
      : useState;
  const [displayedFilters, setDisplayedFilters] = useDisplayedFiltersState(
    getInitiallyDisplayedFilters(filters, setFilters)
  );
  useEffect(() => {
    if (setFilters.length > 0) {
      const filtersToDisplay = Array.from(
        new Set([...setFilters, ...displayedFilters])
      );
      if (!_isEqual(displayedFilters, filtersToDisplay)) {
        console.log(filtersToDisplay);
        setDisplayedFilters(filtersToDisplay);
      }
    }
  }, [setFilters]);

  const [filterSelectOpen, setFilterSelectOpen] = useState<EventTarget | null>(
    null
  );
  const handleFilterSelectClose = () => setFilterSelectOpen(null);

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs>
          <Typography variant="overline">
            Filter{label ? ' ' + label : 's'}
          </Typography>
        </Grid>

        <Grid item>
          <Button
            color="primary"
            onClick={handleResetFilters}
            className={classes.resetFilters}
            disabled={query === '' && Object.keys(filterValues).length === 0}
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        alignItems="center"
        className={classes.filterGrid}
      >
        {search && (
          <Grid item xs={12} md={3}>
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
              }}
              aria-label={`Search${label ? ' ' + label : ''}`}
              placeholder={`Search${label ? ' ' + label : ''}`}
              hiddenLabel
              fullWidth
            />
          </Grid>
        )}

        {filters.map(({ Component, ...filter }) => {
          if (displayedFilters.indexOf(filter.facet) === -1) return null;

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
                  <Typography variant="body2" color="inherit" component="span">
                    {option.count}
                  </Typography>
                </ListItemSecondaryAction>
              </React.Fragment>
            ),
            searchable: facetValues[filter.facet]?.length > 10,
            multiple: true,
          } as const;

          return (
            <Grid item key={filter.facet} xs={12} sm={6} md={3}>
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

      {filters.length > 3 && (
        <div className={classes.filterSelectRow}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={e => setFilterSelectOpen(e.target)}
          >
            Filters: {displayedFilters.length}
          </Button>

          <MultiSelect
            multiple
            options={filters.map(x => ({
              label: x.label,
              value: x.facet,
              disabled: setFilters.indexOf(x.facet) > -1,
            }))}
            value={displayedFilters}
            onChange={setDisplayedFilters}
            TextFieldProps={{
              SelectProps: {
                open: !!filterSelectOpen,
                MenuProps: { anchorEl: filterSelectOpen as any },
              },
              style: { display: 'none' },
            }}
            onClose={handleFilterSelectClose}
            label="Filters"
            labelPlural="filters"
          />
        </div>
      )}
    </div>
  );
}
