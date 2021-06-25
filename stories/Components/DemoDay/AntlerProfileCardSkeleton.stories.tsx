import React from 'react';

import CardGrid from '../../../src/layouts/CardGrid';
import { AntlerProfileCardSkeleton as Component } from '../../../src/DemoDay/AntlerProfileCard';

export default {
  title: 'Antler Theme/Components/Demo Day/Antler Profile Card Skeleton',
};

export const AntlerProfileCardSkeleton = () => (
  <CardGrid maxCols={3}>
    <Component />
  </CardGrid>
);
