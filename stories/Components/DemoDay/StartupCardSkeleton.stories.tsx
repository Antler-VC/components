import React from 'react';

import CardGrid from '../../../src/layouts/CardGrid';
import { StartupCardSkeleton as Component } from '../../../src/DemoDay/StartupCard';

export default {
  title: 'Antler Theme/Components/Demo Day/Startup Card Skeleton',
};

export const StartupCardSkeleton = () => (
  <CardGrid>
    <Component />
  </CardGrid>
);
