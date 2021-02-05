import React from 'react';

import Component from '../../../../src/Card/CardTagList';

export default {
  title: 'Antler Theme/Components/Card/Contents/Card Tag List',
  component: Component,
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

export const CardTagList = args => <Component {...args} />;
