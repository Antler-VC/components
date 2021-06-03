import React, { useState, useEffect } from 'react';
import { SearchIndex } from 'algoliasearch/lite';
import { FacetHit } from '@algolia/client-search';
import useAlgolia from 'use-algolia';
import { useDebouncedCallback } from 'use-debounce';
import createPersistedState from 'use-persisted-state';

import AlgoliaFiltersSearch from './AlgoliaFiltersSearch';
import AlgoliaFiltersModal from './AlgoliaFiltersModal';
import AlgoliaFiltersInline from './AlgoliaFiltersInline';

import { useTheme, useMediaQuery } from '@material-ui/core';
import { MultiSelectProps } from '@antlerengineering/multiselect';

const NUMERIC_OPERATORS = ['<', '<=', '=', '!=', '>=', '>'];
/**
 * Generates the string to dispatch as filters for the query
 * @param filterValues The user-selected filters
 * @param requiredFilters Filters not selected by the user
 */
export const generateFiltersString = (
  filterValues: Record<string, string[]>,
  requiredFilters: string = ''
) => {
  if (Object.keys(filterValues).length === 0) return requiredFilters;

  let filtersString = Object.entries(filterValues)
    .filter(([, values]) => values.length > 0)
    .map(
      ([facet, values]) =>
        `(${values
          .map(
            value =>
              facet +
              (NUMERIC_OPERATORS.includes(value.charAt(0))
                ? ` ${value}`
                : `:"${value.replace(/"/g, '\\"')}"`)
          )
          .join(' OR ')})`
    )
    .join(' AND ');

  if (requiredFilters) {
    if (filtersString)
      filtersString = requiredFilters + ' AND ' + filtersString;
    else filtersString = requiredFilters;
  }

  return filtersString;
};

export interface IAlgoliaFiltersProps {
  index: SearchIndex | null;
  request: ReturnType<typeof useAlgolia>[0]['request'];
  requestDispatch: ReturnType<typeof useAlgolia>[1];
  requiredFilters?: string;
  defaultFilterValues?: Record<string, string[]>;

  label: string;
  filters: {
    facet: string;
    label: string;
    labelTransformer?: (value: string) => string;
    Component?: React.ComponentType<AlgoliaFiltersComponentProps>;
    initiallyDisplayed?: boolean;
  }[];
  search?: boolean;

  persistedStateId?: string;
  sideFilters: boolean;
}

export type AlgoliaFiltersComponentProps = {
  hits: readonly FacetHit[];
  value: string[];
  onChange: (value: string[]) => void;
  MultiSelectProps: Omit<MultiSelectProps<string>, 'value' | 'onChange'>;
};
export type FilterValues = Record<string, string[]>;
export type FacetValues = Record<string, readonly FacetHit[]>;

export default function AlgoliaFilters({
  index,
  request,
  requestDispatch,
  requiredFilters,
  defaultFilterValues,

  label,
  filters,
  search = true,
  persistedStateId,
  sideFilters,
}: IAlgoliaFiltersProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  // Optionally persist state in localStorage
  const useFilterState =
    persistedStateId !== undefined && persistedStateId !== ''
      ? createPersistedState('algoliaFilters-' + persistedStateId)
      : useState;

  // Store filter values
  const [filterValues, setFilterValues] = useFilterState<FilterValues>(
    defaultFilterValues ?? {}
  );

  // Store facet values
  const [facetValues, setFacetValues] = useState<FacetValues>({});
  // Get facet values
  useEffect(() => {
    if (!index) return;

    const newFacetValues: typeof facetValues = {};

    const allQueries = filters.map(filter => {
      const params = { ...request, maxFacetHits: 100 };
      // Ignore current user-selected value for these filters so all options
      // continue to show up
      params.filters =
        generateFiltersString(
          { ...filterValues, [filter.facet]: [] },
          requiredFilters
        ) ?? '';

      return index
        .searchForFacetValues(filter.facet, '', params)
        .then(({ facetHits }) => (newFacetValues[filter.facet] = facetHits));
    });

    Promise.all(allQueries).then(() =>
      setFacetValues(other => ({ ...other, ...newFacetValues }))
    );
  }, [filters, index, filterValues, requiredFilters]);

  // Store modal state here so we can close the modal when user changes filters
  const [openModal, setOpenModal] = useState(false);

  // Push filter values to dispatch
  const applyFilters = (override?: typeof filterValues) => {
    const filtersToApply = override ?? filterValues;

    const filtersString = generateFiltersString(
      filtersToApply,
      requiredFilters
    );
    if (filtersString === null) return;
    requestDispatch({ filters: filtersString, page: 0 });
    if (openModal) setOpenModal(false);
  };

  // On load, request filterValues from persisted local storage state
  useEffect(() => {
    applyFilters();
  }, []);

  // When the user clears filterValues here, but AlgoliaLayout runs a
  // getDefaultFilters function and applies defaultFilters, ensure this UI
  // displays the defaultFilters
  useEffect(() => {
    if (Object.keys(filterValues).length > 0 || !defaultFilterValues) return;

    if (
      generateFiltersString(defaultFilterValues, requiredFilters) ===
      request.filters
    ) {
      setFilterValues(defaultFilterValues);
      applyFilters(defaultFilterValues);
    }
  }, [defaultFilterValues, filterValues, request.filters]);

  // Check for any unapplied filters
  const hasUnappliedFilters =
    (generateFiltersString(filterValues, requiredFilters) ?? '') !==
    request.filters;

  // Reset filters
  const clearFilters = () => {
    setFilterValues({});
    requestDispatch({ filters: requiredFilters ?? '', page: 0 });
    if (openModal) setOpenModal(false);
  };
  const clearable = Object.keys(filterValues).length !== 0;

  const [filtersCount, setFiltersCount] = useState(0);
  useEffect(() => {
    if (hasUnappliedFilters) return;

    const newCount = Object.values(filterValues).reduce(
      (a, c) => a + (Array.isArray(c) && c.length > 0 ? 1 : 0),
      0
    );
    if (filtersCount !== newCount) setFiltersCount(newCount);
  }, [hasUnappliedFilters, filterValues, filtersCount]);

  // Store search query
  const [query, setQuery] = useState('');
  const [handleQueryChange] = useDebouncedCallback(
    (query: string) => requestDispatch({ query }),
    500
  );

  const searchComponent = search ? (
    <AlgoliaFiltersSearch
      query={query}
      setQuery={setQuery}
      handleQueryChange={handleQueryChange}
      label={label}
    />
  ) : null;

  if (filters.length === 0) return searchComponent;

  return (
    <>
      {searchComponent}

      {isTablet || !sideFilters ? (
        <AlgoliaFiltersModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          filtersCount={filtersCount}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          hasUnappliedFilters={hasUnappliedFilters}
          clearable={clearable}
          filters={filters}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          facetValues={facetValues}
        />
      ) : (
        <AlgoliaFiltersInline
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          hasUnappliedFilters={hasUnappliedFilters}
          clearable={clearable}
          filters={filters}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          facetValues={facetValues}
        />
      )}
    </>
  );
}
