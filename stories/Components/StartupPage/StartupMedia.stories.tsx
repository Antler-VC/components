import React from 'react';

import CardGrid from '../../../src/layouts/CardGrid';
import StartupMedia from '../../../src/StartupPage/StartupMedia';

export default {
  title: 'Antler Theme/Components/Startup Page/Media',
};

export const Media = () => (
  <CardGrid>
    <StartupMedia
      pitchVideo="https://www.youtube.com/watch?v=UYdhnR4SeNc"
      headerImage={[
        {
          downloadURL:
            'https://images.prismic.io/antlerco/9e4a4a6d-a33d-44a9-8347-6538eca5f3be_Banner+1.jpg?auto=compress,format',
        },
      ]}
      additionalImages={[
        {
          downloadURL:
            'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/ANTLER.png?alt=media&token=febf7644-4c6e-4685-b49f-bdc73915b8a9',
        },
        {
          downloadURL: 'http://placehold.it/1000x1000',
        },
      ]}
    />
  </CardGrid>
);
