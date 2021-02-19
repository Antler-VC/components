import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles, Card, CardContent } from '@material-ui/core';
import { spacingFn } from '../Theme/spacing';

import CardBody, { ICardBodyProps } from './CardBody';
import CardActionRow, { ICardActionRowProps } from './CardActionRow';

export const useBasicCardStyles = makeStyles(theme =>
  createStyles({
    root: {
      '--spacing-card': spacingFn('s') + 'px',
      [theme.breakpoints.down('xs')]: {
        '--spacing-card': spacingFn('xs') + 'px',
      },

      display: 'flex',
      flexDirection: 'column',
    },

    cardContent: {
      flexGrow: 1,

      padding: 'var(--spacing-card)',
      '&:last-child': { paddingBottom: 'var(--spacing-card)' },

      display: 'flex',
      flexDirection: 'column',
      '& > * + *': { marginTop: 'var(--spacing-card)' },
    },
  })
);

export interface IBasicCardProps extends Partial<ICardBodyProps> {
  className?: string;
  style?: React.CSSProperties;

  actionRows?: ICardActionRowProps[];
}

export default function BasicCard({
  className,
  style,

  body,
  actionRows = [],
}: IBasicCardProps) {
  const classes = useBasicCardStyles();

  return (
    <Card className={clsx(classes.root, className)} style={style}>
      <CardContent className={classes.cardContent}>
        {body && <CardBody body={body} />}
      </CardContent>

      {actionRows.map((props, i) => (
        <CardActionRow key={i} {...props} />
      ))}
    </Card>
  );
}
