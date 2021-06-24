import React from 'react';
import _isFunction from 'lodash/isFunction';

import {
  makeStyles,
  createStyles,
  Typography,
  CardActionArea,
  CardActionAreaProps,
} from '@material-ui/core';

import BasicCard, { IBasicCardProps } from '../Card/BasicCard';
import CardTitle from '../Card/CardTitle';
import EmployerLogos from './EmployerLogos';
import SocialButtons from '../DemoDay/SocialButtons';
import Thumbnail from '../Thumbnail';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '&:focus-within': { boxShadow: theme.shadows[1] },
    },

    flex: {
      display: 'flex',
      height: '100%',
    },
    main: {
      flexGrow: 1,
      marginRight: 'var(--spacing-card)',

      display: 'flex',
      flexDirection: 'column',
      '& > * + *': {
        marginTop: 'var(--spacing-card)',
      },
    },

    name: {
      '* + &': { marginTop: 'calc(var(--spacing-card) / 2)' },
      flexGrow: 1,
    },
    socialButtons: {
      marginBottom: theme.spacing(-1.5),
      marginLeft: theme.spacing(-1.75),
    },

    photo: {
      width: 128,
      height: 128,

      [theme.breakpoints.down('sm')]: {
        width: 80,
        height: 80,
      },
    },

    actionArea: {
      margin: 'calc(var(--spacing-card) * -1)',
      padding: 'var(--spacing-card)',
      boxSizing: 'content-box',
      width: '100%',
      height: '100%',
    },
    focusHighlight: {
      display: 'none',
    },
    focusVisible: {
      '$actionArea& $focusHighlight': {
        display: 'block',
        opacity: theme.palette.action.hoverOpacity,
      },
    },
  })
);

export interface IAntlerProfileCardProps extends IBasicCardProps {
  data: {
    title: string;
    preferredName?: string;
    firstName: string;
    lastName: string;
    profilePhoto?: { downloadURL: string }[];

    employerLogos?: { downloadURL: string }[];
    linkedin?: string;
    twitter?: string;
  };

  onClick?: () => void;
  CardActionAreaProps?: Partial<CardActionAreaProps>;
}

export default function AntlerProfileCard({
  data: {
    title,
    preferredName,
    firstName,
    lastName,
    profilePhoto,

    employerLogos,
    linkedin,
    twitter,
  },

  onClick,
  CardActionAreaProps,
  ...props
}: IAntlerProfileCardProps) {
  const classes = useStyles();

  const body = (
    <div className={classes.flex}>
      <div className={classes.main}>
        {title && <Typography variant="overline">{title}</Typography>}

        <CardTitle className={classes.name}>
          {preferredName || firstName}
          <br />
          {lastName}
        </CardTitle>

        {Array.isArray(employerLogos) && employerLogos.length > 0 ? (
          <EmployerLogos employerLogos={employerLogos} />
        ) : (
          <SocialButtons
            className={classes.socialButtons}
            linkedin={linkedin}
            twitter={twitter}
          />
        )}
      </div>

      {profilePhoto?.[0]?.downloadURL && (
        <Thumbnail
          imageUrl={profilePhoto?.[0]?.downloadURL}
          size="400x400"
          shape="square"
          className={classes.photo}
        />
      )}
    </div>
  );

  return (
    <BasicCard
      className={classes.root}
      {...props}
      body={
        onClick ? (
          <CardActionArea
            classes={{
              root: classes.actionArea,
              focusHighlight: classes.focusHighlight,
              focusVisible: classes.focusVisible,
            }}
            onClick={onClick}
            {...CardActionAreaProps}
          >
            {body}
          </CardActionArea>
        ) : (
          body
        )
      }
    />
  );
}
