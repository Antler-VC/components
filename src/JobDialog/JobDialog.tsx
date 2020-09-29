import React, { useState, useEffect } from 'react';
import { SwitchTransition } from 'react-transition-group';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Fade,
  Button,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import SquareDialog from '../SquareDialog';
import { IFormProps } from '@antlerengineering/form-builder';
import JobDialogContents from './JobDialogContents';

const useStyles = makeStyles(theme =>
  createStyles({
    paper: { maxWidth: 750 },

    navButtons: {
      margin: theme.spacing(3, -8, -8),
      marginLeft: 'auto',
      width: 64 * 2,

      [theme.breakpoints.down('sm')]: {
        marginRight: -theme.spacing(6),
        marginBottom: -theme.spacing(6),
      },
      [theme.breakpoints.down('xs')]: {
        marginRight: -theme.spacing(4),
        marginBottom: -theme.spacing(4),
      },

      '& > button': {
        width: 64,
        height: 64,
        borderRadius: 0,
      },
    },
    prevButton: {
      backgroundColor: theme.palette.grey[50],
      color: theme.palette.text.secondary,
    },
    nextButton: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      '&:hover': { backgroundColor: theme.palette.primary.main },
    },
  })
);

export interface IJobDialogProps {
  data: {
    id: string;
    teamName: string;
    jobFunction: string;
    location: string;
    jobTitle: string;
    description: string;
    descriptionResponsibilities: string;
    descriptionOffers?: string;
    externalJobAd?: boolean;
    externalJobAdLink?: string;
    portfolioLink?: boolean;
    applicationDeadline: number;
  };
  FormProps: Partial<IFormProps>;

  hasData: boolean;
  clearData: () => void;
  isSingle: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function JobDialog({
  data,
  FormProps,

  hasData,
  clearData,
  isSingle = false,
  onPrev,
  onNext,
}: IJobDialogProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(hasData), [hasData]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(clearData, 400);
  };

  const [page, setPage] = useState<'details' | 'form'>('details');
  useEffect(() => setPage('details'), [data.id]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open || isSingle || !onNext || !onPrev || page === 'form') return;
    if (e.key === 'ArrowRight') onNext();
    else if (e.key === 'ArrowLeft') onPrev();
  };

  return (
    <SquareDialog
      open={open}
      fullWidth
      aria-labelledby="modal-name"
      onClose={handleClose}
      fullScreen={isXs}
      onKeyUp={handleKeyUp}
      classes={{ paperWidthSm: classes.paper }}
    >
      <SwitchTransition>
        <Fade key={data.id}>
          <div>
            <JobDialogContents
              data={data}
              page={page}
              setPage={setPage}
              FormProps={FormProps}
            />
          </div>
        </Fade>
      </SwitchTransition>

      <SwitchTransition>
        <Fade key={page}>
          <div className={classes.navButtons}>
            {!isSingle && page !== 'form' && (
              <>
                <Button
                  onClick={onPrev}
                  aria-label="Previous profile"
                  className={classes.prevButton}
                >
                  <ChevronLeftIcon fontSize="large" />
                </Button>
                <Button
                  onClick={onNext}
                  aria-label="Next profile"
                  className={classes.nextButton}
                >
                  <ChevronRightIcon fontSize="large" />
                </Button>
              </>
            )}
          </div>
        </Fade>
      </SwitchTransition>
    </SquareDialog>
  );
}
