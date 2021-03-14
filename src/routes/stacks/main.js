import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Header } from '~/src/components';
import { Map } from '~/src/pages';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName='Map'>
    <Stack.Screen
      component={Map}
      name='Map'
      options={{
        header: (props) => <Header {...props} title='Mapa' />,
      }}
    />
  </Stack.Navigator>
);
