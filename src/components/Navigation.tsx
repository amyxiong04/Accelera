'use client';

import Link from 'next/link';
import { useAuthentication } from '@/hooks/useAuthentication';

export default function Navigation() {
  const { isLoggedIn, isLoading, user, logout } = useAuthentication();

  const handleLogout = () => {
    logout();
    // Optionally redirect after logout
    // window.location.href = '/';
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          My App
        </Link>

        <div className="space-x-4">
          {isLoading ? (
            <span>Loading...</span>
          ) : isLoggedIn ? (
            <>
              <span>Welcome, {user?.name || user?.email}</span>
              <Link href="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded bg-red-600 px-3 py-1 hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link href="/signup" className="rounded bg-blue-600 px-3 py-1 hover:bg-blue-700">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
