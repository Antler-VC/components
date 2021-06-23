import React from 'react';

import CardGrid from '../../../src/layouts/CardGrid';
import Component from '../../../src/DemoDay/StartupCard';

export default {
  title: 'Antler Theme/Components/Demo Day/Startup Card',
  argTypes: {
    sector: {
      defaultValue: ['Venture Capital'],
      control: { type: 'array' },
    },
    year: {
      defaultValue: '2021',
      control: { type: 'text' },
    },
    teamName: {
      defaultValue: 'Antler',
      control: { type: 'text' },
    },
    oneLineDescription: {
      defaultValue:
        'We invest in the world’s most exceptional people and the defining companies of tomorrow.',
      control: { type: 'text' },
    },
  },
};

export const StartupCard = args => (
  <CardGrid>
    <Component
      data={{
        ...args,
        logo: [
          {
            downloadURL:
              'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/ANTLER.png?alt=media&token=febf7644-4c6e-4685-b49f-bdc73915b8a9',
          },
        ],
      }}
      actionRows={[
        {
          primaryButton: { label: 'Learn More' },
        },
      ]}
    />
  </CardGrid>
);
