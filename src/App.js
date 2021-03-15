import './config/ReactotronConfig';

import React from 'react';
import Config from 'react-native-config';
import Geocoder from 'react-native-geocoding';

import { UserProvider } from '~/src/contexts/user';

import Routes from './routes';

Geocoder.init(Config.GOOGLE_MAPS_API_KEY, { language: 'pt-BR' });

export default function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}
