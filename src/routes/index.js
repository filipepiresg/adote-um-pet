import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { Drawer as CustomDrawer } from '~/src/components';
import { Splash } from '~/src/pages';

import AppStack from './stacks/app';
import AuthStack from './stacks/auth';
import MainStack from './stacks/main';

const Drawer = createDrawerNavigator();

export default () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName='Splash'
      gestureHandlerProps={{
        enabled: false,
      }}
      backBehavior='none'
      drawerType='slide'
      drawerPosition='left'
      keyboardDismissMode='none'
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name='Splash' component={Splash} />
      <Drawer.Screen name='App' component={AppStack} />
      <Drawer.Screen name='Main' component={MainStack} />
      <Drawer.Screen name='Auth' component={AuthStack} />
    </Drawer.Navigator>
  </NavigationContainer>
);
