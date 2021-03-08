import React from 'react';

import { Switch as MuiSwitch } from '@material-ui/core';

export default {
  title: 'Antler Theme/Components/Switch',
  component: MuiSwitch,
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
  },
};

export const Switch = args => <MuiSwitch {...args} />;
