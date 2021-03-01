import React from 'react';
import clsx from 'clsx';

import { Card, CardContent } from '@material-ui/core';

import { useBasicCardStyles } from './BasicCard';
import FounderCardHeading, {
  IFounderCardHeadingProps,
} from './FounderCardHeading';
import CardBody, { ICardBodyProps } from './CardBody';
import CardActionRow, { ICardActionRowProps } from './CardActionRow';

export interface IFounderCardProps
  extends Omit<IFounderCardHeadingProps, 'isMobile'>,
    Partial<ICardBodyProps> {
  className?: string;
  style?: React.CSSProperties;

  actionRows?: ICardActionRowProps[];
}

export default function FounderCard({
  className,
  style,

  overline,
  overlineSecondary,
  title,
  image,

  body,

  actionRows = [],
}: IFounderCardProps) {
  const classes = useBasicCardStyles();

  return (
    <Card className={clsx(classes.root, className)} style={style}>
      <CardContent className={classes.cardContent}>
        <FounderCardHeading
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
