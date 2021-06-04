import React, { useState, useEffect } from 'react';
import { SwitchTransition } from 'react-transition-group';

import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  Fade,
  Button,
} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackIos';

import DetailsModal, { IDetailsModalProps } from '../Modal/DetailsModal';
import { IFormProps } from '@antlerengineering/form-builder';
import CardTitle from '../Card/CardTitle';
import CtaButton from '../CtaButton';
import StartupJobDetails from './StartupJobDetails';
import StartupJobForm from './StartupJobForm';
import SlideTransition from '../Modal/SlideTransition';

const useStyles = makeStyles(theme =>
  createStyles({
    title: { marginTop: 'var(--spacing-modal-contents)' },

    backButton: {
      marginTop: -10,
      marginLeft: theme.spacing(-0.5),
      [theme.breakpoints.down('xs')]: { marginTop: -5 },
    },

    applyButton: {
      marginBottom: 'var(--spacing-modal-contents)',
      width: 120,
      alignSelf: 'center',
    },
  })
);

export interface IStartupJobModalProps extends IDetailsModalProps {
  data: {
    id: string;
    team: {
      docPath: string;
      snapshot: {
        cohort: string;
        teamName: string;
        logo: { downloadURL: string }[];
      };
    }[];
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
}

export default function StartupJobModal({
  data,
  FormProps,

  hasNext,
  hasPrev,
  ...props
}: IStartupJobModalProps) {
  const classes = useStyles();

  const [page, setPage] = useState<'details' | 'form'>('details');
  useEffect(() => setPage('details'), [data.id]);

  return (
    <DetailsModal
      {...props}
      hasNext={page === 'form' ? false : hasNext}
      hasPrev={page === 'form' ? false : hasPrev}
      header={
        <SwitchTransition>
          <Fade key={data.id}>
            <div
              style={{
                marginTop: 'calc(var(--spacing-modal-contents) * -1)',
                maxWidth: `calc(100% - 48px * ${page === 'form' ? 1 : 3})`, // space for next/prev nav
              }}
            >
              <SwitchTransition>
                <Fade key={page} appear={false}>
                  <Grid container spacing={4} alignItems="flex-start">
                    {page === 'form' && (
                      <Grid item>
                        <Button
                          startIcon={<BackIcon />}
                          onClick={() => setPage('details')}
                          className={classes.backButton}
                        >
                          Job Details
                        </Button>
                      </Grid>
                    )}

                    <Grid item xs={12} sm>
                      <Typography
                        variant="overline"
                        color="textPrimary"
                        gutterBottom
                        style={{ display: 'block' }}
                      >
                        {data.team[0].snapshot.teamName}
                      </Typography>
                      <Typography variant="overline">
                        {[data.jobFunction, data.location].join(', ')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Fade>
              </SwitchTransition>

              <CardTitle className={classes.title}>{data.jobTitle}</CardTitle>
            </div>
          </Fade>
        </SwitchTransition>
      }
      body={
        <SwitchTransition>
          <Fade key={data.id}>
            <div>
              <SwitchTransition>
                <SlideTransition key={page} appear={false}>
                  <div>
                    {page === 'details' ? (
                      <StartupJobDetails data={data} />
                    ) : (
                      <StartupJobForm data={data} FormProps={FormProps} />
                    )}
                  </div>
                </SlideTransition>
              </SwitchTransition>
            </div>
          </Fade>
        </SwitchTransition>
      }
      footer={
        page === 'details' && (
          <CtaButton
            onClick={() => setPage('form')}
            className={classes.applyButton}
            size="medium"
          >
            Apply
          </CtaButton>
        )
      }
    />
  );
}
