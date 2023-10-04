import react,{ createContext, useContext, useState } from 'react';

const IdContext=createContext();
export const IdContextProvider = ({ children }) => {
  const [targetName, setTargetname] = useState();

  const updateTargetName = (name) => {
    setTargetname(name);
  };

  const contextValue = {
    targetName,
    updateTargetName,
  };

  return <IdContext.Provider value={contextValue}>{children}</IdContext.Provider>;
};

export const useIdContext = () => {
  return useContext(IdContext);
};


