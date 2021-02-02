import React from 'react';

import { Chip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

export default {
  title: 'Tag',
  component: Chip,
  argTypes: {
    label: {
      defaultValue: 'E-Commerce',
      control: { type: 'text' },
    },
    size: {
      defaultValue: 'small',
      control: {
        type: 'inline-radio',
        options: ['small', 'medium'],
      },
    },
    selected: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    delete: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    clickable: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    color: {
      defaultValue: 'default',
      control: {
        type: 'inline-radio',
        options: ['default', 'primary', 'secondary'],
      },
    },
  },
};

export const Primary = args => (
  <Chip
    {...args}
    icon={args.selected && <CheckIcon />}
    onDelete={args.delete ? () => alert('Deleted') : undefined}
  />
);
export const Secondary = args => (
  <Chip
    {...args}
    icon={args.selected && <CheckIcon />}
    onDelete={args.delete ? () => alert('Deleted') : undefined}
    variant="outlined"
  />
);
