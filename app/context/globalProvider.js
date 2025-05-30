"use client";

import { createContext, useContext, useState } from 'react';
import themes from '@/app/context/themes'; // ✅ default import

export const GlobalContext = createContext({
  theme: themes.default,
  setTheme: () => {},
});

export const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.default);

  return (
    <GlobalContext.Provider value={{ theme, setTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
};
