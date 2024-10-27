import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useState } from 'react';

import type { TSignInDTO } from '@/types/auth';

interface IAuthContext {
  user: TSignInDTO | null;
  setUser: React.Dispatch<React.SetStateAction<TSignInDTO | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<IAuthContext | null>(null);

type AuthProviderProps = PropsWithChildren;

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    localStorage.getItem('accessToken') ? Boolean(localStorage.getItem('accessToken')) : false,
  );

  const [user, setUser] = useState<TSignInDTO | null>(null);
  return <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth 훅은, AuthProvider와 함께 사용되어져야 합니다.');
  }
  return context;
};

export default AuthProvider;
