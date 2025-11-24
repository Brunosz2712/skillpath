import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  login as loginRequest,
  signup as signupRequest,
  AuthUser,
} from '../services/authService';

type AuthContextData = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (values: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const [[, storedToken], [, storedUser]] = await AsyncStorage.multiGet([
          '@skillpath:token',
          '@skillpath:user',
        ]);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setLoading(false);
      }
    }
    loadStorageData();
  }, []);

  async function login(email: string, password: string) {
    const data = await loginRequest(email, password);

    setToken(data.token);
    setUser(data.user);

    await AsyncStorage.multiSet([
      ['@skillpath:token', data.token],
      ['@skillpath:user', JSON.stringify(data.user)],
    ]);
  }

  async function signup(values: { name: string; email: string; password: string }) {
    await signupRequest(values);
  }

  async function logout() {
    setToken(null);
    setUser(null);
    await AsyncStorage.multiRemove(['@skillpath:token', '@skillpath:user']);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
