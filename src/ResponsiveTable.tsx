import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  useMediaQuery,
  Paper,
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
    root: { width: '100%' },

    table: {
      tableLayout: 'fixed',
      '& thead th': theme.typography.overline,
      '& tbody th, & tbody td': { padding: theme.spacing(1.5, 2) },
    },
    mobile: {
      '& thead': { display: 'none' },

      '& tr': {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',

        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1.5, 0),
      },

      '& tbody td': {
        padding: theme.spacing(0.5, 2),
        borderBottom: 'none',
      },
    },

    iconCell: {
      '$table tbody td&': { padding: 0 },
    },
  })
);

export interface IResponsiveTableProps {
  label: string;
  columns: {
    key: string;
    header: React.ReactNode;
    width: number;
    render: (
      value: any,
      row: Record<string, any>,
      isMobile: boolean
    ) => React.ReactNode;
    mobileStyles?: React.CSSProperties;
    className?: string;
    align?: TableCellProps['align'];
    th?: boolean;
    variant?: 'icon' | '';
  }[];
  data?: Record<string, any>[];
  mobileWidth?: number;
  loading?: boolean;
  loadingCount?: number;
  pagination?: React.ReactNode;
}

export default function ResponsiveTable({
  label,
  columns,
  data,
  mobileWidth,
  loading = false,
  loadingCount = 10,
  pagination,
}: IResponsiveTableProps) {
  const classes = useStyles();

  const calcMobileWidth = columns.reduce((a, c) => a + c.width, 0);
  const isMobile = useMediaQuery(
    `(max-width: ${(mobileWidth ?? calcMobileWidth + 48) - 0.05}px)`
  );

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table
          className={clsx(classes.table, isMobile && classes.mobile)}
          aria-label={label}
        >
          <TableHead>
            <TableRow>
              {columns.map(
                ({ key, header, width, className, align, variant }) => (
                  <TableCell
                    key={key}
                    className={clsx(
                      className,
                      variant === 'icon' && classes.iconCell
                    )}
                    style={{ width }}
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
              new Array(loadingCount).fill(undefined).map((_, i) => (
                <TableRow key={i}>
                  {columns.map(
                    ({ key, className, mobileStyles, align, th, variant }) => (
                      <TableCell
                        key={key}
                        component={th ? 'th' : undefined}
                        scope={th ? 'row' : undefined}
                        className={clsx(
                          className,
                          variant === 'icon' && classes.iconCell
                        )}
                        style={isMobile ? mobileStyles : undefined}
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
                    )
                  )}
                </TableRow>
              ))}

            {!loading &&
              Array.isArray(data) &&
              data.map((row, i) => (
                <TableRow key={i}>
                  {columns.map(
                    ({
                      key,
                      render,
                      className,
                      mobileStyles,
                      align,
                      th,
                      variant,
                    }) => (
                      <TableCell
                        key={key}
                        component={th ? 'th' : undefined}
                        scope={th ? 'row' : undefined}
                        className={clsx(
                          className,
                          variant === 'icon' && classes.iconCell
                        )}
                        style={isMobile ? mobileStyles : undefined}
                        align={align}
                      >
                        {render(row[key], row, isMobile)}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination}
    </Paper>
  );
}
