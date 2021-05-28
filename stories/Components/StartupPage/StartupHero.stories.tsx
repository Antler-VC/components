import React from 'react';

import StartupHero from '../../../src/StartupPage/StartupHero';
import CtaButton from '../../../src/CtaButton';

export default {
  title: 'Antler Theme/Components/Startup Page/Hero',
  argTypes: {
    location: {
      defaultValue: 'Global',
      control: { type: 'text' },
    },
    year: {
      defaultValue: '2021',
      control: { type: 'text' },
    },
    teamName: {
      defaultValue: 'Antler',
      control: { type: 'text' },
    },
    tagline: {
      defaultValue: 'Global early-stage VC firm',
      control: { type: 'text' },
    },
    oneLineDescription: {
      defaultValue:
        'We invest in the world’s most exceptional people and the defining companies of tomorrow.',
      control: { type: 'text' },
    },
    elevatorPitch: {
      defaultValue:
        "Founded in Singapore in 2017, Antler is on a mission to fundamentally improve the world by enabling and investing in the world's most exceptional people, by building complementary co-founder teams, supporting the teams with deep business model validation and providing a global platform for scaling.\n\nTo date, Antler has invested in over 300 companies globally across 30 different industries. Of these companies, 40% have at least one female co-founder, and the founders represent 70 nationalities.",
      control: { type: 'text' },
    },
    website: {
      defaultValue: 'antler.co',
      control: { type: 'text' },
    },
  },
};

export const Hero = args => (
  <StartupHero
    {...args}
    logo={[
      {
        downloadURL:
          'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/ANTLER.png?alt=media&token=febf7644-4c6e-4685-b49f-bdc73915b8a9',
      },
    ]}
    primaryActions={
      <CtaButton variant="contained" size="medium">
        Primary Button
      </CtaButton>
    }
    secondaryActions={
      <CtaButton variant="outlined" size="medium">
        Secondary Button
      </CtaButton>
    }
  />
);
