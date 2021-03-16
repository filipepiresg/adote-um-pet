import { useContext, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { useNavigation } from '@react-navigation/native';

import UserContext from '../contexts/user';

const Splash = () => {
  const navigation = useNavigation();

  const {
    state: { isAuthenticated },
  } = useContext(UserContext);

  const changeNavigation = () => {
    const screen = isAuthenticated ? 'App' : 'Main';

    navigation.reset({
      routes: [{ name: screen }],
    });
  };

  useEffect(() => {
    setTimeout(changeNavigation, 500);

    return () => {
      SplashScreen.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Splash;
