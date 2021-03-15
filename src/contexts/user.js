import React, { createContext, useState } from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const INITIAL_STATE = {
  loading: false,
  isAuthenticated: false,
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
  });

  const handleLogin = ({ email, password }, successCallback = null, failureCallback = null) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setState({
          isAuthenticated: true,
          loading: false,
          user,
        });

        if (successCallback) successCallback();
      })
      .catch((error) => {
        console.log('Error on login', error);

        if (failureCallback) failureCallback();
      });
  };

  const handleLogout = (successCallback = null, failureCallback = null) => {
    auth()
      .signOut()
      .then(() => {
        setState({
          isAuthenticated: false,
          loading: false,
          user: null,
        });

        if (successCallback) successCallback();
      })
      .catch((error) => {
        console.log('Error on logout', error);

        if (failureCallback) failureCallback();
      });
  };

  const handleRegister = (payload, successCallback = null, failureCallback = null) => {
    auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(({ user }) => {
        firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            id: user.uid,
            ...payload,
          })
          .then(() => {
            setState({
              isAuthenticated: true,
              loading: false,
              user,
            });

            if (successCallback) successCallback();
          });
      })
      .catch((error) => {
        console.log('Error on register', error);

        if (failureCallback) failureCallback();
      });
  };

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
