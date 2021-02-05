import React from 'react';

import { TextField, MenuItem } from '@material-ui/core';

export default {
  title: 'Antler Theme/Components/Single Select',
  component: TextField,
  argTypes: {
    label: {
      defaultValue: 'Region',
      control: { type: 'text' },
    },
    options: {
      defaultValue: [
        'Amsterdam',
        'Berlin',
        'Copenhagen',
        'London',
        'Oslo',
        'Stockholm',
        'Singapore',
        'Singapore Executive',
        'Singapore Spark',
        'Sydney',
        'India',
        'USA',
        'Nairobi',
      ],
      control: { type: 'array' },
    },
    defaultValue: {
      name: 'Persistent value',
      defaultValue: '',
      control: { type: 'text' },
    },
    width: {
      defaultValue: 320,
      control: {
        type: 'range',
        min: 0,
        max: 1000,
      },
    },
    disabled: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    error: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    helperText: {
      name: 'Helper/error text',
      defaultValue: '',
      control: { type: 'text' },
    },
  },
};

const argsToProps = args => ({
  ...args,
  helperText: args.helperText || args.error ? 'Error text here' : '',
  style: { width: args.width },
});

export const SingleSelect = args => (
  <TextField {...argsToProps(args)} select>
    {args.options?.map(option => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
);
