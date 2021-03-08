import React from 'react';

import VideoModal from '../../../src/Modal/VideoModal';

export default {
  title: 'Antler Theme/Components/Modal/Video',
  argTypes: {
    overline: {
      defaultValue: 'Rewatch the Event',
      control: { type: 'text' },
    },
    title: {
      defaultValue: 'Antler Sydney Demo Day',
      control: { type: 'text' },
    },
    url: {
      defaultValue: 'https://www.youtube.com/watch?v=wetzo5cicI8',
      control: { type: 'text' },
    },
  },
};

export const Video = args => (
  <VideoModal {...args} onClose={() => alert('CLOSE')} />
);
