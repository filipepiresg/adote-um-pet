import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './stacks/app';
import AuthStack from './stacks/auth';
import MainStack from './stacks/main';

const Drawer = createDrawerNavigator();

export default () => {
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Main'
        gestureHandlerProps={{
          enabled: false,
        }}
      >
        <Drawer.Screen name='Main' component={isAuthenticated ? AppStack : MainStack} />
        <Drawer.Screen name='Auth' component={AuthStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
