import React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

import Thumbnail from '../Thumbnail';
import CtaButton from '../CtaButton';
import { getDomain, lineBreakToBr } from '../utils';

const useStyles = makeStyles(theme =>
  createStyles({
    grid: {
      width: '100%',
      marginBottom: 'var(--grid-gutter)',

      display: 'grid',
      gridTemplateColumns: '[start] 2fr 1fr [end]',
      gap: 'var(--grid-gutter)',

      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '1fr',
      },
    },

    text: {
      whiteSpace: 'pre-line',
      color: theme.palette.text.secondary,
      '& .spacer': { marginTop: '0.5em' },
    },

    primaryActions: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      alignContent: 'start',
      gap: 'var(--grid-gutter)',

      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, max-content))',
      },
    },
    secondaryActions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, max-content))',
      gap: 'var(--grid-gutter)',
    },
  })
);

export interface IStartupHeroProps {
  className?: string;

  logo?: { downloadURL: string }[];
  location?: string;
  year?: string;
  teamName: string;
  tagline?: string;
  oneLineDescription: string;
  elevatorPitch?: string;
  longDescription?: string;
  website?: string;

  primaryActions?: React.ReactNode;
  secondaryActions?: React.ReactNode;
}

export default function StartupHero({
  className,

  logo,
  location,
  year,
  teamName,
  tagline,
  oneLineDescription,
  elevatorPitch,
  longDescription,
  website,

  primaryActions,
  secondaryActions,
}: IStartupHeroProps) {
  const classes = useStyles();

  return (
    <section className={className}>
      <div className={classes.grid}>
        {Array.isArray(logo) && logo[0]?.downloadURL && (
          <Thumbnail
            imageUrl={logo[0].downloadURL}
            size="400x400"
            shape="square"
            style={{ width: 200, height: 32, objectPosition: 'left' }}
            objectFit="contain"
          />
        )}

        <Typography variant="overline" align="right" display="block">
          {[location, year].join(', ')}
        </Typography>
      </div>

      <div className={classes.grid}>
        <div
          style={!primaryActions ? { gridColumn: 'start / end' } : undefined}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            {teamName}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="textSecondary"
            paragraph
          >
            {tagline}
          </Typography>

          <Typography
            variant="body1"
            paragraph
            className={classes.text}
            dangerouslySetInnerHTML={{
              __html: lineBreakToBr(oneLineDescription),
            }}
          />

          <Typography
            variant="body1"
            className={classes.text}
            dangerouslySetInnerHTML={{
              __html: lineBreakToBr(elevatorPitch ?? longDescription),
            }}
          />
        </div>

        <div className={classes.primaryActions}>{primaryActions}</div>
      </div>

      <div className={classes.secondaryActions}>
        {website && (
          <CtaButton
            variant="outlined"
            size="medium"
            component="a"
            href={website.startsWith('http') ? website : `https://${website}`}
            target="_blank"
            rel="noopener"
          >
            {getDomain(website)}
          </CtaButton>
        )}

        {secondaryActions}
      </div>
    </section>
  );
}
