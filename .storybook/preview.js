import React from 'react';

import {
  StylesProvider,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';

import { defaultTheme } from '../src/Theme';

export const decorators = [
  Story => (
    <StylesProvider injectFirst>
      <CssBaseline />
      <MuiThemeProvider theme={defaultTheme}>
        <Story />
      </MuiThemeProvider>
    </StylesProvider>
  ),
];

export const parameters = {
  backgrounds: {
    values: [
      { name: 'White', value: defaultTheme.palette.background.paper },
      {
        name: `Gray (${defaultTheme.palette.background.default})`,
        value: defaultTheme.palette.background.default,
      },
    ],
    grid: {
      cellSize: 16,
      opacity: 0.2,
      cellAmount: 4,
    },
  },
};
