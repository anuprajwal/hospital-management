import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  
  // 1. Check Authentication
  const token = localStorage.getItem('user_auth');
  const userRole = localStorage.getItem('user_role');

  if (!token) {
    // Redirect to login, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check Authorization (Role-based)
  // If allowedRoles is provided, check if the user's role is in the list
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to a "Forbidden" page or back to dashboard
    return <Navigate to="*" replace />;
  }

  return children;
};

export default ProtectedRoute;