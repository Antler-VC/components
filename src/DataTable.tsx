import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableCellProps,
  TableBody,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme =>
  createStyles({
    tableContainer: {
      padding: 0,
      border: `1px solid ${theme.palette.antler.aGray[500]}`,
    },

    table: {
      tableLayout: 'auto',
    },

    tableCell: {
      '&:first-child': {
        paddingLeft: theme.spacing('xs'),
        borderLeft: 'none',
      },
      '&:last-child': {
        paddingRight: theme.spacing('xs'),
        borderRight: 'none',
      },

      'thead th&': {
        backgroundColor: theme.palette.antler.aGray[50],
        border: `1px solid ${theme.palette.antler.aGray[500]}`,
        borderTop: 'none',

        padding: theme.spacing('xs'),
      },

      border: `1px solid ${theme.palette.divider}`,
      verticalAlign: 'top',

      'tbody tr:last-child &': { borderBottom: 'none' },

      'td&.iconCell': { padding: theme.spacing(0.75) },

      '.sticky th&:last-child': {
        backgroundColor: theme.palette.antler.aGray[50],
      },
    },
  })
);

export interface IDataTableProps {
  label: string;
  columns: {
    key: string;
    header: React.ReactNode;
    width?: number;
    render: (value: any, row: Record<string, any>) => React.ReactNode;
    className?: string;
    align?: TableCellProps['align'];
    th?: boolean;
    variant?: 'icon' | 'button' | '';
  }[];
  data?: Record<string, any>[];
  loading?: boolean;
  loadingCount?: number;
  pagination?: React.ReactNode;
  sticky?: boolean;
}

export default function DataTable({
  label,
  columns,
  data,
  loading = false,
  loadingCount = 10,
  pagination,
  sticky = false,
}: IDataTableProps) {
  const classes = useStyles();

  return (
    <>
      <TableContainer
        className={clsx(classes.tableContainer, sticky && 'sticky')}
      >
        <Table aria-label={label} className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map(
                ({ key, header, width, className, align, variant }) => (
                  <TableCell
                    key={key}
                    className={clsx(
                      classes.tableCell,
                      className,
                      variant === 'icon' && 'iconCell'
                    )}
                    style={{ minWidth: width }}
                    align={align}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading &&
              new Array(loadingCount).fill(undefined).map((_: any, i) => (
                <TableRow key={i}>
                  {columns.map(({ key, className, align, th, variant }) => (
                    <TableCell
                      key={key}
                      component={th ? 'th' : undefined}
                      scope={th ? 'row' : undefined}
                      className={clsx(
                        classes.tableCell,
                        className,
                        variant === 'icon' && 'iconCell'
                      )}
                      align={align}
                    >
                      {variant === 'icon' ? (
                        <Skeleton
                          variant="circle"
                          width={48}
                          height={48}
                          style={{ display: 'inline-block' }}
                        />
                      ) : (
                        <Skeleton />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!loading &&
              Array.isArray(data) &&
              data.map((row, i) => (
                <TableRow key={i}>
                  {columns.map(
                    ({ key, render, className, align, th, variant }) => (
                      <TableCell
                        key={key}
                        component={th ? 'th' : undefined}
                        scope={th ? 'row' : undefined}
                        className={clsx(
                          classes.tableCell,
                          className,
                          variant === 'icon' && 'iconCell'
                        )}
                        align={align}
                      >
                        {render(row[key], row)}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination}
    </>
  );
}
