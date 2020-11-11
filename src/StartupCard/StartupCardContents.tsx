import React from 'react';

import { makeStyles, createStyles, Typography, Grid } from '@material-ui/core';

import Thumbnail from '../Thumbnail';
import { lineBreakToBr } from '../utils';

const useStyles = makeStyles(theme =>
  createStyles({
    content: { flexGrow: 1 },

    overline: { color: theme.palette.text.disabled },

    logo: {
      maxWidth: 200,
      width: '80%',
      height: 80,
      objectFit: 'contain',
      objectPosition: 'center left',

      margin: theme.spacing(2, 0),
      display: 'block',
    },

    teamName: { fontWeight: 'normal' },

    oneLine: {
      minHeight: `${1.45 * 4}em`,
      '& .spacer': { height: '0.5em' },
    },
  })
);

export interface IStartupCardContentsProps {
  teamName: string;
  sector: string[];
  logo?: { downloadURL: string }[];
  LogoComponent?: React.ComponentType<{ className?: string }>;
  oneLineDescription: string;
  oneLine?: string;
  year?: string;
}

export default function StartupCardContents({
  teamName,
  sector,
  logo,
  LogoComponent,
  oneLineDescription,
  oneLine,
  year,
}: IStartupCardContentsProps) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="overline" className={classes.overline}>
        {sector?.join(' · ')}
      </Typography>

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

      <Grid container spacing={2} alignItems="baseline">
        <Grid item xs>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            className={classes.teamName}
          >
            {teamName}
          </Typography>
        </Grid>
        {year && (
          <Grid item>
            <Typography variant="overline" className={classes.overline}>
              {year}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.oneLine}
        dangerouslySetInnerHTML={{
          __html: lineBreakToBr(oneLineDescription ?? oneLine),
        }}
      />
    </>
  );
}
