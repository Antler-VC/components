import React from 'react';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Container,
} from '@material-ui/core';

export default {
  title: 'Antler Theme/Design System/Grid',
  parameters: {
    layout: 'fullscreen',
  },
};

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: '100vh',
      backgroundColor: 'rgba(239, 106, 110, 0.25)',

      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      columnGap: theme.spacing('m'),

      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(8, 1fr)',
        columnGap: theme.spacing('xs'),
      },

      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },

    column: {
      backgroundColor: 'rgba(239, 106, 110, 0.25)',
    },
  })
);

export const Grid = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Container classes={{ root: classes.root }}>
      {new Array(isMobile ? 4 : isTablet ? 8 : 12)
        .fill(undefined)
        .map((_, i) => (
          <div key={i} className={classes.column} />
        ))}
    </Container>
  );
};
