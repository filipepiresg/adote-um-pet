// import 'react-native-gesture-handler';
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AppTab from './stacks/app';

export default function App() {
  return (
    <NavigationContainer>
      <AppTab />
    </NavigationContainer>
  );
}
