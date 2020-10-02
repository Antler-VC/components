import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MuiThemeProvider } from '@material-ui/core';
import { defaultTheme, JobDialog } from '../.';

const App = () => {
  console.log(defaultTheme);

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <JobDialog
        data={{
          id: 'string',
          teamName: 'TEAM name',
          jobFunction: 'Technology',
          location: 'Surry Hills',
          jobTitle: 'Master',
          description:
            'Yes. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table. It looks like you already have data in this table. You can import and view the data by setting up columns for this table.',
          descriptionResponsibilities: 'YES',
          applicationDeadline: 0,
        }}
        FormProps={{}}
        hasData
        clearData={() => {}}
        isSingle
      />
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
