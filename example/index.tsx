import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Thumbnail } from '../.';

const App = () => {
  return (
    <Thumbnail imageUrl="https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/myTeam%2FRz2Egm1xTaC7Kd9JxdUq%2Flogo%2FPew3.png?alt=media&token=5acff28d-7a09-4082-8112-1a5afdb72a99" />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
