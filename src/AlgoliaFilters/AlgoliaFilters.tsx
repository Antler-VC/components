import React, { useState, useEffect } from 'react';
import { SearchIndex } from 'algoliasearch/lite';
import { FacetHit } from '@algolia/client-search';
import useAlgolia from 'use-algolia';
import { useDebouncedCallback } from 'use-debounce';

import InlineFilters from './InlineFilters';
import DialogFilters from './DialogFilters';

import { MOBILE_NAV } from '../constants';
import { useMediaQuery } from '@material-ui/core';

/**
 * Generates the string to dispatch as filters for the query
 * @param filterValues The user-selected filters
 * @param requiredFilters Filters not selected by the user
 */
const generateFiltersString = (
  filterValues: Record<string, string[]>,
  requiredFilters?: string
) => {
  if (Object.keys(filterValues).length === 0) return null;

  let filtersString = Object.entries(filterValues)
    .filter(([, values]) => values.length > 0)
    .map(
      ([facet, values]) =>
        `(${values
          .map(value => `${facet}:"${value.replace(/"/g, '\\"')}"`)
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

export interface IAlgoliaFiltersProps extends IAlgoliaFiltersPassedProps {
  index: SearchIndex | null;
  request: ReturnType<typeof useAlgolia>[0]['request'];
  requestDispatch: ReturnType<typeof useAlgolia>[1];
  requiredFilters?: string;
}

export interface IAlgoliaFiltersPassedProps {
  label: string;
  filters: {
    label: string;
    facet: string;
    labelTransformer?: (value: string) => string;
  }[];
  search?: boolean;
}

export interface IAlgoliaFiltersInternalProps {
  filterValues: Record<string, string[]>;
  setFilterValues: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  facetValues: Record<string, readonly FacetHit[]>;
  handleResetFilters: () => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleQueryChange: (query: string) => void;
}

export default function AlgoliaFilters({
  index,
  request,
  requestDispatch,
  requiredFilters,

  label,
  filters,
  search = true,
}: IAlgoliaFiltersProps) {
  // Store filter values
  const [filterValues, setFilterValues] = useState<
    IAlgoliaFiltersInternalProps['filterValues']
  >({});
  // Push filter values to dispatch
  useEffect(() => {
    const filtersString = generateFiltersString(filterValues, requiredFilters);
    if (filtersString === null) return;
    requestDispatch({ filters: filtersString, page: 0 });
  }, [filterValues]);

  // Store facet values
  const [facetValues, setFacetValues] = useState<
    IAlgoliaFiltersInternalProps['facetValues']
  >({});
  // Get facet values
  useEffect(() => {
    if (!index) return;

    filters.forEach(filter => {
      const params = { ...request, maxFacetHits: 100 };
      // Ignore current user-selected value for these filters so all options
      // continue to show up
      params.filters =
        generateFiltersString(
          { ...filterValues, [filter.facet]: [] },
          requiredFilters
        ) ?? '';

      index
        .searchForFacetValues(filter.facet, '', params)
        .then(({ facetHits }) =>
          setFacetValues(other => ({ ...other, [filter.facet]: facetHits }))
        );
    });
  }, [filters, index, filterValues, requiredFilters]);

  // Reset filters
  const handleResetFilters = () => {
    setFilterValues({});
    setQuery('');
    requestDispatch({ filters: requiredFilters ?? '', query: '', page: 0 });
  };

  // Store search query
  const [query, setQuery] = useState('');
  const [handleQueryChange] = useDebouncedCallback(
    (query: string) => requestDispatch({ query }),
    500
  );

  const props = {
    label,
    filters,
    search,

    filterValues,
    setFilterValues,
    facetValues,
    handleResetFilters,
    query,
    setQuery,
    handleQueryChange,
  };

  const isMobile = useMediaQuery(MOBILE_NAV);

  if (isMobile) return <DialogFilters {...props} />;
  return <InlineFilters {...props} />;
}
