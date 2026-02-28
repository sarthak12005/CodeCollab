import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin.js';

const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin, isLoading } = useAdmin();

  // Show loading spinner while checking admin status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          <p className="text-white text-lg font-medium">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  // If not admin, redirect to login
  if (!isAdmin) {
    console.warn('User is not an admin. Redirecting to login.');
    return <Navigate to="/login" replace />;
  }

  // User is admin, render the component
  return children;
};

export default ProtectedAdminRoute;
