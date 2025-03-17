'use client';

import { useAuth } from '@/context/AuthContext';

export function useAuthentication() {
  const { isAuthenticated, isLoading, user, login, logout } = useAuth();

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    isLoggedIn: isAuthenticated && !isLoading,
    isAnonymous: !isAuthenticated && !isLoading,
  };
}
