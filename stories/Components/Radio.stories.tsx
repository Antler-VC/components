import React from 'react';

import { Radio as MuiRadio } from '@material-ui/core';

export default {
  title: 'Antler Theme/Components/Radio',
  component: MuiRadio,
  argTypes: {
    defaultChecked: {
      name: 'Value',
      defaultValue: true,
      control: { type: 'boolean' },
    },
    disabled: {
      name: 'Disabled',
      defaultValue: false,
      control: { type: 'boolean' },
    },
    color: {
      name: 'Color',
      defaultValue: 'default',
      control: {
        type: 'inline-radio',
        options: ['default', 'primary', 'secondary'],
      },
    },
  },
};

export const Radio = args => <MuiRadio {...args} />;
