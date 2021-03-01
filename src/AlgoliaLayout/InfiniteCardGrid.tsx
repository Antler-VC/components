import React, { useState, useEffect } from 'react';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

import {
  InfiniteLoader,
  WindowScroller,
  AutoSizer,
  Grid,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

import { useAlgoliaContext } from './AlgoliaContext';
import CardSkeleton from '../Card/CardSkeleton';

const useStyles = makeStyles(() =>
  createStyles({
    gridContainer: {
      margin: 'calc(var(--grid-gutter) / -2)',
    },

    gridItem: {
      padding: 'calc(var(--grid-gutter) / 2)',
      '& > *': { minHeight: '100%' },
    },
  })
);

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 600,
});

export interface IInfiniteCardGridRenderProps {
  data: Record<string, any>;
  measure?: () => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export interface IInfiniteCardGridProps {
  render: (props: IInfiniteCardGridRenderProps) => React.ReactNode;
  skeleton?: React.ReactNode;
}

export default function InfiniteCardGrid({
  render,
  skeleton,
}: IInfiniteCardGridProps) {
  const classes = useStyles();

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const columnCount = isLg ? 3 : isSm ? 2 : 1;

  const { algoliaState, getMore } = useAlgoliaContext();

  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  useEffect(() => {
    setExpandedRows({});
    cache.clearAll();
  }, [algoliaState.request.filters, algoliaState.request.query]);

  return (
    <div className={classes.gridContainer}>
      <InfiniteLoader
        isRowLoaded={({ index }) => index < algoliaState.hits.length}
        loadMoreRows={async ({ stopIndex }) => {
          if (stopIndex > algoliaState.hits.length - 1) getMore();
        }}
        rowCount={algoliaState.response?.nbHits ?? 1000}
      >
        {({ onRowsRendered, registerChild: registerInfiniteLoaderChild }) => (
          <WindowScroller>
            {({ height, isScrolling, registerChild, scrollTop }) => (
              <div style={{ flex: '1 1 auto' }}>
                <AutoSizer disableHeight>
                  {({ width }) => {
                    const itemCount = algoliaState.loading
                      ? algoliaState.hits.length + 3
                      : algoliaState.hits.length;

                    const rowCount = Math.ceil(itemCount / columnCount);
                    const columnWidth = width / columnCount;

                    return (
                      <div ref={registerChild}>
                        <Grid
                          width={width}
                          height={height}
                          autoHeight
                          columnCount={columnCount}
                          columnWidth={columnWidth}
                          rowCount={rowCount}
                          rowHeight={cache.rowHeight}
                          deferredMeasurementCache={cache}
                          isScrolling={isScrolling}
                          scrollTop={scrollTop}
                          overscanRowCount={2}
                          ref={registerInfiniteLoaderChild}
                          onSectionRendered={({
                            columnStartIndex,
                            columnStopIndex,
                            rowStartIndex,
                            rowStopIndex,
                          }) => {
                            const startIndex =
                              rowStartIndex * columnCount + columnStartIndex;
                            const stopIndex =
                              rowStopIndex * columnCount + columnStopIndex;

                            onRowsRendered({ startIndex, stopIndex });
                          }}
                          cellRenderer={({
                            rowIndex,
                            columnIndex,
                            style,
                            key,
                            parent,
                          }) => {
                            const index = rowIndex * columnCount + columnIndex;
                            const loading = index >= algoliaState.hits.length;

                            if (index >= itemCount) return null;
                            if (loading) return null;

                            return (
                              <CellMeasurer
                                cache={cache}
                                columnIndex={columnIndex}
                                rowIndex={rowIndex}
                                key={key}
                                parent={parent}
                              >
                                {({ registerChild, measure }) => (
                                  <div
                                    className={classes.gridItem}
                                    style={{ ...style, width: columnWidth }}
                                    ref={registerChild as any}
                                  >
                                    {!loading
                                      ? render({
                                          data: algoliaState.hits[index],
                                          measure,
                                          expanded:
                                            expandedRows[rowIndex] || false,
                                          setExpanded: (expanded: boolean) =>
                                            setExpandedRows(curr => ({
                                              ...curr,
                                              [rowIndex]: expanded,
                                            })),
                                        })
                                      : skeleton || <CardSkeleton />}
                                  </div>
                                )}
                              </CellMeasurer>
                            );
                          }}
                        />
                      </div>
                    );
                  }}
                </AutoSizer>
              </div>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </div>
  );
}
