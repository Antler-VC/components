import React, { useState } from 'react';

import MultiSelect from '@antlerengineering/multiselect';

export default {
  title: 'Antler Theme/WIP Components/Multi Select',
  component: MultiSelect,
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
      control: { type: 'array' },
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
    freeText: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    clearable: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    backdrop: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
};

// const argsToProps = args => ({
//   ...args,
//   helperText: args.helperText || args.error ? 'Error text here' : '',
//   style: { width: args.width },
// });

// export const SingleSelect = args => (
//   <TextField {...argsToProps(args)} select>
//     {args.options?.map(option => (
//       <MenuItem key={option} value={option}>
//         {option}
//       </MenuItem>
//     ))}
//   </TextField>
// );

export const Multiple = args => {
  const [value, setValue] = useState(args.defaultValue || []);

  return (
    <div style={{ width: args.width }}>
      <MultiSelect
        {...args}
        value={value}
        onChange={setValue}
        TextFieldProps={{
          error: args.error,
          helperText: args.helperText || args.error ? 'Error text here' : '',
        }}
      />
    </div>
  );
};
Multiple.argTypes = {
  max: {
    // defaultValue: '',
    control: { type: 'number' },
  },
  selectAll: {
    defaultValue: true,
    control: { type: 'boolean' },
  },
};

export const Single = args => {
  const [value, setValue] = useState(args.defaultValue || null);

  return (
    <div style={{ width: args.width }}>
      <MultiSelect
        {...args}
        multiple={false}
        value={value}
        onChange={setValue}
        TextFieldProps={{
          error: args.error,
          helperText: args.helperText || args.error ? 'Error text here' : '',
        }}
      />
    </div>
  );
};
Single.argTypes = {
  defaultValue: {
    name: 'Persistent value',
    defaultValue: '',
    control: { type: 'text' },
  },
};
