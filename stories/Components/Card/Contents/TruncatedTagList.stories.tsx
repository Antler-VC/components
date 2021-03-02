import React, { useState } from 'react';

import TruncatedCardTagList from '../../../../src/Card/TruncatedCardTagList';
import CardExpandButton from '../../../../src/Card/CardExpandButton';

export default {
  title: 'Antler Theme/Components/Card/Contents/Truncated Tag List',
  argTypes: {
    name: {
      defaultValue: 'Focus Areas',
      control: { type: 'text' },
    },
    tags: {
      defaultValue: [
        'Corporate Strategy',
        'IoT Solutions',
        'E-Commerce',
        'Apple',
        'Banana',
        'Citrus',
        'Durian',
        'Endoplasm',
      ],
      control: { type: 'array' },
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

export const TruncatedTagList = args => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ width: args.width }}>
      <TruncatedCardTagList {...args} expanded={expanded} />
      <CardExpandButton expanded={expanded} setExpanded={setExpanded} />
    </div>
  );
};
