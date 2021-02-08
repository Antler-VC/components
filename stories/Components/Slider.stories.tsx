import React from 'react';

import { Slider as MuiSlider } from '@material-ui/core';

export default {
  title: 'Antler Theme/Components/Slider',
  component: MuiSlider,
  argTypes: {
    defaultValue: {
      name: 'Persistent value',
      defaultValue: 5,
      control: { type: 'number' },
    },
    min: {
      defaultValue: 0,
      control: { type: 'number' },
    },
    max: {
      defaultValue: 10,
      control: { type: 'number' },
    },
    disabled: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    marks: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
};

export const Slider = args => (
  <div style={{ padding: 32 }}>
    <MuiSlider {...args} />
  </div>
);
