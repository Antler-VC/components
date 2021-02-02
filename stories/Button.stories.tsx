import React from 'react';

import { Grid, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    previewAllSizes: {
      name: 'Preview all sizes',
      defaultValue: false,
      control: { type: 'boolean' },
    },
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

    onClick: { action: 'clicked' },
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

const ButtonPreview = (variant: string) => args => {
  if (args.previewAllSizes)
    return (
      <Grid container spacing={2} direction="column" wrap="nowrap">
        <Grid item>
          <Button
            {...args}
            variant={variant}
            startIcon={getIcon(args.startIcon)}
            endIcon={getIcon(args.endIcon)}
            size="small"
          >
            {args.label}
          </Button>
        </Grid>
        <Grid item>
          <Button
            {...args}
            variant={variant}
            startIcon={getIcon(args.startIcon)}
            endIcon={getIcon(args.endIcon)}
            size="medium"
          >
            {args.label}
          </Button>
        </Grid>
        <Grid item>
          <Button
            {...args}
            variant={variant}
            startIcon={getIcon(args.startIcon)}
            endIcon={getIcon(args.endIcon)}
            size="large"
          >
            {args.label}
          </Button>
        </Grid>
      </Grid>
    );

  return (
    <Button
      {...args}
      variant={variant}
      startIcon={getIcon(args.startIcon)}
      endIcon={getIcon(args.endIcon)}
    >
      {args.label}
    </Button>
  );
};

export const Primary = ButtonPreview('contained');
export const Secondary = ButtonPreview('outlined');
export const Text = ButtonPreview('text');
