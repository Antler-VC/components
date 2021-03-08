import React from 'react';

import CardTagList from '../../../../src/Card/CardTagList';

export default {
  title: 'Antler Theme/Components/Card/Contents/Tag List',
  component: CardTagList,
  argTypes: {
    name: {
      defaultValue: 'Focus Areas',
      control: { type: 'text' },
    },
    tags: {
      defaultValue: ['Corporate Strategy', 'IoT Solutions', 'E-Commerce'],
      control: { type: 'array' },
    },
  },
};

export const TagList = args => <CardTagList {...args} />;
