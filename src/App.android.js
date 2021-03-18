import React, { useEffect } from 'react';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

import { AppProvider } from '~/src/contexts/app';
import { UserProvider } from '~/src/contexts/user';

import Application from './index';

export default function App() {
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
    <RootSiblingParent>
      <AppProvider>
        <UserProvider>
          <Application />
        </UserProvider>
      </AppProvider>
    </RootSiblingParent>
  );
}
