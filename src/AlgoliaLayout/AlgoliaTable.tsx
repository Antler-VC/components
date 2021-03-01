import React, { useState, useEffect, useRef } from 'react';
import { useWindowWidth } from '@react-hook/window-size/throttled';

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
} from '@material-ui/core';

import { useAlgoliaContext } from './AlgoliaContext';

export const ALGOLIA_TABLE_DEFAULT_HITS_PER_PAGE = 10;

export interface IAlgoliaTableProps {
  label: string;
  tableHead: React.ReactNode;
  renderRow: (hit: Record<string, any>) => React.ReactNode;
  sticky?: boolean;
}

export default function AlgoliaTable({
  label,
  tableHead,
  renderRow,
  sticky = false,
}: IAlgoliaTableProps) {
  const { algoliaState, requestDispatch } = useAlgoliaContext();

  const handleChangePage = (_, newPage: number) => {
    requestDispatch({ page: newPage });
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    requestDispatch({
      hitsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const windowSize = useWindowWidth({ fps: 1 });
  const tableScrollContainer = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);
  useEffect(() => {
    if (tableScrollContainer.current) {
      const newValue =
        tableScrollContainer.current.scrollWidth >
        tableScrollContainer.current.clientWidth;

      if (scrollable !== newValue) setScrollable(newValue);
    }
  }, [windowSize, scrollable]);

  return (
    <Paper className={sticky && scrollable ? 'sticky' : ''}>
      <TableContainer ref={tableScrollContainer}>
        <Table aria-label={label}>
          <TableHead>
            <TableRow>{tableHead}</TableRow>
          </TableHead>

          <TableBody>
            {algoliaState.hits.map((hit: Record<string, any>) => (
              <TableRow key={hit.objectID}>{renderRow(hit)}</TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[
          10,
          20,
          50,
          100,
          { value: algoliaState.response?.nbHits ?? -1, label: 'All' },
        ]}
        component="div"
        count={algoliaState.response?.nbHits ?? 0}
        page={algoliaState.response?.page ?? 0}
        onChangePage={handleChangePage}
        rowsPerPage={
          algoliaState.response?.hitsPerPage ??
          ALGOLIA_TABLE_DEFAULT_HITS_PER_PAGE
        }
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage="Rows per page"
      />
    </Paper>
  );
}
