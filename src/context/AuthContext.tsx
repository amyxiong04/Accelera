'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoginData } from '@/actions/users/login-action';

// Define the shape of our authentication state
type AuthState = {
  user: LoginData['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
};

// Define the shape of our context
type AuthContextType = AuthState & {
  login: (userData: LoginData) => void;
  logout: () => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps the app
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    setAuthState: () => {},
  });

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setAuthState({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            setAuthState: setAuthState,
          });
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = (userData: LoginData) => {
    // Set in localStorage for client-side access
    localStorage.setItem('authUser', JSON.stringify(userData.user));

    // Set a cookie for middleware access
    document.cookie = `authToken=${userData.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days expiry

    setAuthState({
      user: userData.user,
      isAuthenticated: true,
      isLoading: false,
      setAuthState: setAuthState,
    });
  };

  // Logout function
  const logout = () => {
    // Clear from localStorage
    localStorage.removeItem('authUser');

    // Clear the cookie
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setAuthState: setAuthState,
    });

    window.location.href = '/auth/login';
  };

  // Provide the auth context to children
  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setAuthState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
