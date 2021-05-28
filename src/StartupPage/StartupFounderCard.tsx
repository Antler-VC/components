import React from 'react';

import {
  makeStyles,
  createStyles,
  Typography,
  Grid,
  Avatar,
} from '@material-ui/core';

import BasicCard from '../Card/BasicCard';
import CardTitle from '../Card/CardTitle';
import Thumbnail from '../Thumbnail';

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      height: '100%',

      '--spacing-card': theme.spacing('xs') + 'px',
      '& hr': { display: 'none' },
    },

    image: {
      width: 120,
      height: 120,

      display: 'block',
      margin: 'var(--spacing-card) auto 0',
    },

    employerLogo: {
      width: 32,
      height: 32,
    },
  })
);

export interface IStartupFounderCardProps {
  data: {
    profilePhoto?: { downloadURL: string }[];
    firstName: string;
    preferredName?: string;
    lastName: string;
    title?: string;
    employerLogos?: { downloadURL: string }[];
  };
  onClick: () => void;
}

export default function StartupFounderCard({
  data,
  onClick,
}: IStartupFounderCardProps) {
  const classes = useStyles();

  return (
    <BasicCard
      body={
        <>
          {data.profilePhoto?.[0]?.downloadURL ? (
            <Thumbnail
              imageUrl={data.profilePhoto?.[0]?.downloadURL}
              shape="circle"
              size="400x400"
              className={classes.image}
            />
          ) : (
            <Avatar className={classes.image} style={{ display: 'flex' }} />
          )}

          <CardTitle {...({ component: 'h3' } as any)} align="center">
            {data.preferredName || data.firstName} {data.lastName}
          </CardTitle>

          <Typography variant="overline" align="center">
            {data.title}
          </Typography>
        </>
      }
      actionRows={[
        {
          primaryButton: { label: 'Details', onClick },
          secondaryAction: Array.isArray(data.employerLogos) &&
            data.employerLogos[0]?.downloadURL && (
              <Grid container spacing={1}>
                {data.employerLogos.slice(0, 3).map(item =>
                  item?.downloadURL ? (
                    <Grid item key={item.downloadURL}>
                      <Thumbnail
                        imageUrl={item.downloadURL}
                        shape="square"
                        size="100x100"
                        className={classes.employerLogo}
                        objectFit="contain"
                      />
                    </Grid>
                  ) : null
                )}
              </Grid>
            ),
        },
      ]}
      className={classes.card}
    />
  );
}
