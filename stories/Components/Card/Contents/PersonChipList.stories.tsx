import React from 'react';

import PersonChipListComponent from '../../../../src/Card/PersonChipList';

export default {
  title: 'Antler Theme/Components/Card/Contents/Person Chip List',
  argTypes: {
    name: {
      defaultValue: 'Team',
      control: { type: 'text' },
    },
  },
};

export const PersonChipList = args => (
  <PersonChipListComponent
    {...args}
    chips={[
      {
        label: 'Laura Montez',
        avatar:
          'https://images.generated.photos/6S4fFv1xZRcsGb-lex6T4-qOH0lbs3BYPoDlYpAgrTE/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Ry/YW5zcGFyZW50X3Yz/L3YzXzAwODg2NjYu/cG5n.png',
      },
      {
        label: 'Jason Chen',
        avatar:
          'https://images.generated.photos/ZJyswL6FR5ftLAi2aIDB3NnzjhKXLgt0KAKGB4hUwog/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA2NTQwMzguanBn.jpg',
      },
      {
        label: 'Libby Smith',
      },
    ]}
  />
);
