import React from 'react';

import { CardContent } from '@material-ui/core';

import SquareCard, { ISquareCardProps } from '../SquareCard';
import { IStartupCardContentsProps } from './StartupCardContents';

export interface IStartupCardProps extends IStartupCardContentsProps {
  CardProps?: Partial<ISquareCardProps>;
  actions?: React.ReactNode;
}

export default function StartupCard({
  CardProps,
  actions,
  ...props
}: IStartupCardProps) {
  return (
    <SquareCard {...(CardProps ?? {})}>
      <CardContent style={{ flexGrow: 1 }}>
        <StartupCardContents {...props} />
      </CardContent>

      {actions}
    </SquareCard>
  );
}
