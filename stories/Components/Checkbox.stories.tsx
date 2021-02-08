import React from 'react';

import { Checkbox as MuiCheckbox } from '@material-ui/core';

export default {
  title: 'Antler Theme/Components/Checkbox',
  component: MuiCheckbox,
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

export const Checkbox = args => <MuiCheckbox {...args} />;
