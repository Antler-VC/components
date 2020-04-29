import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { EmptyState, GoIcon, Loading, RenderedHtml } from '../.';

const App = () => {
  return (
    <>
      <EmptyState />
      <GoIcon />
      <Loading />
      <RenderedHtml html="<h1>HTML here</h1><p>yes</p>" />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
