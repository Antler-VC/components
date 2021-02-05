import React from 'react';

import Component from '../../../../src/Card/CardInfoList';

export default {
  title: 'Antler Theme/Components/Card/Contents/Card Info List',
  component: Component,
  argTypes: {
    item1Name: {
      defaultValue: 'Primary',
      control: { type: 'text' },
    },
    item1Value: {
      defaultValue: 'Consumer',
      control: { type: 'text' },
    },
    item2Name: {
      defaultValue: 'B. Model',
      control: { type: 'text' },
    },
    item2Value: {
      defaultValue: 'Marketplace',
      control: { type: 'text' },
    },
    item3Name: {
      defaultValue: '',
      control: { type: 'text' },
    },
    item3Value: {
      defaultValue: '',
      control: { type: 'text' },
    },
    item4Name: {
      defaultValue: '',
      control: { type: 'text' },
    },
    item4Value: {
      defaultValue: '',
      control: { type: 'text' },
    },
    item5Name: {
      defaultValue: '',
      control: { type: 'text' },
    },
    item5Value: {
      defaultValue: '',
      control: { type: 'text' },
    },
  },
};

export const CardInfoList = args => (
  <Component
    infoList={new Array(5).fill(undefined).map((_, i) => ({
      name: args[`item${i + 1}Name`],
      value: args[`item${i + 1}Value`],
    }))}
  />
);
