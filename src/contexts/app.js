import React, { createContext, useCallback, useState } from 'react';

const INITIAL_STATE = {
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
};

const AppContext = createContext(INITIAL_STATE);

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        hideLoading,
        showLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
