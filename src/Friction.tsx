import React, { useState } from 'react';
import _find from 'lodash/find';

import {
  makeStyles,
  createStyles,
  TextField,
  RadioGroup,
  ButtonBase,
  FormControlLabel,
  Radio,
  Typography,
  Divider,
} from '@material-ui/core';

import Modal, { IModalProps } from './Modal/Modal';

const useStyles = makeStyles(theme =>
  createStyles({
    buttonBase: {
      display: 'block',
      textAlign: 'left',
      width: '100%',
    },
    option: { padding: theme.spacing(1.5, 0) },
    optionDivider: { marginLeft: theme.spacing(4) },

    dryWrapper: {
      marginTop: theme.spacing(2),
      userSelect: 'none',
    },
    dryField: { marginTop: theme.spacing(1) },
  })
);

export interface IFrictionProps extends Omit<IModalProps, 'onClose' | 'title'> {
  children: NonNullable<React.ReactElement>;
  childClickHandler?: string;
  message?: {
    title?: string;
    customBody?: React.ReactNode;
    body?: React.ReactNode;
    options?: {
      title: React.ReactNode;
      description?: React.ReactNode;
      value: string;
      action?: () => void;
    }[];
    cancel?: React.ReactNode;
    confirm?: React.ReactNode;
  };
  dryCommand?: string;
}

export default function Friction({
  children,
  message,
  dryCommand,
  childClickHandler = 'onClick',
  ...props
}: IFrictionProps) {
  const classes = useStyles();

  const [showDialog, setShowDialog] = useState(false);
  const [dryText, setDryText] = useState('');
  const [confirmationOption, setConfirmationOption] = useState('');

  const handleClose = () => {
    setShowDialog(false);
    setDryText('');
    setConfirmationOption('');
  };

  const confirmHandler = children.props[childClickHandler];
  const button = React.cloneElement(children, {
    [childClickHandler]: () => setShowDialog(true),
  });

  const hasOptions =
    !!message?.options &&
    Array.isArray(message.options) &&
    message.options.length > 0;

  let disablePrimaryButton = false;
  if (hasOptions) disablePrimaryButton = !confirmationOption;
  if (dryCommand)
    disablePrimaryButton = dryCommand ? dryText !== dryCommand : false;

  return (
    <>
      {button}

      {showDialog && (
        <Modal
          disableBackdropClick
          maxWidth="xs"
          {...(!dryCommand &&
          (!Array.isArray(message?.options) || message?.options?.length === 0)
            ? { fullScreen: undefined }
            : {})}
          {...props}
          onClose={handleClose}
          title={(message && message.title) || 'Are you sure?'}
          body={
            message && (
              <>
                {message.customBody}
                {message.body}

                {hasOptions && (
                  <RadioGroup
                    aria-label="Confirmation options"
                    name="confirmationOptions"
                    value={confirmationOption}
                    onChange={e => setConfirmationOption(e.target.value)}
                  >
                    {message!.options!.map(option => (
                      <div key={option.value}>
                        <ButtonBase className={classes.buttonBase}>
                          <FormControlLabel
                            value={option.value}
                            control={<Radio disableRipple />}
                            label={
                              <>
                                <Typography variant="subtitle1">
                                  {option.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {option.description}
                                </Typography>
                              </>
                            }
                            className={classes.option}
                          />
                        </ButtonBase>
                        <Divider className={classes.optionDivider} />
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {dryCommand && (
                  <div className={classes.dryWrapper}>
                    <TextField
                      value={dryText}
                      variant="filled"
                      onChange={e => setDryText(e.target.value)}
                      className={classes.dryField}
                      label={`Type ${dryCommand} here to continue`}
                      placeholder={dryCommand}
                      fullWidth
                      disabled={hasOptions && !confirmationOption}
                    />
                  </div>
                )}
              </>
            )
          }
          actions={{
            primary: {
              children: (message && message.confirm) || 'Confirm',
              onClick: () => {
                if (hasOptions && confirmationOption) {
                  const action = _find(
                    message!.options,
                    o => o.value === confirmationOption
                  )!.action;

                  if (action) action();
                  else confirmHandler();
                } else {
                  confirmHandler();
                }
              },
              closeOnClick: true,
              disabled: disablePrimaryButton,
            },
            secondary: {
              children: (message && message.cancel) || 'Cancel',
              closeOnClick: true,
            },
          }}
        />
      )}
    </>
  );
}
