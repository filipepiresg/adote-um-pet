import React, { createContext, useReducer } from 'react';

import UserReducer, { INITIAL_STATE } from '../reducers/user';

const UserContext = createContext({ state: INITIAL_STATE, dispatch: () => {} });

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
