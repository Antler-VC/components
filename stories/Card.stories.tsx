import React from 'react';

import BasicCard from '../src/Card';

export default {
  title: 'Card',
  component: BasicCard,
  argTypes: {
    overline: {
      defaultValue: 'Portfolio',
      control: { type: 'text' },
    },
    title: {
      defaultValue: 'AppBoxo',
      control: { type: 'text' },
    },
    bodyContent: {
      defaultValue:
        'Appboxo is a super app infrastructure platform that allows companies to launch and integrate mini-apps within their software. They recently completed a US$1.1m seed funding round led by Founders Fund, with participation from 500 Startups, Plug and Play Tech Center and Antler. They plan to use the fresh funds to scale the platform and add new mini-apps in travel, e-commerce, finance, and lifestyle industries.',
      control: { type: 'text' },
    },
    buttonLabel: {
      defaultValue: 'Learn More',
      control: { type: 'text' },
    },
    buttonLink: {
      defaultValue: 'https://google.com/',
      control: { type: 'text' },
    },
    imageSource: {
      defaultValue:
        'https://images.prismic.io/antlerco/f14c11d3-6c58-46d0-b22c-83bf8bfa9fe9_Antler+Appboxo+Team+picture.jpg?auto=compress,format&rect=0,313,6000,3375&w=1920&h=1080',
      control: { type: 'text' },
    },
    width: {
      defaultValue: 300,
      control: {
        type: 'range',
        min: 0,
        max: 1000,
      },
    },
  },
};

export const WIP = args => (
  <BasicCard
    {...args}
    primaryLink={{ href: args.buttonLink, label: args.buttonLabel }}
    style={{ width: args.width }}
  />
);
