import React from 'react';

import { Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import ProfileCard from './ProfileCard';

export default function CardSkeleton(props: any) {
  return (
    <ProfileCard
      overline={<Skeleton width="30%" />}
      title={
        <>
          <Skeleton />
          <Skeleton width="50%" />
        </>
      }
      image={{
        elem: <Skeleton width={80} height={80} variant="rect" />,
      }}
      body={
        <>
          <Typography variant="body2">
            <Skeleton />
            <Skeleton width="80%" />
          </Typography>
        </>
      }
      {...props}
      actionRows={[
        {
          primaryElement: (
            <Typography variant="button">
              <Skeleton width={80} />
            </Typography>
          ),
        },
      ]}
      style={{ boxShadow: 'none', transition: 'none', ...props.style }}
    />
  );
}
