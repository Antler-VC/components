import React from 'react';

import Friction from '../../src/Friction';
import { Button } from '@material-ui/core';

export default {
  title: 'Antler Theme/Components/Friction',
  argTypes: {
    title: {
      defaultValue: '',
      control: { type: 'text' },
    },
    body: {
      defaultValue: '',
      control: { type: 'text' },
    },
    cancel: {
      defaultValue: '',
      control: { type: 'text' },
    },
    confirm: {
      defaultValue: '',
      control: { type: 'text' },
    },
  },
};

export const Basic = args => (
  <Friction message={args}>
    <Button variant="contained" onClick={() => alert('Something done')}>
      Do Something
    </Button>
  </Friction>
);

export const WithTextInput = ({ dryCommand, ...args }) => (
  <Friction message={args} dryCommand={dryCommand}>
    <Button variant="contained" onClick={() => alert('Something done')}>
      Do Something
    </Button>
  </Friction>
);
WithTextInput.argTypes = {
  body: {
    defaultValue: 'Lorem ipsum dolor sit amet.',
    control: { type: 'text' },
  },
  dryCommand: {
    defaultValue: 'Something',
    control: { type: 'text' },
  },
};

export const WithOptions = ({
  optionTitle,
  optionDescription,
  dryCommand,
  ...args
}) => (
  <Friction
    message={{
      ...args,
      options: Array.from({ length: 3 }, (_, i) => ({
        title: optionTitle + ` ${i}`,
        description: optionDescription,
        value: i.toString(),
      })),
    }}
    dryCommand={dryCommand}
  >
    <Button variant="contained" onClick={() => alert('Something done')}>
      Do Something
    </Button>
  </Friction>
);
WithOptions.argTypes = {
  body: {
    defaultValue: 'Lorem ipsum dolor sit amet.',
    control: { type: 'text' },
  },
  optionTitle: {
    defaultValue: 'Option',
    control: { type: 'text' },
  },
  optionDescription: {
    defaultValue: 'Lorem ipsum dolor sit amet.',
    control: { type: 'text' },
  },
  dryCommand: {
    defaultValue: '',
    control: { type: 'text' },
  },
};
