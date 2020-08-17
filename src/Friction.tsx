import React, { useState } from 'react'
import _find from 'lodash/find'

import {
  makeStyles,
  createStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  RadioGroup,
  ButtonBase,
  FormControlLabel,
  Radio,
  Typography,
  Divider,
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    content: { whiteSpace: 'pre-line' },

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
)

export interface IFrictionProps {
  children: NonNullable<React.ReactElement>
  childClickHandler?: string
  message?: {
    title?: string
    customBody?: React.ReactNode
    body?: React.ReactNode
    options?: {
      title: React.ReactNode
      description?: React.ReactNode
      value: string
      action?: () => void
    }[]
    cancel?: React.ReactNode
    confirm?: React.ReactNode
  }
  dryCommand?: string
}

const Friction: React.FunctionComponent<IFrictionProps> = ({
  children,
  message,
  dryCommand,
  childClickHandler = 'onClick',
}) => {
  const classes = useStyles()

  const [showDialog, setShowDialog] = useState(false)
  const [dryText, setDryText] = useState('')
  const [confirmationOption, setConfirmationOption] = useState('')

  const handleClose = () => {
    setShowDialog(false)
    setDryText('')
    setConfirmationOption('')
  }

  const confirmHandler = children.props[childClickHandler]
  const button = React.cloneElement(children, {
    [childClickHandler]: () => setShowDialog(true),
  })

  const hasOptions =
    !!message?.options &&
    Array.isArray(message.options) &&
    message.options.length > 0

  let disablePrimaryButton = false
  if (hasOptions) disablePrimaryButton = !confirmationOption
  if (dryCommand)
    disablePrimaryButton = dryCommand ? dryText !== dryCommand : false

  return (
    <>
      {button}
      <Dialog open={showDialog} onClose={handleClose} disableBackdropClick>
        <DialogTitle disableTypography>
          <Typography variant="h5" component="h1">
            {(message && message.title) || 'Are you sure?'}
          </Typography>
        </DialogTitle>
        {message && (
          <DialogContent className={classes.content}>
            {message.customBody}
            {message.body && (
              <DialogContentText>{message.body}</DialogContentText>
            )}

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
                            <Typography variant="body2" color="textSecondary">
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
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {(message && message.cancel) || 'Cancel'}
          </Button>
          <Button
            onClick={() => {
              if (hasOptions && confirmationOption) {
                const action = _find(
                  message!.options,
                  o => o.value === confirmationOption
                )!.action

                if (action) action()
                else confirmHandler()
              } else {
                confirmHandler()
              }
              handleClose()
            }}
            color="primary"
            disabled={disablePrimaryButton}
          >
            {(message && message.confirm) || 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Friction
