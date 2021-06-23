import React from 'react';

import CardGrid from '../../../src/layouts/CardGrid';
import Component from '../../../src/DemoDay/AntlerProfileCard';

export default {
  title: 'Antler Theme/Components/Demo Day/Antler Profile Card',
  argTypes: {
    preferredName: {
      defaultValue: 'Magnus',
      control: { type: 'text' },
    },
    firstName: {
      defaultValue: 'Magnus',
      control: { type: 'text' },
    },
    lastName: {
      defaultValue: 'Grimeland',
      control: { type: 'text' },
    },
    title: {
      defaultValue: 'Founder and CEO',
      control: { type: 'text' },
    },
    showEmployerLogos: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    linkedin: {
      defaultValue: 'https://www.linkedin.com/in/magnus-grimeland-953b311/',
      control: { type: 'text' },
    },
    twitter: {
      defaultValue: 'https://twitter.com/MagnusGrimeland',
      control: { type: 'text' },
    },
  },
};

export const AntlerProfileCard = args => (
  <CardGrid maxCols={3}>
    <Component
      data={{
        ...args,
        employerLogos: args.showEmployerLogos
          ? [
              {
                downloadURL:
                  'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/logos%2Fmckinsey.com.png?alt=media&token=0ebe11f5-f854-4c4d-845e-63bd26384f2f',
              },
              {
                downloadURL:
                  'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/logos%2Fzalora.sg.png?alt=media&token=d543c3de-a958-4c1d-9cd2-afbb5f0ff63e',
              },
              {
                downloadURL:
                  'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/logos%2Fglobal-fashion-group.com.png?alt=media&token=0d6b1409-5093-454b-b59a-31c69b129daa',
              },
            ]
          : [],
        profilePhoto: [
          {
            downloadURL:
              'https://images.prismic.io/antlerco/84055d75b953779ee239a1394604e76047db1282_gl-team-magnus-grimeland.jpg?auto=compress,format',
          },
        ],
      }}
      onClick={() => alert('Clicked')}
    />
  </CardGrid>
);
