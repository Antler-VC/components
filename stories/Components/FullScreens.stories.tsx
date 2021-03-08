import React from 'react';

import LoadingComponent from '../../src/FullScreens/Loading';
import EmptyStateComponent from '../../src/FullScreens/EmptyState';
import ErrorBoundaryComponent from '../../src/FullScreens/ErrorBoundary';
import AccessDeniedComponent from '../../src/FullScreens/AccessDenied';

export default {
  title: 'Antler Theme/Components/Full Screens',
  argTypes: {
    fullScreen: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
};

export const Loading = args => <LoadingComponent {...args} />;
Loading.argTypes = {
  message: {
    defaultValue: '',
    control: { type: 'text' },
  },
};

export const EmptyState = args => <EmptyStateComponent {...args} />;
EmptyState.argTypes = {
  message: {
    defaultValue: '',
    control: { type: 'text' },
  },
  description: {
    defaultValue: '',
    control: { type: 'text' },
  },
  basic: {
    defaultValue: false,
    control: { type: 'boolean' },
  },
};

const ErrorComponent = () => {
  throw new Error('Testing error');
};
export const ErrorBoundary = args => (
  <ErrorBoundaryComponent {...args}>
    <ErrorComponent />
  </ErrorBoundaryComponent>
);
ErrorBoundary.argTypes = {
  basic: {
    defaultValue: false,
    control: { type: 'boolean' },
  },
};

export const AccessDenied = args => (
  <AccessDeniedComponent
    {...args}
    auth={{ currentUser: { email: 'testing@antler.co' } }}
  />
);
AccessDenied.argTypes = {
  basic: {
    defaultValue: false,
    control: { type: 'boolean' },
  },
};
