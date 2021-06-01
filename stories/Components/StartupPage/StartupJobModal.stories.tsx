import React, { useState } from 'react';

import StartupJobModal from '../../../src/StartupJobModal/StartupJobModal';

export default {
  title: 'Antler Theme/Components/Startup Page/Job Modal',
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
    descriptionResponsibilities: {
      defaultValue: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      control: { type: 'text' },
    },
    descriptionOffers: {
      defaultValue: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      control: { type: 'text' },
    },
    externalJobAd: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    externalJobAdLink: {
      defaultValue: '',
      control: { type: 'text' },
    },
    portfolioLink: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    applicationDeadline: {
      defaultValue: new Date().getTime() / 1000,
      control: { type: 'number' },
    },
  },
};

export const JobModal = args => {
  const [index, setIndex] = useState(0);

  return (
    <StartupJobModal
      data={{
        id: `TEST ${index}`,
        ...args,
        jobTitle: `${args.jobTitle} (${index})`,
        team: [
          {
            docPath: 'TEST TEAM',
            snapshot: {
              teamName: args.teamName,
              cohort: 'TEST COHORT',
              logo: [
                {
                  downloadURL:
                    'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/ANTLER.png?alt=media&token=febf7644-4c6e-4685-b49f-bdc73915b8a9',
                },
              ],
            },
          },
        ],
      }}
      onClose={() => alert('CLOSE')}
      hasPrev={index > 0}
      hasNext={index < 3}
      onPrev={() => setIndex(i => i - 1)}
      onNext={() => setIndex(i => i + 1)}
      FormProps={{ onSubmit: () => alert('SUBMIT') }}
    />
  );
};
