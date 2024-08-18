import React, { createContext, useState } from 'react';

export const StagiaireContext = createContext();

export const StagiaireProvider = ({ children }) => {
  const [stagiaire, setStagiaire] = useState(null);

  return (
    <StagiaireContext.Provider value={[stagiaire, setStagiaire]}>
      {children}
    </StagiaireContext.Provider>
  );
};
