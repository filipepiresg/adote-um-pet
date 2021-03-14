import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      component={() => null}
      name='SignIn'
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      component={() => null}
      name='SignUp'
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
