import React, { createContext, useState, useEffect, useContext, useMemo, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api'; 

type AuthContextType = {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  userToken: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      setUserToken(token);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  const authContextValue = useMemo(
    () => ({
      isLoading,
      userToken,
      signIn: async (username: any, password: any) => {
        const response = await api.post('/api/token/', { username, password });
        const { access, refresh } = response.data;
        await SecureStore.setItemAsync('accessToken', access);
        await SecureStore.setItemAsync('refreshToken', refresh);
        setUserToken(access);
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        setUserToken(null);
      },
    }),
    [isLoading, userToken]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};