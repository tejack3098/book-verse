// src/components/Auth/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/AuthenticationService';

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRole?: string; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole = 'customer' }) => {
  const { token, role } = getCurrentUser();

  if (!token) {
    // User is not authenticated
    return <Navigate to="/signin" />;
  }

  if (role !== requiredRole) {
    // User does not have the required role
    return <Navigate to="/" />;
  }

  // User is authenticated and has the correct role
  return element;
};

export default ProtectedRoute;
