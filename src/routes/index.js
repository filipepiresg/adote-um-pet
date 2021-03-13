// import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AppStack from './stacks/app';
import MainStack from './stacks/main';

export default () => {
  const isAuthenticated = false;
  return (
    <NavigationContainer>{isAuthenticated ? <AppStack /> : <MainStack />}</NavigationContainer>
  );
};
