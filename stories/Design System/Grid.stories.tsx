import React from 'react';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Container,
} from '@material-ui/core';

import { SIDEBAR_WIDTH, SIDEBAR_MARGIN } from '../../src/Theme/layout';
import CardGrid from '../../src/layouts/CardGrid';
import BasicCard from '../../src/Card/BasicCard';

export default {
  title: 'Antler Theme/Design System/Grid',
  parameters: {
    layout: 'fullscreen',
  },
};

const useStyles = makeStyles(theme =>
  createStyles({
    root: { display: 'flex' },
    sidebar: {
      width: SIDEBAR_WIDTH,
      marginRight: SIDEBAR_MARGIN,

      flexGrow: 0,
      flexShrink: 0,
      flexBasis: SIDEBAR_WIDTH,

      height: '100vh',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
    },

    grid: {
      height: 'calc(100vh - var(--grid-margin) * 2)',
      backgroundColor: 'rgba(239, 106, 110, 0.25)',

      display: 'grid',
      gridTemplateColumns: 'repeat(var(--grid-num-columns), 1fr)',
      columnGap: 'var(--grid-gutter)',

      paddingTop: 'var(--grid-margin)',
      paddingBottom: 'var(--grid-margin)',
      margin: 'var(--grid-margin) auto',

      position: 'relative',
    },

    column: {
      backgroundColor: 'rgba(239, 106, 110, 0.25)',
    },

    cardGrid: {
      position: 'absolute',
      top: 'var(--grid-margin)',
      right: 'var(--grid-margin)',
      bottom: 'var(--grid-margin)',
      left: 'var(--grid-margin)',
      width: 'calc(100% - var(--grid-margin) * 2)',
    },
    card: { boxShadow: theme.shadows[1] },
  })
);

export const Grid = () => {
  const classes = useStyles();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  return (
    <div className={classes.root}>
      {isXl && <div className={classes.sidebar} />}

      <Container classes={{ root: classes.grid }}>
        {new Array(isMobile ? 4 : isTablet ? 8 : 12)
          .fill(undefined)
          .map((_, i) => (
            <div key={i} className={classes.column} />
          ))}

        <CardGrid className={classes.cardGrid}>
          {new Array(isMobile ? 3 : isTablet ? 4 : 12)
            .fill(undefined)
            .map((_, i) => (
              <BasicCard key={i} className={classes.card} />
            ))}
        </CardGrid>
      </Container>
    </div>
  );
};
