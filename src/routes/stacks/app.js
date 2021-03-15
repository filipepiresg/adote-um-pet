import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Tab as CustomTab } from '~/src/components';
import { Map, Profile, Add } from '~/src/pages';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName='Map'
      tabBar={(props) => <CustomTab {...props} />}
      backBehavior='none'
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      screenOptions={{
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen name='AddPet' component={Add} />
      <Tab.Screen name='Map' component={Map} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
}
