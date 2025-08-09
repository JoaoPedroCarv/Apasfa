
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../src/context/auth';

export default function Private({ children, adminOnly = false }) {
  const { signed, loading, user } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/registrar" state={{ from: location }} replace />;
  }

  if (adminOnly && (!user || !user.admin)) {
    // Redireciona para home ou página de acesso negado
    return <Navigate to="/" replace />;
  }

  return children;
}