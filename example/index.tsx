import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MuiThemeProvider, CssBaseline, Container } from '@material-ui/core';
import { defaultTheme, StartupCard } from '../.';

const App = () => {
  console.log(defaultTheme);

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="xs" style={{ marginTop: 100, height: 300 }}>
        <StartupCard
          teamName="motiveOS"
          year="2020"
          sector={['SaaS']}
          oneLineDescription="motiveOS automates compensation for businesses and their revenue teams"
          logo={[
            {
              downloadURL:
                'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/myTeam%2FzE2L9nI9Y4k3RaV6uYif%2Flogo%2FArtboard.png?alt=media&token=df4b0aad-f4b0-4b5d-acec-b0e4d0414d51',
            },
          ]}
          teamMembers={[
            {
              docPath: 'founders/1WzNUmNdXeTjaZ1dQad0j2Ay1nv1',
              snapshot: {
                preferredName: 'Linton',
                profilePhoto: [
                  {
                    downloadURL:
                      'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/founders%2F1WzNUmNdXeTjaZ1dQad0j2Ay1nv1%2FprofilePhoto%2FMOTIVE_OS_13-13_smaller%202.jpg?alt=media&token=efdc3c80-de30-4a02-b654-3334d6d61981',
                    name: 'MOTIVE_OS_13-13_smaller 2.jpg',
                    lastModifiedTS: 1592464439711,
                    type: 'image/jpeg',
                  },
                ],
                firstName: 'Linton',
                lastName: 'Ball',
                cohort: 'SYD2',
              },
            },
            {
              snapshot: {
                profilePhoto: [
                  {
                    name: 'MOTIVE_OS_31-27.jpg',
                    type: 'image/jpeg',
                    downloadURL:
                      'https://firebasestorage.googleapis.com/v0/b/antler-vc.appspot.com/o/founders%2FhydyRgqRP5YGZKgsF5cq3efrN363%2FprofilePhoto%2FMOTIVE_OS_31-27.jpg?alt=media&token=a67428c4-bd20-4ed0-a344-73820e4915b1',
                    lastModifiedTS: 1592450752573,
                  },
                ],
                preferredName: 'Alex',
                lastName: 'Green',
                cohort: 'SYD2',
                title: 'CEO',
                firstName: 'Alexander',
              },
              docPath: 'founders/hydyRgqRP5YGZKgsF5cq3efrN363',
            },
          ]}
        />
      </Container>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
