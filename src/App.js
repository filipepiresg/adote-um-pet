import React, { useContext } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

import { transparentize } from 'polished';

import AppContext from '~/src/contexts/app';

import Routes from './routes';
import { Colors } from './utils';

export default function App() {
  const { loading } = useContext(AppContext);

  return (
    <Spinner
      cancelable={false}
      color={Colors.BLACK}
      animation='fade'
      overlayColor={transparentize(0.6, Colors.PRIMARY)}
      visible={loading}
      textContent='Carregando...'
      textStyle={{ color: Colors.BLACK }}
    >
      <Routes />
    </Spinner>
  );
}
