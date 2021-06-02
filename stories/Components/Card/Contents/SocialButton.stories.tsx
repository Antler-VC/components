import React from 'react';

import Button from '../../../../src/Card/SocialButton';

export default {
  title: 'Antler Theme/Components/Card/Contents/Social Button',
  argTypes: {
    disabled: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
};

export const SocialButton = args => (
  <>
    <Button {...args} url="#" icon="twitter" />
    <Button {...args} url="#" icon="linkedin" />
    <Button {...args} url="#" icon="crunchbase" />
    <Button {...args} url="#" icon="angellist" />
    <Button {...args} url="#" icon="whatsapp" />
    <Button {...args} url="#" icon="slack" />
    <Button {...args} url="#" icon="video" />
  </>
);
