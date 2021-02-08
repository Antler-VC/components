import React from 'react';

import SectionHeaderComponent from '../../src/ContentHeader/SectionHeader';
import ResultsHeaderComponent from '../../src/ContentHeader/ResultsHeader';
import SubSectionHeaderComponent from '../../src/ContentHeader/SubSectionHeader';

export default {
  title: 'Antler Theme/Components/Content Header',
  argTypes: {
    text: {
      defaultValue: 'Startup Updates',
      control: { type: 'text' },
    },
  },
};

export const SectionHeader = args => (
  <>
    <SectionHeaderComponent {...args} />
    <div style={{ width: 48, height: 48, backgroundColor: 'currentColor' }} />
    <SectionHeaderComponent {...args} />
  </>
);

export const ResultsHeader = args => (
  <>
    <ResultsHeaderComponent {...args} />
    <div style={{ width: 48, height: 48, backgroundColor: 'currentColor' }} />
    <ResultsHeaderComponent {...args} />
  </>
);

export const SubSectionHeader = args => (
  <>
    <SubSectionHeaderComponent {...args} />
    <div style={{ width: 48, height: 48, backgroundColor: 'currentColor' }} />
    <SubSectionHeaderComponent {...args} />
  </>
);
