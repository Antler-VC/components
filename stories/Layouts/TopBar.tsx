import React from 'react';

import { makeStyles, createStyles, AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    '@global': {
      body: { paddingBottom: theme.spacing('l' as any) },
    },

    root: {
      boxShadow: `0 -1px 0 0 ${theme.palette.divider} inset`,

      marginBottom: theme.spacing('l' as any),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing('m' as any),
      },
    },
  })
);

export default function TopBar() {
  const classes = useStyles();

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      className={classes.root}
    >
      <Toolbar />
    </AppBar>
  );
}
