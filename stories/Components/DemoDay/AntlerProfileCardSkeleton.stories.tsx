import React from 'react';

import CardGrid from '../../../src/layouts/CardGrid';
import Component from '../../../src/DemoDay/AntlerProfileCardSkeleton';

export default {
  title: 'Antler Theme/Components/Demo Day/Antler Profile Card Skeleton',
};

export const AntlerProfileCardSkeleton = () => (
  <CardGrid maxCols={3}>
    <Component />
  </CardGrid>
);
