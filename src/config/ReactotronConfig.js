/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';

import AsyncStorage from '@react-native-community/async-storage';

const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

if (__DEV__) {
  const tron = Reactotron.configure({ host, name: 'AdotePet' })
    .setAsyncStorageHandler(AsyncStorage)
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}
