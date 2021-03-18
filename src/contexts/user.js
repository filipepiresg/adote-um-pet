import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import AppContext from './app';

const INITIAL_STATE = {
  loading: false,
  isAuthenticated: false,
  profile: null,
  user: null,
};
const UserContext = createContext({
  state: INITIAL_STATE,
  handleLogin: async (
    { email: _email, password: _password },
    _successCallback,
    _failureCallback
  ) => {},
  handleLogout: async (_successCallback, _failureCallback) => {},
  handleRegister: async (_payload, _successCallback, _failureCallback) => {},
});

export const UserProvider = ({ children }) => {
  const { hideLoading } = useContext(AppContext);

  const [state, setState] = useState({
    ...INITIAL_STATE,
    isAuthenticated: !!auth().currentUser,
    user: auth().currentUser,
    profile: null,
  });

  useEffect(() => {
    let result = () => {};

    if (state.user?.uid) {
      result = firestore()
        .collection('users')
        .doc(state.user.uid)
        .onSnapshot(
          (snap) => {
            const profile = snap.data();

            setState({ ...state, profile: profile ?? null });
          },
          (error) => {
            analytics().logEvent('error_get_profile', {
              error: JSON.stringify(error),
            });
            console.log('Error on get profile data', error.message);
          }
        );
    } else {
      setState({ ...state, profile: null });
    }

    return () => result();
  }, [state.user]);

  const handleLogin = useCallback(
    async ({ email, password }, successCallback = null, failureCallback = null) => {
      try {
        const { user } = await auth().signInWithEmailAndPassword(email, password);

        await analytics().logEvent('login', {
          user: JSON.stringify(user),
        });

        setState({
          isAuthenticated: true,
          loading: false,
          profile: null,
          user,
        });

        hideLoading();

        setTimeout(() => {
          if (successCallback) successCallback();
        }, 100);
      } catch (error) {
        console.log('Error on login', error);

        await analytics().logEvent('error_login', { error: JSON.stringify(error) });

        hideLoading();

        setTimeout(() => {
          if (failureCallback) failureCallback();
        }, 100);
      }
    },
    [hideLoading]
  );

  const handleLogout = useCallback(
    async (successCallback = null, failureCallback = null) => {
      try {
        await auth().signOut();

        await analytics().logEvent('logout');

        setState({
          isAuthenticated: false,
          loading: false,
          profile: null,
          user: null,
        });

        hideLoading();

        setTimeout(() => {
          if (successCallback) successCallback();
        }, 100);
      } catch (error) {
        console.log('Error on logout', error);

        await analytics().logEvent('error_logout', { error: JSON.stringify(error) });
        hideLoading();

        setTimeout(() => {
          if (failureCallback) failureCallback();
        }, 100);
      }
    },
    [hideLoading]
  );

  const handleRegister = useCallback(
    async (payload, successCallback = null, failureCallback = null) => {
      try {
        const { user } = await auth().createUserWithEmailAndPassword(
          payload.email,
          payload.password
        );

        let picture = null;

        if (payload?.picture?.uri) {
          const reference = storage().ref(`users/${user.uid}.png`);

          await reference.putFile(payload.picture.uri, { cacheControl: 'no-store' });
          picture = reference.toString();
        }

        await firestore().collection('users').doc(user.uid).set({
          coordinate: payload.coordinate,
          description: payload.description,
          name: payload.name,
          phone: payload.phone,
          picture,
        });

        await analytics().logEvent('sign_up', {
          user: JSON.stringify(user),
        });

        setState({
          isAuthenticated: true,
          loading: false,
          profile: null,
          user,
        });

        hideLoading();

        setTimeout(() => {
          if (successCallback) successCallback();
        }, 100);
      } catch (error) {
        console.log('Error on register', error);

        await analytics().logEvent('error_register', { error: JSON.stringify(error) });
        hideLoading();

        setTimeout(() => {
          if (failureCallback) failureCallback();
        }, 100);
      }
    },
    [hideLoading]
  );

  return (
    <UserContext.Provider
      value={{
        state,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
