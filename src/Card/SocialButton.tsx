import React from 'react'

import {
  makeStyles,
  createStyles,
  IconButton,
  IconButtonProps,
} from '@material-ui/core'
import { fade } from '@material-ui/core/styles'

import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'
import VideoIcon from '@material-ui/icons/PlayCircleFilled'

const useStyles = makeStyles(theme =>
  createStyles({
    root: ({ color }: { color: string }) => ({
      color: color,
      '&:hover': {
        backgroundColor: fade(color, theme.palette.action.hoverOpacity),
      },
    }),
  })
)

export interface ISocialButtonProps extends Partial<IconButtonProps> {
  /** Optional style overrides */
  className?: string
  /** URL to open in new tab */
  url?: string
  /** Icon to display */
  icon?: 'linkedin' | 'twitter' | 'video'
  /** Optionally show a disabled button if no URL provided */
  showDisabled?: boolean
}

export default function SocialButton({
  className,
  url,
  icon,
  showDisabled = false,
  ...props
}: ISocialButtonProps) {
  const classes = useStyles({
    color:
      icon === 'linkedin'
        ? '#0B66C2'
        : icon === 'twitter'
        ? '#1DA1F2'
        : '#303030',
  })

  if (!url && !showDisabled) return null

  return (
    <IconButton
      classes={classes}
      className={className}
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      disabled={showDisabled && !url}
      aria-label={icon}
      {...(props as any)}
    >
      {icon === 'linkedin' && <LinkedInIcon color="inherit" />}
      {icon === 'twitter' && <TwitterIcon color="inherit" />}
      {icon === 'video' && <VideoIcon color="inherit" />}
    </IconButton>
  )
}
