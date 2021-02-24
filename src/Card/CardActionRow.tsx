import React from 'react';

import {
  makeStyles,
  createStyles,
  Divider,
  CardActions,
  Button,
  ButtonProps,
} from '@material-ui/core';
import GoIcon from '../GoIcon';

const useStyles = makeStyles(theme =>
  createStyles({
    divider: {
      margin: '0 var(--spacing-card)',
    },

    row: {
      height: 56,
      padding: '0 var(--spacing-card)',
    },

    primary: { marginLeft: -theme.spacing(1) },
    secondary: { marginLeft: 'auto' },
  })
);

export interface ICardActionRowProps {
  primaryButton?: { label: string } & Partial<ButtonProps>;
  primaryLink?: {
    href?: string;
    target?: string;
    rel?: string;
    label: string;
  } & Partial<ButtonProps>;
  primaryElement?: React.ReactNode;

  secondaryAction?: React.ReactNode;

  children?: React.ReactNode;
}

export default function CardActionRow({
  primaryButton,
  primaryLink,
  primaryElement,
  secondaryAction,
  children,
}: ICardActionRowProps) {
  const classes = useStyles();

  if (children)
    return (
      <>
        <Divider className={classes.divider} />
        <CardActions disableSpacing className={classes.row}>
          {children}
        </CardActions>
      </>
    );

  const primaryButtonProps = primaryLink
    ? {
        component: 'a',
        endIcon: <GoIcon />,
        ...primaryLink,
        label: undefined,
        children: primaryLink.label,
      }
    : primaryButton
    ? {
        endIcon: <GoIcon />,
        ...primaryButton,
        label: undefined,
        children: primaryButton.label,
      }
    : null;

  return (
    <>
      <Divider className={classes.divider} />
      <CardActions disableSpacing className={classes.row}>
        <div className={classes.primary}>
          {primaryElement ??
            (primaryButtonProps && <Button {...primaryButtonProps} />)}
        </div>

        {secondaryAction && (
          <div className={classes.secondary}>{secondaryAction}</div>
        )}
      </CardActions>
    </>
  );
}
