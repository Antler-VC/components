import React from 'react';

import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    label: {
      defaultValue: 'Button',
      control: { type: 'text' },
    },
    disabled: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    size: {
      defaultValue: 'medium',
      control: {
        type: 'inline-radio',
        options: ['small', 'medium', 'large'],
      },
    },
    color: {
      defaultValue: 'primary',
      control: {
        type: 'inline-radio',
        options: ['primary', 'secondary', 'default'],
      },
    },
    startIcon: {
      defaultValue: 'none',
      control: {
        type: 'inline-radio',
        options: ['none', 'add', 'delete'],
      },
    },
    endIcon: {
      defaultValue: 'none',
      control: {
        type: 'inline-radio',
        options: ['none', 'add', 'delete'],
      },
    },
  },
};

const getIcon = (icon: string) => {
  switch (icon) {
    case 'add':
      return <AddIcon />;

    case 'delete':
      return <DeleteIcon />;

    case 'none':
    default:
      return null;
  }
};

export const Primary = args => (
  <Button
    {...args}
    variant="contained"
    startIcon={getIcon(args.startIcon)}
    endIcon={getIcon(args.endIcon)}
  >
    {args.label}
  </Button>
);

export const Secondary = args => (
  <Button
    {...args}
    variant="outlined"
    startIcon={getIcon(args.startIcon)}
    endIcon={getIcon(args.endIcon)}
  >
    {args.label}
  </Button>
);

export const Text = args => (
  <Button
    {...args}
    variant="text"
    startIcon={getIcon(args.startIcon)}
    endIcon={getIcon(args.endIcon)}
  >
    {args.label}
  </Button>
);
