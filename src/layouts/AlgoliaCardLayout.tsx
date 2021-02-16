import React from 'react';
import useAlgolia from 'use-algolia';

import {
  makeStyles,
  createStyles,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core';

import AlgoliaFilters, {
  IAlgoliaFiltersProps,
} from '../AlgoliaFilters/AlgoliaFilters';
import EmptyState, { IEmptyStateProps } from '../EmptyState';
// import CardSkeleton from '../Card/CardSkeleton';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100% + 24px + 64px)',
    },

    divider: {
      margin: theme.spacing(1.25, -1, 1),

      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(1.25, -2, 1),
      },
    },

    gridContainer: {
      flex: 1,
      margin: theme.spacing(-1),
    },
    fixedSizeGrid: {
      overflowX: 'hidden !important' as 'hidden',
      paddingBottom: theme.spacing(96 / 8) + 'px !important',
    },

    gridItem: { padding: theme.spacing(1) },
  })
);

export interface IAlgoliaCardLayoutProps {
  useAlgoliaProps: Parameters<typeof useAlgolia>;
  requiredFilters?: string;
  filters?: IAlgoliaFiltersProps['filters'];
  label: string;
  AlgoliaFiltersProps?: Partial<IAlgoliaFiltersProps>;
  minCardWidth?: number;
  maxColumns?: number;
  cardHeight?: number;
  render: (
    hit: any,
    query: ReturnType<typeof useAlgolia>[4]
  ) => React.ReactNode;
  skeleton?: React.ReactNode;
  EmptyStateIcon?: IEmptyStateProps['Icon'];
  emptyProps?: Partial<IEmptyStateProps>;
  noResultsProps?: Partial<IEmptyStateProps>;
}

export default function AlgoliaCardLayout({
  useAlgoliaProps,
  requiredFilters = '',
  filters,
  label,
  AlgoliaFiltersProps,
  minCardWidth = 300,
  maxColumns = 4,
  cardHeight = 500,
  render,
  skeleton,
  EmptyStateIcon,
  emptyProps,
  noResultsProps,
}: IAlgoliaCardLayoutProps) {
  const classes = useStyles();

  const [algoliaState, requestDispatch, getMore, , query] = useAlgolia(
    ...useAlgoliaProps
  );

  const loadMoreItems = async (_: number, stopIndex: number) => {
    if (stopIndex > algoliaState.hits.length - 1) getMore();
  };

  const isFiltered =
    algoliaState.response &&
    (algoliaState.request.filters !== requiredFilters ||
      algoliaState.request.query);

  const noResults = algoliaState.hits.length === 0 && algoliaState.response;
  const isEmpty = noResults && algoliaState.request.query === undefined;

  return (
    <div className={classes.root}>
      {filters && (
        <AlgoliaFilters
          index={algoliaState.index}
          request={algoliaState.request}
          requestDispatch={requestDispatch}
          requiredFilters={requiredFilters}
          label={label}
          filters={filters}
          search
          {...AlgoliaFiltersProps}
        />
      )}

      {!isEmpty && (
        <>
          <Grid container justify="space-between">
            <Typography
              variant="overline"
              display="block"
              color="textSecondary"
            >
              {!isFiltered ? `All ${label}` : 'Results for all filters'}
            </Typography>
            <Typography
              variant="overline"
              display="block"
              color="textSecondary"
            >
              {algoliaState.response?.nbHits}
            </Typography>
          </Grid>

          <Divider className={classes.divider} />
        </>
      )}

      {isEmpty ? (
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
        <div className={classes.gridContainer}>
          <AutoSizer>
            {({ height, width }) => {
              const itemCount = algoliaState.loading
                ? algoliaState.hits.length + 3
                : algoliaState.hits.length;

              const columnCount = Math.min(
                Math.floor(width / minCardWidth),
                maxColumns
              );

              return (
                <InfiniteLoader
                  isItemLoaded={i => i < algoliaState.hits.length}
                  itemCount={itemCount}
                  loadMoreItems={loadMoreItems}
                >
                  {({ onItemsRendered, ref }) => (
                    <FixedSizeGrid
                      height={height}
                      width={width}
                      className={classes.fixedSizeGrid}
                      columnCount={columnCount}
                      columnWidth={width / columnCount}
                      rowCount={Math.ceil(itemCount / columnCount)}
                      rowHeight={cardHeight}
                      onItemsRendered={({
                        visibleRowStartIndex,
                        visibleRowStopIndex,
                        overscanRowStopIndex,
                        overscanRowStartIndex,
                      }) => {
                        onItemsRendered({
                          overscanStartIndex:
                            overscanRowStartIndex * columnCount,
                          overscanStopIndex:
                            (overscanRowStopIndex + 1) * columnCount - 1,
                          visibleStartIndex: visibleRowStartIndex * columnCount,
                          visibleStopIndex:
                            (visibleRowStopIndex + 1) * columnCount - 1,
                        });
                      }}
                      ref={ref}
                    >
                      {({ rowIndex, columnIndex, style }) => {
                        const index = rowIndex * columnCount + columnIndex;
                        const loading = index >= algoliaState.hits.length;

                        if (index >= itemCount) return null;

                        return (
                          <div className={classes.gridItem} style={style}>
                            {!loading
                              ? render(algoliaState.hits[index], query)
                              : skeleton || null
                            // TODO:<CardSkeleton />
                            }
                          </div>
                        );
                      }}
                    </FixedSizeGrid>
                  )}
                </InfiniteLoader>
              );
            }}
          </AutoSizer>
        </div>
      )}
    </div>
  );
}
