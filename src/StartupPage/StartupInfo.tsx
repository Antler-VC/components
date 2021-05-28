import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Typography,
  Grid,
  Chip,
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(var(--num-cards), 1fr)',
      gap: 'var(--grid-gutter)',

      '& dl': { margin: 0 },
      '& * + dt': { marginTop: theme.spacing('s') },
    },

    chipList: {
      marginTop: 0,
      padding: 0,
      listStyleType: 'none',
    },
  })
);

export interface IStartupInfoProps {
  fields: {
    label: string;
    key: string;
    transformer?: (value: any) => any;
    variant?: 'chip' | 'list' | 'string' | 'link';
    max?: number;
  }[][];
  data: Record<string, any>;

  className?: string;
}

export default function StartupInfo({
  fields,
  data,
  className,
}: IStartupInfoProps) {
  const classes = useStyles();

  if (!Array.isArray(fields) || !Array.isArray(fields[0])) return null;

  return (
    <section className={clsx(classes.grid, className)}>
      {fields.map((column, i) => (
        <dl key={i}>
          {column.map((field) => {
            const value = data[field.key];
            if (!value || (Array.isArray(value) && value.length === 0))
              return null;

            let renderedValue: React.ReactNode = null;

            if (field.variant === 'chip' && Array.isArray(value))
              renderedValue = (
                <Grid
                  container
                  spacing={1}
                  component="ul"
                  className={classes.chipList}
                >
                  {value.map((item) => (
                    <Grid item component="li">
                      <Chip label={item} />
                    </Grid>
                  ))}
                </Grid>
              );
            else if (Array.isArray(value)) renderedValue = value.join(', ');
            else renderedValue = value;

            return (
              <React.Fragment key={field.key}>
                <Typography component="dt" variant="overline">
                  {field.label}
                </Typography>
                <Typography component="dd" variant="body2">
                  {renderedValue}
                </Typography>
              </React.Fragment>
            );
          })}
        </dl>
      ))}
    </section>
  );
}
