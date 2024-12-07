import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  publicRoute?: boolean; // A flag to allow access for logged-in users to public routes (like login/signup)
}

export default function ProtectedRoute({ children, allowedRoles, publicRoute }: ProtectedRouteProps) {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  // Allow access to public routes (like login/signup) for non-authenticated users
  if (publicRoute && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Redirect to login if user is not authenticated and trying to access protected route
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle role-based access
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
