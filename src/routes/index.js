import React, { useRef } from 'react';

import analytics from '@react-native-firebase/analytics';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { Drawer as CustomDrawer } from '~/src/components';
import { Splash, Pets } from '~/src/pages';

import AppStack from './stacks/app';
import AuthStack from './stacks/auth';
import MainStack from './stacks/main';

const Drawer = createDrawerNavigator();

export default () => {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }

        routeNameRef.current = currentRouteName;
      }}
    >
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
        <Drawer.Screen name='Pets' component={Pets} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
