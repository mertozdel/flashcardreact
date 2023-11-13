import React, { useContext, createContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);  
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) { 
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
