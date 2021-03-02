import React, { useState, useEffect } from 'react';
import useAlgolia from 'use-algolia';
import { FacetHit } from '@algolia/client-search';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

import { AlgoliaContext } from './AlgoliaContext';
import AlgoliaFilters, {
  IAlgoliaFiltersProps,
  generateFiltersString,
} from '../../AlgoliaFilters/AlgoliaFilters';
import Loading from '../../FullScreens/Loading';
import EmptyState, { IEmptyStateProps } from '../../FullScreens/EmptyState';
import ResultsHeader from '../../ContentHeader/ResultsHeader';

const useStyles = makeStyles(theme =>
  createStyles({
    sideFilters: {
      [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridTemplateColumns: '[start] repeat(var(--num-cards), 1fr) [end]',
        columnGap: 'var(--grid-gutter)',
        alignItems: 'flex-start',
      },
    },

    filters: {
      display: 'grid',
      gridTemplateColumns: '[start] repeat(var(--num-cards), 1fr) [end]',
      columnGap: 'var(--grid-gutter)',
      rowGap: 'var(--grid-gutter)',

      '$sideFilters &': {
        [theme.breakpoints.up('md')]: {
          gridColumn: 'start',
          gridRow: 1,

          gridTemplateColumns: '[start] 1fr [end]',
        },
      },
    },

    content: {
      paddingTop: theme.spacing('m') - 1,

      '$sideFilters &': {
        [theme.breakpoints.up('md')]: {
          gridColumn: '2 / end',
          gridRow: 1,
        },

        '--num-cards': 1,
        [theme.breakpoints.up('sm')]: { '--num-cards': 2 },
        [theme.breakpoints.up('lg')]: { '--num-cards': 3 },
      },
    },
  })
);

export interface IAlgoliaLayoutProps {
  appId: Parameters<typeof useAlgolia>[0];
  searchKey: Parameters<typeof useAlgolia>[1];
  indexName: Parameters<typeof useAlgolia>[2];
  initialRequest: Parameters<typeof useAlgolia>[3];

  requiredFilters?: string;
  filters?: IAlgoliaFiltersProps['filters'];
  label: string;
  AlgoliaFiltersProps?: Partial<IAlgoliaFiltersProps>;
  getDefaultFilters?: (
    getFacetValue: (facet: string) => Promise<FacetHit[]>
  ) => Promise<Record<string, string[]>>;

  children: React.ReactNode;

  loadingElement?: React.ReactNode;
  EmptyStateIcon?: IEmptyStateProps['Icon'];
  emptyProps?: Partial<IEmptyStateProps>;
  noResultsProps?: Partial<IEmptyStateProps>;
  sideFilters?: boolean;
  contentAfterFilters?: React.ReactNode;
}

export default function AlgoliaLayout({
  appId,
  searchKey,
  indexName,
  initialRequest,

  requiredFilters = '',
  filters = [],
  label,
  AlgoliaFiltersProps,
  getDefaultFilters,

  children,

  loadingElement,
  EmptyStateIcon,
  emptyProps,
  noResultsProps,
  sideFilters = true,
  contentAfterFilters,
}: IAlgoliaLayoutProps) {
  const classes = useStyles();

  const [
    algoliaState,
    requestDispatch,
    getMore,
    setAlgoliaConfig,
    query,
  ] = useAlgolia(appId, searchKey, indexName, {
    // Set requiredFilters here if not present in initialRequest
    filters: requiredFilters,
    ...initialRequest,
    // Default hitsPerPage to 0 if awaiting default filters
    hitsPerPage: getDefaultFilters ? 0 : initialRequest?.hitsPerPage,
  });

  // Store defaultFilters so they can be shown in UI
  const [defaultFilters, setDefaultFilters] = useState<
    Record<string, string[]> | undefined
  >(undefined);
  // Ensure we only call getDefaultFilters once
  const [requestedDefaultFilters, setRequestedDefaultFilters] = useState(false);
  // Call getDefaultFilters if the prop is present
  useEffect(() => {
    if (!getDefaultFilters || requestedDefaultFilters || !algoliaState.index)
      return;

    setRequestedDefaultFilters(true);
    // Helper function to query Algolia index’s facet values
    const getFacetValue = async (facet: string) =>
      algoliaState
        .index!.searchForFacetValues(facet, '', {
          ...algoliaState.request,
          maxFacetHits: 100,
        })
        .then(({ facetHits }) => facetHits);

    getDefaultFilters(getFacetValue).then(res => {
      setDefaultFilters(res);
      // Make new Algolia request with default filters
      requestDispatch({
        filters: generateFiltersString(res, requiredFilters) || '',
        hitsPerPage: initialRequest?.hitsPerPage,
      });
    });
  }, [
    algoliaState.index,
    algoliaState.request,
    requestedDefaultFilters,
    getDefaultFilters,
  ]);
  // If awaiting defaultFilters query result — prevents “No Results” flash
  if (!algoliaState.response || algoliaState.response.hitsPerPage === 0)
    return <Loading />;

  // True if loading a new query and NOT loading more
  const isLoading =
    !algoliaState.index ||
    ((algoliaState.loading || !algoliaState.response) &&
      algoliaState.hits.length === 0);

  const isLoadingMore = algoliaState.loading && !isLoading;

  const isFiltered =
    algoliaState.request.filters !== requiredFilters ||
    !!algoliaState.request.query;

  const noResults = !isLoading && algoliaState.hits.length === 0;
  const isEmpty = noResults && !isFiltered;

  return (
    <div className={sideFilters ? classes.sideFilters : ''}>
      <div className={classes.filters}>
        <AlgoliaFilters
          index={algoliaState.index}
          request={algoliaState.request}
          requestDispatch={requestDispatch}
          requiredFilters={requiredFilters}
          defaultFilterValues={defaultFilters}
          label={label}
          filters={filters}
          search
          persistedStateId={window.location.pathname}
          sideFilters={sideFilters}
          {...AlgoliaFiltersProps}
        />

        {contentAfterFilters}
      </div>

      <div className={classes.content}>
        {!isEmpty && (
          <ResultsHeader
            text={!isFiltered ? `All ${label}` : 'Results for all filters'}
          >
            <Typography
              variant="overline"
              color="textSecondary"
              style={{ marginLeft: 'auto' }}
            >
              {algoliaState.response?.nbHits}
            </Typography>
          </ResultsHeader>
        )}

        {isLoading ? (
          loadingElement ?? <Loading />
        ) : isEmpty ? (
          <EmptyState
            message="No results"
            Icon={EmptyStateIcon}
            {...emptyProps}
          />
        ) : noResults ? (
          <EmptyState
            message="No results"
            Icon={EmptyStateIcon}
            {...noResultsProps}
          />
        ) : (
          <AlgoliaContext.Provider
            value={{
              algoliaState,
              requestDispatch,
              getMore,
              setAlgoliaConfig,
              query,

              isLoading,
              isLoadingMore,
              isFiltered,
              noResults,
              isEmpty,
            }}
          >
            {children}
          </AlgoliaContext.Provider>
        )}
      </div>
    </div>
  );
}
