import React, { useContext } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { Drawer as CustomDrawer } from '~/src/components';

import UserContext from '../contexts/user';
import AppStack from './stacks/app';
import AuthStack from './stacks/auth';
import MainStack from './stacks/main';

const Drawer = createDrawerNavigator();

export default () => {
  const {
    state: { isAuthenticated },
  } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={isAuthenticated ? 'App' : 'Main'}
        gestureHandlerProps={{
          enabled: false,
        }}
        backBehavior='none'
        drawerType='slide'
        drawerPosition='left'
        keyboardDismissMode='none'
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name='App' component={AppStack} />
        <Drawer.Screen name='Main' component={MainStack} />
        <Drawer.Screen name='Auth' component={AuthStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
