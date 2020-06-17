import React from 'react';

import {
  makeStyles,
  createStyles,
  Typography,
  CardMedia,
} from '@material-ui/core';

import { lineBreakToBr } from '../utils';

const useStyles = makeStyles(theme =>
  createStyles({
    content: { flexGrow: 1 },

    overline: { color: theme.palette.text.disabled },

    logo: {
      maxWidth: 200,
      width: '80%',
      height: 80,
      backgroundSize: 'contain',
      backgroundPosition: 'center left',

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
          <CardMedia image={logo[0].downloadURL} className={classes.logo} />
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
