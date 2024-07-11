import React, { useCallback, useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  isAdmin: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedAdmin = localStorage.getItem('isAdmin');

  return {
    token: storedToken,
    isAdmin: storedAdmin,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initiallToken;
  let initiallAdmin;
  if (tokenData) {
    initiallToken = tokenData.token;
    initiallAdmin = tokenData.isAdmin === 'true';
  }
  const [token, setToken] = useState(initiallToken);
  const [isAdmin, setIsAdmin] = useState(initiallAdmin);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setIsAdmin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }, []);

  const loginHandler = (token, isAdmin) => {
    setToken(token);
    setIsAdmin(isAdmin);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('token', token);
  };

  const contextValue = {
    token,
    isAdmin,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
