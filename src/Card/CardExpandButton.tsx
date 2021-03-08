import React from 'react'
import clsx from 'clsx'

import { makeStyles, createStyles, Button } from '@material-ui/core'
import ExpandIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      margin: `0
        calc(var(--spacing-card) * -1)
        calc(var(--spacing-card) * -1 - 1px)`,
      marginTop: 'auto',
      paddingTop: 'var(--spacing-card)',

      borderBottom: `1px solid ${theme.palette.antler.aGray[300]}`,
      position: 'relative',
    },
    expanded: {},

    button: {
      borderRadius: 0,

      paddingLeft: 'var(--spacing-card)',
      paddingRight: 'var(--spacing-card)',

      height: 56,

      color: theme.palette.text.secondary,
      '$expanded &': { color: theme.palette.text.primary },
    },
    buttonLabel: {
      justifyContent: 'space-between',
    },

    endIcon: {
      marginRight: 0,
    },
    icon: {
      transition: theme.transitions.create('transform'),
      '&:first-child': { fontSize: '1.5rem' },

      '$expanded &': { transform: 'rotate(180deg)' },
    },
  })
)

export interface ICardExpandButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}

export default function CardExpandButton({
  expanded,
  setExpanded,
  ...props
}: ICardExpandButtonProps) {
  const classes = useStyles()

  return (
    <div
      {...props}
      className={clsx(
        classes.root,
        expanded && classes.expanded,
        props.className
      )}
    >
      <Button
        onClick={() => setExpanded(!expanded)}
        color="default"
        fullWidth
        classes={{
          root: classes.button,
          label: classes.buttonLabel,
          endIcon: classes.endIcon,
        }}
        endIcon={<ExpandIcon className={classes.icon} />}
      >
        {expanded ? 'Collapse' : 'Expand'}
      </Button>
    </div>
  )
}
