import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';

import { SignIn, SignUp } from '~/src/pages';
import { Colors } from '~/src/utils';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      component={SignIn}
      name='SignIn'
      options={{
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
          shadowColor: 'transparent',
        },
        headerTitle: () => null,
      }}
    />
    <Stack.Screen
      component={SignUp}
      name='SignUp'
      options={{
        headerBackImage: () => <Ionicons color={Colors.BUTTON} size={40} name='chevron-back' />,
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
          shadowColor: 'transparent',
        },
        headerBackTitleVisible: false,
        headerTitle: () => null,
      }}
    />
  </Stack.Navigator>
);
