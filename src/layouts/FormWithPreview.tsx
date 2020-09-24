import React from 'react';
import _isFunction from 'lodash/isFunction';

import { makeStyles, createStyles, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    mainPaper: { width: '100%', padding: theme.spacing(4) },

    previewContainer: {
      maxWidth: 360,
      width: '100%',
      [theme.breakpoints.up('lg')]: { width: 360 },
    },
    previewContent: {
      [theme.breakpoints.up('lg')]: {
        position: 'sticky',
        top: theme.spacing(8),
        height: `calc(100vh - ${theme.spacing(8)}px)`,
        overflowY: 'auto',
        padding: theme.spacing(2),
        margin: -theme.spacing(2),
        width: `calc(100% + ${theme.spacing(2 * 2)}px)`,
      },
    },
  })
);

interface IFormWithPreviewProps {
  paperHeader?: React.ReactNode;
  children: React.ReactNode;
  previewContent?: React.ReactNode;
}

export default function FormWithPreview({
  paperHeader,
  children,
  previewContent,
}: IFormWithPreviewProps) {
  const classes = useStyles({});

  return (
    <Grid container spacing={4}>
      <Grid item xs>
        {paperHeader}
        <Paper className={classes.mainPaper}>{children}</Paper>
      </Grid>

      <Grid item className={classes.previewContainer}>
        <div className={classes.previewContent}>{previewContent}</div>
      </Grid>
    </Grid>
  );
}
