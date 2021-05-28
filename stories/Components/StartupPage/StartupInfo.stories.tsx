import React from 'react';

import StartupInfo from '../../../src/StartupPage/StartupInfo';

export default {
  title: 'Antler Theme/Components/Startup Page/Info',
};

export const Info = () => (
  <StartupInfo
    fields={[
      [
        { label: 'Label', key: 'key' },
        { label: 'Label 2', key: 'key' },
      ],
      [{ label: 'List', key: 'array', variant: 'chip' }],
    ]}
    data={{ key: 'Value', array: ['one', 'two', 'three'] }}
  />
);
