import React from 'react';

import ProfileCard from '../../../src/Card/ProfileCard';
import ProfileTabbedCard from '../../../src/Card/ProfileTabbedCard';
import CardInfoList from '../../../src/Card/CardInfoList';
import CardTagList from '../../../src/Card/CardTagList';

export default {
  title: 'Antler Theme/Components/Card',
  component: ProfileCard,
  argTypes: {
    overline: {
      defaultValue: 'Portfolio',
      control: { type: 'text' },
    },
    overlineSecondary: {
      defaultValue: 'May 2020',
      control: { type: 'text' },
    },
    title: {
      defaultValue: 'AppBoxo',
      control: { type: 'text' },
    },
    body: {
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
      defaultValue: 320,
      control: {
        type: 'range',
        min: 0,
        max: 1000,
      },
    },
  },
};

export const Profile = args => (
  <ProfileCard
    {...args}
    primaryLink={{ href: args.buttonLink, label: args.buttonLabel }}
    style={{ width: args.width }}
    image={{ imageUrl: args.imageSource }}
    body={
      <>
        <CardInfoList
          infoList={[
            { name: 'Primary', value: 'Consumer' },
            { name: 'B. Model', value: 'Marketplace' },
          ]}
        />
        <CardTagList
          name="Focus Area"
          tags={['Corporate Strategy', 'IoT Solutions', 'E-Commerce']}
        />
      </>
    }
  />
);

export const ProfileTabbed = args => (
  <ProfileTabbedCard
    {...args}
    primaryLink={{ href: args.buttonLink, label: args.buttonLabel }}
    style={{ width: args.width }}
    image={{ imageUrl: args.imageSource }}
    tabs={[
      {
        label: 'About',
        body: (
          <>
            <CardInfoList
              infoList={[
                { name: 'Primary', value: 'Consumer' },
                { name: 'B. Model', value: 'Marketplace' },
              ]}
            />
            <CardTagList
              name="Focus Area"
              tags={['Corporate Strategy', 'IoT Solutions', 'E-Commerce']}
            />
          </>
        ),
      },
      {
        label: 'Team',
        body: 'Testing',
      },
    ]}
  />
);
