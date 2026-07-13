

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth(); // isLoading add karein

  if (isLoading) return <div>Loading...</div>; // Jab tak load ho raha hai

  if (!user) return <Navigate to="/login" replace />;
  
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  
  return children;
};

export default AdminRoute