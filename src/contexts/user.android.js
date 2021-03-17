import React, { createContext, useCallback, useEffect, useState } from 'react';
import OneSignal from 'react-native-onesignal';

import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const INITIAL_STATE = {
  loading: false,
  isAuthenticated: false,
  profile: null,
  user: null,
};
const UserContext = createContext({
  state: INITIAL_STATE,
  handleLogin: ({ email: _email, password: _password }, _successCallback, _failureCallback) => {},
  handleLogout: (_successCallback, _failureCallback) => {},
  handleRegister: (_payload, _successCallback, _failureCallback) => {},
});

export const UserProvider = ({ children }) => {
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
              error,
            });
            console.log('Error on get profile data', error.message);
          }
        );
    } else {
      setState({ ...state, profile: null });
    }

    OneSignal.sendTag('user_type', state.user ? 'organization' : 'normal');

    return () => result();
  }, [state.user]);

  const handleLogin = useCallback(
    ({ email, password }, successCallback = null, failureCallback = null) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          setState({
            isAuthenticated: true,
            loading: false,
            profile: null,
            user,
          });

          analytics()
            .logEvent('login', {
              user,
            })
            .finally(() => {
              if (successCallback) successCallback();
            });
        })
        .catch((error) => {
          console.log('Error on login', error);

          analytics()
            .logEvent('error_login', { error })
            .finally(() => {
              if (failureCallback) failureCallback();
            });
        });
    },
    []
  );

  const handleLogout = useCallback(
    (successCallback = null, failureCallback = null) => {
      auth()
        .signOut()
        .then(() => {
          setState({
            isAuthenticated: false,
            loading: false,
            profile: null,
            user: null,
          });

          analytics()
            .logEvent('logout', {
              user: state.user,
            })
            .finally(() => {
              if (successCallback) successCallback();
            });
        })
        .catch((error) => {
          console.log('Error on logout', error);

          analytics()
            .logEvent('error_logout', { error })
            .finally(() => {
              if (failureCallback) failureCallback();
            });
        });
    },
    [state.user]
  );

  const handleRegister = useCallback((payload, successCallback = null, failureCallback = null) => {
    auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(({ user }) => {
        let picture = null;
        let task = null;

        if (payload?.picture?.uri) {
          const reference = storage().ref(`users/${user.uid}.png`);

          task = reference.putFile(payload.picture.uri, { cacheControl: 'no-store' });
          picture = reference.toString();
        }

        firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            coordinate: payload.coordinate,
            description: payload.description,
            name: payload.name,
            phone: payload.phone,
            picture,
          })
          .then(() => {
            if (task) {
              task.then(() => {
                setState({
                  isAuthenticated: true,
                  loading: false,
                  profile: null,
                  user,
                });

                analytics()
                  .logEvent('signup', {
                    user,
                  })
                  .finally(() => {
                    if (successCallback) successCallback();
                  });
              });
            } else {
              setState({
                isAuthenticated: true,
                loading: false,
                profile: null,
                user,
              });

              analytics()
                .logEvent('signup', {
                  user,
                })
                .finally(() => {
                  if (successCallback) successCallback();
                });
            }
          });
      })
      .catch((error) => {
        console.log('Error on register', error);

        analytics()
          .logEvent('error_register', { error })
          .finally(() => {
            if (failureCallback) failureCallback();
          });
      });
  }, []);

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
