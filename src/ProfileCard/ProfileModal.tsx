import React, { useState, useEffect } from 'react';
import { SwitchTransition } from 'react-transition-group';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Fade,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import SquareDialog from '../SquareDialog';
import EmployerLogos from './EmployerLogos';
import SocialButtons from './SocialButtons';
import Thumbnail from '../Thumbnail';

const useStyles = makeStyles(theme =>
  createStyles({
    content: {
      [theme.breakpoints.down('sm')]: { maxWidth: 'none' },
    },

    leftColumn: {
      width: 240 + theme.spacing(3),
      height: `calc(100% + ${theme.spacing(3)}px)`,

      [theme.breakpoints.only('sm')]: { width: 140 + theme.spacing(3) },
      [theme.breakpoints.down('xs')]: { width: 'auto', height: 'auto' },
    },
    photo: {
      width: 240,
      height: 240,
      pointerEvents: 'none',
      userSelect: 'none',
      display: 'block',
      objectFit: 'cover',

      [theme.breakpoints.only('sm')]: { width: 140, height: 140 },
      [theme.breakpoints.only('xs')]: { width: 200, height: 200 },
    },
    socialButtons: { margin: theme.spacing(0, 0, -1, -1.75) },

    title: { color: theme.palette.text.disabled },
    name: { fontWeight: 'normal' },
    bio: { whiteSpace: 'pre-line' },

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

export interface IProfileModalProps {
  title: string;
  firstName: string;
  lastName: string;
  profilePhoto?: {
    downloadURL: string;
    name: string;
  }[];
  bio?: string;

  employerLogos?: {
    downloadURL: string;
    name: string;
  }[];
  linkedin?: string;
  twitter?: string;

  hasData: boolean;
  clearData: () => void;
  isSingle: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function ProfileModal({
  title,
  firstName,
  lastName,
  profilePhoto,
  bio,
  employerLogos,
  linkedin,
  twitter,

  hasData,
  clearData,
  isSingle = false,
  onPrev,
  onNext,
}: IProfileModalProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(hasData), [hasData]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(clearData, 400);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open || isSingle || !onNext || !onPrev) return;
    if (e.key === 'ArrowRight') onNext();
    else if (e.key === 'ArrowLeft') onPrev();
  };

  const bottomComponent = (
    <>
      {Array.isArray(employerLogos) && employerLogos.length > 0 && (
        <Grid item>
          <EmployerLogos employerLogos={employerLogos} size={60} spacing={2} />
        </Grid>
      )}

      <Grid item>
        <SocialButtons
          className={classes.socialButtons}
          linkedin={linkedin}
          twitter={twitter}
        />
      </Grid>
    </>
  );

  return (
    <SquareDialog
      open={open}
      maxWidth="md"
      aria-labelledby="modal-name"
      onClose={handleClose}
      fullScreen={isXs}
      overrideClasses={{ content: classes.content }}
      onKeyUp={handleKeyUp}
    >
      <SwitchTransition>
        <Fade
          key={`${firstName} ${lastName} ${JSON.stringify(profilePhoto)}`}
          appear
        >
          <Grid
            container
            spacing={isXs ? 4 : 8}
            wrap="nowrap"
            direction={isXs ? 'column' : 'row'}
          >
            <Grid item>
              <Grid
                container
                spacing={3}
                direction="column"
                wrap="nowrap"
                className={classes.leftColumn}
              >
                <Grid item xs>
                  {profilePhoto?.[0]?.downloadURL && (
                    <Thumbnail
                      imageUrl={profilePhoto?.[0]?.downloadURL}
                      size="640x640"
                      shape="square"
                      alt={`${firstName} ${lastName}’s photo`}
                      className={classes.photo}
                    />
                  )}
                </Grid>

                {!isXs && bottomComponent}
              </Grid>
            </Grid>

            <Grid item xs>
              <Typography
                variant="subtitle2"
                component="p"
                gutterBottom
                className={classes.title}
              >
                {title}
              </Typography>
              <Typography
                variant="h5"
                component="h1"
                id="modal-name"
                className={classes.name}
                paragraph
              >
                {firstName}
                <br />
                {lastName}
              </Typography>

              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.bio}
              >
                {bio}
              </Typography>
            </Grid>

            {isXs && bottomComponent}
          </Grid>
        </Fade>
      </SwitchTransition>

      {!isSingle && (
        <div className={classes.navButtons}>
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
        </div>
      )}
    </SquareDialog>
  );
}
