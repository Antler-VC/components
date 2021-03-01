import React from 'react';

import { Tooltip, Grid, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

export interface IReviewsSummaryProps {
  count: number;
  sum?: number;
  average?: number;
  max?: number;
}

export default function ReviewsSummary({
  sum,
  count,
  average,
  max = 5,
}: IReviewsSummaryProps) {
  const value = average ?? (!!sum ? sum / count : null);

  if (count === 0 || value === null) return null;

  return (
    <Tooltip
      title={
        <>
          {value} star{value !== 1 ? 's' : ''}
          <br />
          {count} review{count !== 1 ? 's' : ''}
        </>
      }
    >
      <Grid container wrap="nowrap" alignItems="center" spacing={1}>
        <Grid item aria-label={`${value} stars`} style={{ height: 24 + 8 }}>
          {new Array(max)
            .fill(undefined)
            .map((_: any, i) =>
              i < value ? (
                i === Math.floor(value) ? (
                  <StarHalfIcon key={i} color="action" />
                ) : (
                  <StarIcon key={i} color="action" />
                )
              ) : (
                <StarBorderIcon key={i} color="action" />
              )
            )}
        </Grid>

        <Grid item>
          <Typography variant="subtitle2" color="textSecondary">
            ({count})
          </Typography>
        </Grid>
      </Grid>
    </Tooltip>
  );
}
