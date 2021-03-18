import React, { useContext, useEffect } from 'react';
import Config from 'react-native-config';
import Spinner from 'react-native-loading-spinner-overlay';
import OneSignal from 'react-native-onesignal';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

import { transparentize } from 'polished';

import AppContext from '~/src/contexts/app';

import Routes from './routes';
import { Colors } from './utils';

export default function App() {
  const { loading } = useContext(AppContext);

  useEffect(() => {
    async function initializeOnesignal() {
      /* O N E S I G N A L   S E T U P */
      OneSignal.setAppId(Config.ONESIGNAL_APPID);
      OneSignal.setLogLevel(6, 0);
      OneSignal.setRequiresUserPrivacyConsent(false);

      /* O N E S I G N A L  H A N D L E R S */
      OneSignal.setNotificationOpenedHandler(({ notification }) => {
        Toast.show(notification.body, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      });
    }

    initializeOnesignal();
  }, []);

  return (
    <>
      <Spinner
        cancelable={false}
        color={Colors.BLACK}
        animation='fade'
        overlayColor={transparentize(0.6, Colors.PRIMARY)}
        visible={loading}
        textContent='Carregando...'
        textStyle={{ color: Colors.BLACK }}
      />
      <RootSiblingParent>
        <Routes />
      </RootSiblingParent>
    </>
  );
}
