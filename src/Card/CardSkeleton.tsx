import React from 'react';

import { Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import BasicCard from './BasicCard';

export default function CardSkeleton(props: any) {
  return (
    <BasicCard
      overline={<Skeleton width="50%" />}
      title={<Skeleton />}
      imageElem={
        <Skeleton width={80} height={80} style={{ transform: 'none' }} />
      }
      bodyContent={[
        <div style={{ marginTop: 24 }}>
          <Typography variant="body2">
            <Skeleton />
          </Typography>
          <Typography variant="body2">
            <Skeleton width="80%" />
          </Typography>
        </div>,
        <Typography variant="h5">
          <Skeleton width={80} />
        </Typography>,
      ]}
      {...props}
    />
  );
}
