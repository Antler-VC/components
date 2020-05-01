/// <reference types="firebase" />
import React from 'react';

import { Button } from '@material-ui/core';

import EmptyState from './EmptyState';
import SecurityIcon from '@material-ui/icons/Security';

export interface IAccessDeniedProps {
  auth: firebase.auth.Auth;
}

export default function AccessDenied({ auth }: IAccessDeniedProps) {
  return (
    <EmptyState
      fullScreen
      message="Access Denied"
      description={
        <>
          Signed in as:
          <br />
          {auth.currentUser?.email}
          <br />
          <Button
            onClick={() => auth.signOut()}
            variant="outlined"
            color="primary"
            style={{ marginTop: 24 }}
          >
            Switch Account
          </Button>
        </>
      }
      Icon={SecurityIcon}
    />
  );
}
