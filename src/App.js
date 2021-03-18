import React from 'react';

import { AppProvider } from '~/src/contexts/app';
import { UserProvider } from '~/src/contexts/user';

import Application from './index';

export default function App() {
  return (
    <AppProvider>
      <UserProvider>
        <Application />
      </UserProvider>
    </AppProvider>
  );
}
