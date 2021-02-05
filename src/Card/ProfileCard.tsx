import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from '@material-ui/core';

import ProfileCardHeading, {
  IProfileCardHeadingProps,
} from './ProfileCardHeading';
import CardBody, { ICardBodyProps } from './CardBody';
import CardActionRow, { ICardActionRowProps } from './CardActionRow';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '--spacing-card': theme.spacing('s') + 'px',
      [theme.breakpoints.down('xs')]: {
        '--spacing-card': theme.spacing('xs') + 'px',
      },
    },

    cardContent: {
      padding: 'var(--spacing-card)',
      '&:last-child': { paddingBottom: 'var(--spacing-card)' },

      '& > * + *': { marginTop: 'var(--spacing-card)' },
    },
  })
);

export interface IProfileCardProps
  extends Omit<IProfileCardHeadingProps, 'isMobile'>,
    Partial<ICardBodyProps> {
  className?: string;
  style?: React.CSSProperties;

  actionRows?: ICardActionRowProps[];
}

export default function ProfileCard({
  className,
  style,

  overline,
  overlineSecondary,
  title,
  image,

  body,

  actionRows = [],
}: IProfileCardProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Card className={clsx(classes.root, className)} style={style}>
      <CardContent className={classes.cardContent}>
        <ProfileCardHeading
          isMobile={isMobile}
          overline={overline}
          overlineSecondary={overlineSecondary}
          title={title}
          image={image}
        />

        {body && <CardBody body={body} />}
      </CardContent>

      {actionRows.map((props, i) => (
        <CardActionRow key={i} {...props} />
      ))}
    </Card>
  );
}
