import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen component={() => null} name='SignIn' />
    <Stack.Screen component={() => null} name='SignUp' />
  </Stack.Navigator>
);
