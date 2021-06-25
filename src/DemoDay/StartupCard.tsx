import React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import ProfileCard, { IProfileCardProps } from '../Card/ProfileCard';
import Thumbnail from '../Thumbnail';
import { lineBreakToBr } from '../utils';

const useStyles = makeStyles(theme =>
  createStyles({
    logo: {
      maxWidth: 200,
      width: '80%',
      height: 80,
      objectFit: 'contain',
      objectPosition: 'center left',
      display: 'block',
    },

    oneLineDescription: {
      marginTop: 0,
      minHeight: `${theme.typography.body2.lineHeight ?? (24 / 14) * 4}em`,
      '& .spacer': { height: '0.5em' },
    },
  })
);

export interface IStartupCardProps extends Partial<IProfileCardProps> {
  data: {
    teamName: string;
    sector: string[];
    logo?: { downloadURL: string }[];
    oneLineDescription: string;
    oneLine?: string;
    year?: string;
  };

  LogoComponent?: React.ComponentType<{ className?: string }>;
}

export default function StartupCard({
  data: { teamName, sector, logo, oneLineDescription, oneLine, year },

  LogoComponent,
  ...props
}: IStartupCardProps) {
  const classes = useStyles();

  return (
    <ProfileCard
      overline={Array.isArray(sector) && sector.join(' · ')}
      overlineSecondary={year}
      {...props}
      body={
        <>
          {LogoComponent ? (
            <LogoComponent className={classes.logo} />
          ) : logo?.[0]?.downloadURL ? (
            <Thumbnail
              imageUrl={logo[0].downloadURL}
              size="400x400"
              shape="square"
              className={classes.logo}
            />
          ) : null}

          <Typography variant="h6" component="h3" gutterBottom>
            {teamName}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.oneLineDescription}
            dangerouslySetInnerHTML={{
              __html: lineBreakToBr(oneLineDescription ?? oneLine),
            }}
          />
        </>
      }
    />
  );
}

export function StartupCardSkeleton(props: Partial<IProfileCardProps>) {
  const classes = useStyles();

  return (
    <ProfileCard
      overline={<Skeleton width="30%" />}
      body={
        <>
          <Skeleton variant="rect" className={classes.logo} />

          <Typography variant="h6" component="h3" gutterBottom>
            <Skeleton width="50%" />
          </Typography>

          <Typography variant="body2" className={classes.oneLineDescription}>
            <Skeleton />
            <Skeleton width="80%" />
          </Typography>
        </>
      }
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
