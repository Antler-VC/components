import React from 'react';

import Modal from '../../../src/Modal/Modal';

export default {
  title: 'Antler Theme/Components/Modal/Basic',
  argTypes: {
    title: {
      defaultValue: 'Lorem Ipsum',
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

export const Basic = args => (
  <Modal
    {...args}
    onClose={() => alert('CLOSE')}
    actions={{
      primary: { children: args.primaryButtonLabel },
      secondary: { children: args.secondaryButtonLabel },
    }}
  />
);
