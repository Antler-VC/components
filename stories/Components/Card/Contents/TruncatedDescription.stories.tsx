import React, { useState } from 'react';

import Component from '../../../../src/Card/TruncatedDescription';
import CardExpandButton from '../../../../src/Card/CardExpandButton';

export default {
  title: 'Antler Theme/Components/Card/Contents/Truncated Description',
  argTypes: {
    children: {
      defaultValue:
        'Appboxo is a super app infrastructure platform that allows companies to launch and integrate mini-apps within their software. They recently completed a US$1.1m seed funding round led by Founders Fund, with participation from 500 Startups, Plug and Play Tech Center and Antler. They plan to use the fresh funds to scale the platform and add new mini-apps in travel, e-commerce, finance, and lifestyle industries.',
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

export const TruncatedDescription = args => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ width: args.width }}>
      <Component {...args} expanded={expanded} />
      <CardExpandButton expanded={expanded} setExpanded={setExpanded} />
    </div>
  );
};
