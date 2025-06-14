import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  setAuthenticated: (authenticated: boolean, username: string) => void;
  userId: number;
  setUserId: (id: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState<number>(0);

  const setAuthenticated = (authenticated: boolean, username: string) => {
    setIsAuthenticated(authenticated);
    setUsername(username);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, setAuthenticated, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
