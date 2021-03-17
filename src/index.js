import React from 'react';
import { LogBox, Platform, StatusBar } from 'react-native';
import Config from 'react-native-config';
import Geocoder from 'react-native-geocoding';

import { UserProvider } from '~/src/contexts/user';

import Routes from './routes';
import { Colors } from './utils';

Geocoder.init(Config.GOOGLE_MAPS_API_KEY, { language: 'pt-BR' });

LogBox.ignoreAllLogs(true);

export default () => (
  <>
    <StatusBar
      backgroundColor={Colors.PRIMARY}
      barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
    />
    <UserProvider>
      <Routes />
    </UserProvider>
  </>
);
