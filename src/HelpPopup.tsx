import React, { useState } from 'react'
import clsx from 'clsx'

import {
  makeStyles,
  createStyles,
  IconButton,
  Popover,
  SnackbarContent,
} from '@material-ui/core'
import { PopoverProps as MuiPopoverProps } from '@material-ui/core/Popover'

import HelpIcon from '@material-ui/icons/Help'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles(theme =>
  createStyles({
    // Optical adjustment for when alongside Typography variant overline
    besideOverline: {
      margin: theme.spacing(-1.5),
      marginLeft: 0,
    },
    // Optical adjustment for when alongside HeadingCaps component
    // (which has a 4px bottom margin)
    besideHeadingCaps: {
      position: 'relative',
      top: theme.spacing(-0.25),
    },

    paper: { maxWidth: 300 },
  })
)

interface IHelpPopupProps {
  /** The message to show in the popup. Either a node (with Typography) or a string */
  message: React.ReactNode
  /** Override icon */
  icon?: 'help' | 'info'
  /** Style override for the IconButton */
  variant?: 'besideOverline' | 'besideHeadingCaps'
  /** Class override for the IconButton */
  className?: string
  /** Popover element props overrides */
  PopoverProps?: Partial<MuiPopoverProps>
}

/**
 * A small help icon button that displays a popup,
 * passed in via the `message` prop.
 */
const HelpPopup: React.FunctionComponent<IHelpPopupProps> = ({
  message,
  icon = 'help',
  variant,
  className,
  PopoverProps,
}) => {
  const classes = useStyles({})

  /** Either null or the element (IconButton) to anchor the popper */
  const [popperAnchor, setPopperAnchor] = useState<Element | null>(null)

  return (
    <>
      <IconButton
        className={clsx(
          className,
          (variant === 'besideOverline' || variant == 'besideHeadingCaps') &&
            classes.besideOverline,
          variant === 'besideHeadingCaps' && classes.besideHeadingCaps
        )}
        onClick={e => setPopperAnchor(e.currentTarget)}
        color="primary"
        size="small"
      >
        {icon === 'help' && <HelpIcon />}
        {icon === 'info' && <InfoIcon />}
      </IconButton>

      <Popover
        open={!!popperAnchor}
        anchorEl={popperAnchor}
        onClose={() => setPopperAnchor(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        classes={{ paper: classes.paper }}
        {...PopoverProps}
      >
        {typeof message === 'string' ? (
          <SnackbarContent message={message} elevation={0} />
        ) : (
          message
        )}
      </Popover>
    </>
  )
}

export default HelpPopup
