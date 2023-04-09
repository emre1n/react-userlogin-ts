import React, { useState, useEffect } from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
}

type TAuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = React.createContext<IAuthContext>({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email: string, password: string) => {},
});

export const AuthContextProvider = ({
  children,
}: TAuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
