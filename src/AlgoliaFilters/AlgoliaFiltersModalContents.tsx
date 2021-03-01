import React from 'react'
import {
  IAlgoliaFiltersProps,
  FilterValues,
  FacetValues,
} from './AlgoliaFilters'

import {
  makeStyles,
  createStyles,
  Grid,
  ListItemSecondaryAction,
  Typography,
  Button,
} from '@material-ui/core'
import MultiSelect from '@antlerengineering/multiselect'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing('s', 'xs', 'xs'),
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
      bottom: 0,

      backgroundColor: theme.palette.background.paper,
    },
  })
)

export interface IAlgoliaFiltersModalContentsProps {
  filters: IAlgoliaFiltersProps['filters']
  filterValues: FilterValues
  setFilterValues: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >
  facetValues: FacetValues

  applyFilters: () => void
  resetFilters: () => void
  hasUnappliedFilters: boolean
}

export default function AlgoliaFiltersModalContents({
  filters,
  filterValues,
  setFilterValues,
  facetValues,

  applyFilters,
  resetFilters,
  hasUnappliedFilters,
}: IAlgoliaFiltersModalContentsProps) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="overline" component="h2" className={classes.header}>
        Filter
      </Typography>

      <Grid container spacing={3}>
        {filters.map(({ Component, ...filter }) => {
          const hits = facetValues[filter.facet] ?? []
          const value = filterValues[filter.facet] ?? []
          const onChange = (value: string[]) =>
            setFilterValues(other => ({ ...other, [filter.facet]: value }))

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
              value: string
              label: string
              count?: number
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
          } as const

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
          )
        })}

        <Grid item xs={12} className={classes.actionRow}>
          <Grid container spacing={1} justify="space-between">
            <Grid item>
              <Button
                onClick={resetFilters}
                disabled={Object.keys(filterValues).length === 0}
              >
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
        </Grid>
      </Grid>
    </div>
  )
}
