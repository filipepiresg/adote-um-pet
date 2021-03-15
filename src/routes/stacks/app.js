import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Tab as CustomTab } from '~/src/components';
import { Map } from '~/src/pages';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator initialRouteName='Map' tabBar={(props) => <CustomTab {...props} />}>
      <Tab.Screen name='AddPet' component={() => null} />
      <Tab.Screen name='Map' component={Map} />
      <Tab.Screen name='Profile' component={() => null} />
    </Tab.Navigator>
  );
}
