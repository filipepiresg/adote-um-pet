import React, { useContext, useEffect, useState } from 'react';
import { LogBox, Platform, StatusBar } from 'react-native';
import Config from 'react-native-config';
import Geocoder from 'react-native-geocoding';
import Spinner from 'react-native-loading-spinner-overlay';

import { transparentize } from 'polished';

import AppContext from '~/src/contexts/app';

import Routes from './routes';
import { Colors } from './utils';

Geocoder.init(Config.GOOGLE_MAPS_API_KEY, { language: 'pt-BR' });

LogBox.ignoreAllLogs(true);

export default () => {
  const { loading: loadingContext } = useContext(AppContext);
  const [loading, setLoading] = useState(loadingContext);

  useEffect(() => {
    setLoading(loadingContext);
  }, [loadingContext]);

  return (
    <>
      <StatusBar
        backgroundColor={Colors.PRIMARY}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
      />
      <Spinner
        cancelable={false}
        color={Colors.BLACK}
        animation='fade'
        overlayColor={transparentize(0.6, Colors.PRIMARY)}
        visible={loading}
        textContent='Carregando...'
        textStyle={{ color: Colors.BLACK }}
      />
      <Routes />
    </>
  );
};
