import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
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
    mobile: {
      padding: theme.spacing(0, 'xs'),
      overflow: 'visible',

      '& thead': { display: 'none' },

      '& tr': {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',

        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing('xxs', 0),
      },

      '& tbody th, & tbody td': {
        padding: theme.spacing('xxs', 0),
        borderBottom: 'none',
      },
    },

    variantButton: {
      // marginBottom: theme.spacing(-1),
    },
    variantIcon: {
      // marginBottom: theme.spacing(-1.5),
      marginLeft: theme.spacing(1.5),
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
      isTablet: boolean
    ) => React.ReactNode;
    mobileStyles?: React.CSSProperties;
    className?: string;
    align?: TableCellProps['align'];
    th?: boolean;
    variant?: 'icon' | 'button' | '';
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
  const theme = useTheme();
  const isTablet = useMediaQuery(
    mobileWidth
      ? `(max-width: ${mobileWidth - 0.05}px)`
      : theme.breakpoints.down('sm')
  );

  return (
    <>
      <TableContainer className={clsx(isTablet && classes.mobile)}>
        <Table aria-label={label}>
          <TableHead>
            <TableRow>
              {columns.map(
                ({ key, header, width, className, align, variant }) => (
                  <TableCell
                    key={key}
                    className={clsx(
                      className,
                      variant === 'icon' && isTablet
                        ? classes.variantIcon
                        : 'iconCell',
                      variant === 'button' && isTablet && classes.variantButton
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
              new Array(loadingCount).fill(undefined).map((_: any, i) => (
                <TableRow key={i}>
                  {columns.map(
                    ({ key, className, mobileStyles, align, th, variant }) => (
                      <TableCell
                        key={key}
                        component={th ? 'th' : undefined}
                        scope={th ? 'row' : undefined}
                        className={clsx(
                          className,
                          variant === 'icon' && isTablet
                            ? classes.variantIcon
                            : 'iconCell',
                          variant === 'button' &&
                            isTablet &&
                            classes.variantButton
                        )}
                        style={isTablet ? mobileStyles : undefined}
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
                          variant === 'icon' && isTablet
                            ? classes.variantIcon
                            : 'iconCell',
                          variant === 'button' &&
                            isTablet &&
                            classes.variantButton
                        )}
                        style={isTablet ? mobileStyles : undefined}
                        align={align}
                      >
                        {render(row[key], row, isTablet)}
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
