import React from 'react';

import {
  StylesProvider,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';

import { defaultTheme } from '../src/Theme/Theme';

export const decorators = [
  Story => (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Story />
      </MuiThemeProvider>
    </StylesProvider>
  ),
];

export const parameters = {
  backgrounds: {
    values: [
      {
        name: 'White',
        value: defaultTheme.palette.background.paper,
      },
      {
        name: `Light Gray (${defaultTheme.palette.background.default})`,
        value: defaultTheme.palette.background.default,
      },
      {
        name: 'Dark Gray (#212121)',
        value: '#212121',
      },
    ],
    grid: {
      cellSize: 16,
      opacity: 0.2,
      cellAmount: 4,
    },
  },

  viewport: {
    viewports: {
      xsMin: {
        name: '320px — XS min',
        styles: { width: '320px', height: '100%' },
        type: 'mobile',
      },
      xsMax: {
        name: '504px — XS max',
        styles: { width: '504px', height: '100%' },
        type: 'mobile',
      },
      xsPreTransition: {
        name: '639px — XS pre-transition',
        styles: { width: '639px', height: '100%' },
        type: 'mobile',
      },

      smMin: {
        name: '640px — SM min',
        styles: { width: '640px', height: '100%' },
        type: 'tablet',
      },
      smMax: {
        name: '1008px — SM max',
        styles: { width: '1008px', height: '100%' },
        type: 'tablet',
      },
      smPreTransition: {
        name: '1151px — SM pre-transition',
        styles: { width: '1151px', height: '100%' },
        type: 'tablet',
      },

      mdMin: {
        name: '1152px — MD min',
        styles: { width: '1152px', height: '100%' },
        type: 'desktop',
      },
      mdPreTransition: {
        name: '1339px — MD pre-transition',
        styles: { width: '1339px', height: '100%' },
        type: 'desktop',
      },

      lgMin: {
        name: '1344px — LG min',
        styles: { width: '1344px', height: '100%' },
        type: 'desktop',
      },
      lgMax: {
        name: '1488px — LG max',
        styles: { width: '1488px', height: '100%' },
        type: 'desktop',
      },
      lgPreTransition: {
        name: '1679px — LG pre-transition',
        styles: { width: '1679px', height: '100%' },
        type: 'desktop',
      },

      xlMin: {
        name: '1680px — XL min',
        styles: { width: '1680px', height: '100%' },
        type: 'desktop',
      },
      xlMax: {
        name: '1824px — XL max',
        styles: { width: '1824px', height: '100%' },
        type: 'desktop',
      },
      xlPlus: {
        name: '1920px — XL+',
        styles: { width: '1920px', height: '100%' },
        type: 'desktop',
      },
    },
  },
};
