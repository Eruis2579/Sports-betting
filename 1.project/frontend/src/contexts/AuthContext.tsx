import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, AuthResponse } from '../services/authService';
import axios from 'axios';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          setToken(storedToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          // Verify token and get user profile
          const userProfile = await authService.getProfile();
          setUser(userProfile.user);
        }
      } catch (error) {
        window.SM.error(error as string);
        // Clear invalid token
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await authService.login(credentials);

      setToken(response.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      setUser(response.user);
      localStorage.setItem('authToken', response.token);
    } catch (error) {
      window.SM.error(error as string);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await authService.register(userData);

      setToken(response.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      setUser(response.user);
      localStorage.setItem('authToken', response.token);
    } catch (error) {
      window.SM.error(error as string);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setToken(null);
    setUser(null);
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('authToken');
  };

  const refreshToken = async (): Promise<void> => {
    try {
      const response: AuthResponse = await authService.refreshToken();
      setToken(response.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      setUser(response.user);
      localStorage.setItem('authToken', response.token);
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};