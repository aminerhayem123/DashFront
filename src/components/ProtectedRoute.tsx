import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  console.log('Protected Route Check:', {
    isAuthenticated,
    userRole,
    allowedRoles,
    currentPath: location.pathname
  });

  if (!isAuthenticated) {
    console.log('User is not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && userRole) {
    console.log('Checking role access:', {
      userRole,
      allowedRoles,
      hasAccess: allowedRoles.includes(userRole)
    });
    
    if (!allowedRoles.includes(userRole)) {
      console.log('Access denied: User role', userRole, 'not in allowed roles:', allowedRoles);
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}