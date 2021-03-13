import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Map } from '../../pages';
import Auth from './auth';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName='Map'>
    <Stack.Screen component={Auth} name='Auth' />
    <Stack.Screen component={Map} name='Map' />
  </Stack.Navigator>
);
