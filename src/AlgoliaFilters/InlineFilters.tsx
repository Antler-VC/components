import React from 'react';

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

import MultiSelect from '@antlerengineering/multiselect';

import {
  IAlgoliaFiltersPassedProps,
  IAlgoliaFiltersInternalProps,
} from './AlgoliaFilters';

const useStyles = makeStyles(theme =>
  createStyles({
    resetFilters: { marginRight: -theme.spacing(1) },

    filterGrid: {
      marginTop: 0,
      marginBottom: theme.spacing(3),
    },

    listItemText: { whiteSpace: 'pre-line' },
    count: {
      position: 'static',
      marginLeft: 'auto',
      paddingLeft: theme.spacing(1.5),
      transform: 'none',
      color: theme.palette.text.disabled,
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

  return (
    <div>
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
          <Grid item xs={12} md={4} lg={3}>
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

        {filters.map(filter => (
          <Grid item key={filter.facet} xs={12} sm={6} md={4} lg={3}>
            <MultiSelect
              label={filter.label}
              value={filterValues[filter.facet] ?? []}
              onChange={(value: string[]) =>
                setFilterValues(other => ({ ...other, [filter.facet]: value }))
              }
              options={
                facetValues[filter.facet]?.map(item => ({
                  value: item.value,
                  label: filter.labelTransformer
                    ? filter.labelTransformer(item.value)
                    : item.value,
                  count: item.count,
                })) ?? []
              }
              itemRenderer={option => (
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
              )}
              searchable={facetValues[filter.facet]?.length > 10}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
