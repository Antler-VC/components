import React from 'react';

import StartupUpdateModal from '../../../src/StartupPage/StartupUpdateModal';

export default {
  title: 'Antler Theme/Components/Startup Page/Update Modal',
  argTypes: {
    teamName: {
      defaultValue: 'Antler',
      control: { type: 'text' },
    },
    updateHeader: {
      defaultValue: 'Lorem Ipsum!',
      control: { type: 'text' },
    },
    updateIntroduction: {
      defaultValue: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      control: { type: 'text' },
    },
    showLogo: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
};

export const UpdateModal = args => (
  <StartupUpdateModal
    onClose={() => alert('CLOSE')}
    data={{
      ...args,
      createdAt: new Date().getTime() / 1000,
      logo: [
        {
          downloadURL:
            'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/ANTLER.png?alt=media&token=febf7644-4c6e-4685-b49f-bdc73915b8a9',
        },
      ],
      featuredImage: [
        {
          downloadURL:
            'https://images.prismic.io/antlerco/9e4a4a6d-a33d-44a9-8347-6538eca5f3be_Banner+1.jpg?auto=compress,format',
        },
      ],
      attachment: [
        {
          downloadURL:
            'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/ANTLER.png?alt=media&token=febf7644-4c6e-4685-b49f-bdc73915b8a9',
        },
      ],
    }}
  />
);
