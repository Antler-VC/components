import React from 'react';

import StartupFounders from '../../../src/StartupPage/StartupFounders';

export default {
  title: 'Antler Theme/Components/Startup Page/Founders',
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
    founderBio: {
      defaultValue:
        'Magnus will challenge your ideas and loves spending time in front of a whiteboard with founders. He previously co-founded Zalora, Asia’s largest fashion e-commerce company. It was later acquired by Global Fashion Group (GFG), where Magnus served as COO and Managing Director, rolling out the firm’s marketplace across 26 countries.\n\nMagnus is an alumnus of Harvard University and McKinsey & Company in which he worked for six years. His last role at McKinsey & Co was as a Junior Partner, working across North America, Europe and Asia in the global telecom, media and high-tech industries. ',
      control: { type: 'text' },
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

export const Founders = args => (
  <StartupFounders
    teamMembers={[
      {
        docPath: '1',
        snapshot: {
          ...args,
          profilePhoto: [
            {
              downloadURL:
                'https://images.prismic.io/antlerco/84055d75b953779ee239a1394604e76047db1282_gl-team-magnus-grimeland.jpg?auto=compress,format',
            },
          ],
          employerLogos: [
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
          ],
        },
      },
      {
        docPath: '2',
        snapshot: {
          ...args,
          lastName: 'Grimeland (2)',
          profilePhoto: [
            {
              downloadURL:
                'https://images.prismic.io/antlerco/84055d75b953779ee239a1394604e76047db1282_gl-team-magnus-grimeland.jpg?auto=compress,format',
            },
          ],
          employerLogos: [
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
          ],
        },
      },
    ]}
  />
);
