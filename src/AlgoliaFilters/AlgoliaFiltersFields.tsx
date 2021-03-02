import React from 'react';
import {
  IAlgoliaFiltersProps,
  FilterValues,
  FacetValues,
} from './AlgoliaFilters';

import {
  makeStyles,
  createStyles,
  Grid,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';
import MultiSelect from '@antlerengineering/multiselect';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginBottom: 0 },

    count: {
      position: 'static',
      marginLeft: 'auto',
      paddingLeft: theme.spacing(1.5),
      transform: 'none',
      color: theme.palette.text.disabled,
    },
  })
);

export interface IAlgoliaFiltersFieldsProps {
  filters: IAlgoliaFiltersProps['filters'];
  filterValues: FilterValues;
  setFilterValues: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  facetValues: FacetValues;
}

export default function AlgoliaFiltersFields({
  filters,
  filterValues,
  setFilterValues,
  facetValues,
}: IAlgoliaFiltersFieldsProps) {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
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
                <Typography variant="body2" color="inherit" component="span">
                  {(option as any).count}
                </Typography>
              </ListItemSecondaryAction>
            </React.Fragment>
          ),
          searchable: facetValues[filter.facet]?.length > 10,
          multiple: true,
        } as const;

        return (
          <Grid item key={filter.facet} xs={12} sm={6} md={12}>
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
  );
}
