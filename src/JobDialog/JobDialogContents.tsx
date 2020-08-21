import React from 'react';
import { SwitchTransition } from 'react-transition-group';

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
    backButton: {
      display: 'flex',
      margin: theme.spacing(-3.5, 0, 4, -1.5),
    },

    teamName: { color: theme.palette.text.disabled },
    jobTitle: { fontWeight: 'normal' },

    applyButton: {
      display: 'flex',
      margin: `${theme.spacing(6)}px auto ${theme.spacing(8)}px`,

      width: 240,
      maxWidth: '100%',
    },
  })
);

export interface IJobDialogContentsProps {
  data: IJobDialogProps['data'];
  FormProps: Partial<IFormProps>;

  page: 'details' | 'form';
  setPage: React.Dispatch<React.SetStateAction<'details' | 'form'>>;
}

export default function JobDialogContents({
  data,
  FormProps,
  page,
  setPage,
}: IJobDialogContentsProps) {
  const classes = useStyles();

  return (
    <SwitchTransition>
      <Slide
        key={page}
        direction={page === 'details' ? 'right' : 'left'}
        appear={false}
      >
        <div>
          {page === 'form' && (
            <Button
              startIcon={<ChevronLeftIcon />}
              onClick={() => setPage('details')}
              className={classes.backButton}
            >
              Job Details
            </Button>
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

          <Typography
            variant="h6"
            component="h1"
            paragraph
            className={classes.jobTitle}
          >
            {data.jobTitle}
          </Typography>

          {page === 'details' ? (
            <JobDetails data={data} />
          ) : (
            <JobForm data={data} FormProps={FormProps} />
          )}

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
