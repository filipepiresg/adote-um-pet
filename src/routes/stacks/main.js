import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Map } from '../../pages';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName='Map'>
    <Stack.Screen component={Map} name='Map' />
  </Stack.Navigator>
);
