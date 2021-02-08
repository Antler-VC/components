import React from 'react';

import Component from '../../src/Modal';

export default {
  title: 'Antler Theme/Components/Modal',
  argTypes: {
    title: {
      defaultValue: 'Update Review',
      control: { type: 'text' },
    },
    body: {
      defaultValue:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      control: { type: 'text' },
    },
    primaryButtonLabel: {
      defaultValue: 'Submit',
      control: { type: 'text' },
    },
    secondaryButtonLabel: {
      defaultValue: 'Cancel',
      control: { type: 'text' },
    },
    header: {
      defaultValue: '',
      control: { type: 'text' },
    },
    footer: {
      defaultValue: '',
      control: { type: 'text' },
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

export const Modal = args => (
  <Component
    {...args}
    actions={{
      primary: { children: args.primaryButtonLabel },
      secondary: { children: args.secondaryButtonLabel },
    }}
  />
);
