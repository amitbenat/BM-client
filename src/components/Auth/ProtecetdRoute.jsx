import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Navigate } from 'react-router-dom';

const PrortectedRoute = ({ children, isProtected, isForAdmin = false }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.isAdmin;

  if (isProtected) {
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }
  }

  if (isForAdmin) {
    if (!isAdmin) {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default PrortectedRoute;
