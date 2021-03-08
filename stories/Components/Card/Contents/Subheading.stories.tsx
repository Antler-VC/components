import React from 'react';

import CardSubheading from '../../../../src/Card/CardSubheading';
import CardBody from '../../../../src/Card/CardBody';

export default {
  title: 'Antler Theme/Components/Card/Contents/Subheading',
  argTypes: {
    heading: {
      defaultValue: 'Description',
      control: { type: 'text' },
    },
    body: {
      defaultValue:
        'Appboxo is a super app infrastructure platform that allows companies to launch and integrate mini-apps within their software. They recently completed a US$1.1m seed funding round led by Founders Fund, with participation from 500 Startups, Plug and Play Tech Center and Antler. They plan to use the fresh funds to scale the platform and add new mini-apps in travel, e-commerce, finance, and lifestyle industries.',
      control: { type: 'text' },
    },
  },
};

export const Subheading = args => (
  <>
    <CardSubheading>{args.heading}</CardSubheading>
    <CardBody body={args.body} />
  </>
);
