import React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

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
}

export default function StartupCardContents({
  teamName,
  sector,
  logo,
  LogoComponent,
  oneLineDescription,
  oneLine,
}: IStartupCardContentsProps) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="overline" className={classes.overline}>
        {sector?.join(' · ')}
      </Typography>

      {logo?.[0]?.downloadURL &&
        (LogoComponent ? (
          <LogoComponent className={classes.logo} />
        ) : (
          <Thumbnail
            imageUrl={logo[0].downloadURL}
            size="400x400"
            square
            className={classes.logo}
          />
        ))}

      <Typography
        variant="h6"
        component="h3"
        color="textSecondary"
        gutterBottom
      >
        {teamName}
      </Typography>

      <Typography
        variant="body2"
        className={classes.oneLine}
        dangerouslySetInnerHTML={{
          __html: lineBreakToBr(oneLineDescription ?? oneLine),
        }}
      />
    </>
  );
}
