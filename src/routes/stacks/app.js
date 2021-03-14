import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Map } from '~/src/pages';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator initialRouteName='Map'>
      <Tab.Screen name='Map' component={Map} />
    </Tab.Navigator>
  );
}
