import React from 'react';
import { SwitchTransition } from 'react-transition-group';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Slide,
  Typography,
  Button,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { IFormProps } from '@antlerengineering/form-builder';
import { IJobDialogProps } from './JobDialog';
import JobDetails from './JobDetails';
import JobForm from './JobForm';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',

      maxHeight: `calc(100vh - ${theme.spacing(8)}px - ${theme.spacing(
        8 * 2
      )}px - ${theme.spacing(3)}px)`,

      [theme.breakpoints.down('sm')]: {
        maxHeight: `calc(100vh - ${theme.spacing(8)}px - ${theme.spacing(
          6 * 2
        )}px - ${theme.spacing(5)}px)`,
      },

      [theme.breakpoints.down('xs')]: {
        maxHeight: `calc(100vh - ${theme.spacing(10)}px - ${theme.spacing(
          1
        )}px)`,
      },
    },
    isSingle: {
      maxHeight: `calc(100vh - ${theme.spacing(8)}px - ${theme.spacing(
        8 * 2
      )}px)`,

      [theme.breakpoints.down('sm')]: {
        maxHeight: `calc(100vh - ${theme.spacing(8)}px - ${theme.spacing(
          6 * 2
        )}px)`,
      },

      [theme.breakpoints.down('xs')]: {
        maxHeight: `calc(100vh - ${theme.spacing(10)}px)`,
      },
    },

    backButton: {
      display: 'flex',
      margin: theme.spacing(-3.5, 0, 4, -1.5),
    },

    teamName: { color: theme.palette.text.disabled },
    jobTitle: { fontWeight: 'normal' },

    applyButton: {
      display: 'flex',
      margin: '0 auto',

      width: 240,
      maxWidth: '100%',
    },

    scrollableContent: {
      flex: 1,
      overflowY: 'auto',

      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),

      margin: theme.spacing(0, -8),
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),

      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0, -6),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
      },
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(0, -4),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    },

    scrollableFadeTop: {
      pointerEvents: 'none',
      position: 'relative',
      zIndex: 1,

      height: theme.spacing(4),
      marginBottom: theme.spacing(-4),
      flexShrink: 0,

      backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.paper}, transparent)`,
    },
    scrollableFadeBottom: {
      pointerEvents: 'none',
      position: 'relative',
      zIndex: 1,

      height: theme.spacing(4),
      marginTop: theme.spacing(-4),
      flexShrink: 0,

      backgroundImage: `linear-gradient(to top, ${theme.palette.background.paper}, transparent)`,
    },
  })
);

export interface IJobDialogContentsProps {
  data: IJobDialogProps['data'];
  FormProps: Partial<IFormProps>;

  page: 'details' | 'form';
  setPage: React.Dispatch<React.SetStateAction<'details' | 'form'>>;

  isSingle?: boolean;
}

export default function JobDialogContents({
  data,
  FormProps,
  page,
  setPage,
  isSingle,
}: IJobDialogContentsProps) {
  const classes = useStyles();

  return (
    <SwitchTransition>
      <Slide
        key={page}
        direction={page === 'details' ? 'right' : 'left'}
        appear={false}
      >
        <div className={clsx(classes.root, isSingle && classes.isSingle)}>
          {page === 'form' && (
            <div>
              <Button
                startIcon={<ChevronLeftIcon />}
                onClick={() => setPage('details')}
                className={classes.backButton}
              >
                Job Details
              </Button>
            </div>
          )}

          <Typography
            variant="subtitle2"
            gutterBottom
            className={classes.teamName}
          >
            {data.teamName}
          </Typography>
          <Typography variant="overline" paragraph>
            {data.jobFunction}, {data.location}
          </Typography>

          <Typography variant="h6" component="h1" className={classes.jobTitle}>
            {data.jobTitle}
          </Typography>

          <div className={classes.scrollableFadeTop} />
          <div className={classes.scrollableContent}>
            {page === 'details' ? (
              <JobDetails data={data} />
            ) : (
              <JobForm data={data} FormProps={FormProps} />
            )}
          </div>
          <div className={classes.scrollableFadeBottom} />

          {page === 'details' && (
            <Button
              variant="contained"
              size="large"
              className={classes.applyButton}
              onClick={() => setPage('form')}
            >
              Apply
            </Button>
          )}
        </div>
      </Slide>
    </SwitchTransition>
  );
}
