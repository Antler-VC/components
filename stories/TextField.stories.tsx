import React, { useState } from 'react';

import {
  TextField as MuiTextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default {
  title: 'Text Field',
  component: MuiTextField,
  argTypes: {
    label: {
      defaultValue: 'First Name',
      control: { type: 'text' },
    },
    placeholder: {
      defaultValue: 'Type your first name here',
      control: { type: 'text' },
    },
    defaultValue: {
      name: 'Persistent value',
      defaultValue: '',
      control: { type: 'text' },
    },
    width: {
      defaultValue: 300,
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

export const SingleLine = args => <MuiTextField {...argsToProps(args)} />;

export const MultiLine = args => (
  <MuiTextField {...argsToProps(args)} multiline inputProps={{ rowsMin: 5 }} />
);
MultiLine.args = {
  label: 'Bio',
  placeholder:
    'Your bio will be shared to the Antler team and other founders in your cohort',
};

export const Password = args => {
  const [show, setShow] = useState(false);

  return (
    <MuiTextField
      {...argsToProps(args)}
      type={show ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={args.disabled}
              onClick={() => setShow(x => !x)}
            >
              {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
Password.args = {
  label: 'Password',
  placeholder: '',
};
