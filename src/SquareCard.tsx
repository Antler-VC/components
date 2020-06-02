import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Card,
  CardProps,
  CardActionArea,
  CardActionAreaProps,
} from '@material-ui/core';

export const useSquareCardStyles = makeStyles(theme =>
  createStyles({
    disableHover: {},

    root: {
      height: '100%',
      position: 'relative',

      transition: theme.transitions.create(['box-shadow', 'transform']),
      '&:hover, &:focus-within': {
        boxShadow:
          '0 1px 1px rgba(0,0,0,.035), 0 2px 2px rgba(0,0,0,.035), 0 4px 4px rgba(0,0,0,.035), 0 6px 8px rgba(0,0,0,.035), 0 8px 16px rgba(0,0,0,.035)',
        transform: `translateY(${theme.spacing(-0.5)}px)`,

        '@media screen and (prefers-reduced-motion: reduce), (update: slow)': {
          transform: 'none',
        },
      },

      '&$disableHover': {
        transition: 'none',

        '&:hover': {
          boxShadow: 'none',
          transform: 'none',
        },
      },
    },

    actionArea: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
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

export interface ISquareCardProps extends Partial<Omit<CardProps, 'onClick'>> {
  disableHover?: boolean;

  onClick?: CardActionAreaProps['onClick'];
  href?: string;
  CardActionAreaProps?: Partial<CardActionAreaProps>;
}

export const SquareCard = React.forwardRef(
  (
    {
      disableHover,
      className,
      children,
      onClick,
      href,
      CardActionAreaProps,
      ...props
    }: ISquareCardProps,
    ref
  ) => {
    const classes = useSquareCardStyles();

    let contents = children;

    if (onClick || href || CardActionAreaProps) {
      if (href) {
        contents = (
          <CardActionArea
            classes={{
              root: classes.actionArea,
              focusHighlight: classes.focusHighlight,
              focusVisible: classes.focusVisible,
            }}
            component="a"
            href={href}
            target="_blank"
            rel="noopener"
            onClick={onClick}
            {...(CardActionAreaProps as any)}
          >
            {children}
          </CardActionArea>
        );
      } else {
        contents = (
          <CardActionArea
            classes={{
              root: classes.actionArea,
              focusHighlight: classes.focusHighlight,
              focusVisible: classes.focusVisible,
            }}
            onClick={onClick}
            {...CardActionAreaProps}
          >
            {children}
          </CardActionArea>
        );
      }
    }

    return (
      <Card
        className={clsx(
          classes.root,
          disableHover && classes.disableHover,
          className
        )}
        elevation={0}
        square
        ref={ref}
        {...props}
      >
        {contents}
      </Card>
    );
  }
);

export default SquareCard;
