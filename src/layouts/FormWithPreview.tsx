import React from 'react';
import _isFunction from 'lodash/isFunction';

import { makeStyles, createStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',

      display: 'grid',
      gridTemplateColumns: '[start] repeat(var(--grid-num-columns), 1fr) [end]',
      columnGap: 'var(--grid-gutter)',
      rowGap: 'var(--grid-gutter)',
    },

    paperContainer: {
      gridColumn: 'start / end',
      [theme.breakpoints.up('md')]: { gridColumn: 'span 6' },
      [theme.breakpoints.up('lg')]: { gridColumn: 'span 5' },
    },

    mainPaper: {
      width: '100%',
      padding: theme.spacing('m'),

      maxWidth: 545 + 64, // Width of contents at SM min (640px)
      margin: '0 auto',
    },

    previewContainer: {
      gridColumn: 'start / end',
      maxWidth: 420,
      margin: '0 auto',

      [theme.breakpoints.up('md')]: { gridColumn: 'span 4' },
      [theme.breakpoints.up('lg')]: { gridColumn: 'span 3' },
    },
    previewContent: {
      [theme.breakpoints.up('md')]: {
        position: 'sticky',
        top: 64,
        height: `calc(100vh - 64px)`,
        overflowY: 'auto',

        padding: theme.spacing('xs'),
        margin: -theme.spacing('xs'),
        width: `calc(100% + ${theme.spacing('xs') * 2}px)`,

        marginTop: -theme.spacing('l'),
        paddingTop: theme.spacing('l'),
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
    <div className={classes.root}>
      <div className={classes.paperContainer}>
        {paperHeader}
        <Paper className={classes.mainPaper}>{children}</Paper>
      </div>

      <div className={classes.previewContainer}>
        <div className={classes.previewContent}>{previewContent}</div>
      </div>
    </div>
  );
}
