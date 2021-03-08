import React from 'react';

import CardSkeleton from '../../../src/Card/CardSkeleton';

export default {
  title: 'Antler Theme/Components/Card/Skeleton',
  component: CardSkeleton,
  argTypes: {
    width: {
      defaultValue: 320,
      control: {
        type: 'range',
        min: 0,
        max: 1000,
      },
    },
  },
};

export const Skeleton = args => (
  <CardSkeleton {...args} style={{ width: args.width }} />
);
