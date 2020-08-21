import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MuiThemeProvider, CssBaseline, Container } from '@material-ui/core';
import { JobCard, defaultTheme } from '../.';
import data from './example.json';

const App = () => {
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <JobCard {...data} CardProps={{ style: { height: 400 } }} />
      </Container>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
