import React from 'react';

import CardGrid from '../../../src/layouts/CardGrid';
import StartupJobCard from '../../../src/StartupPage/StartupJobCard';

export default {
  title: 'Antler Theme/Components/Startup Page/Job Card',
  argTypes: {
    jobFunction: {
      defaultValue: 'Marketing',
      control: { type: 'text' },
    },
    location: {
      defaultValue: 'Global',
      control: { type: 'text' },
    },
    jobTitle: {
      defaultValue: 'Marketing Coordinator',
      control: { type: 'text' },
    },
    teamName: {
      defaultValue: 'Antler',
      control: { type: 'text' },
    },
    description: {
      defaultValue: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      control: { type: 'text' },
    },
    applicationDeadline: {
      defaultValue: new Date().getTime() / 1000,
      control: { type: 'number' },
    },
  },
};

export const JobCard = args => (
  <CardGrid>
    <StartupJobCard
      data={{ ...args }}
      teamName={args.teamName}
      logo={[
        {
          downloadURL:
            'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/ANTLER.png?alt=media&token=febf7644-4c6e-4685-b49f-bdc73915b8a9',
        },
      ]}
      actionRows={[
        {
          primaryLink: {
            label: 'Details',
            href: 'https://antler.co/careers',
          },
        },
      ]}
    />
  </CardGrid>
);
