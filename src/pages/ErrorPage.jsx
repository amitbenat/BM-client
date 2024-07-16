import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const ErrorPage = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;


    if (isLoggedIn) {
      return <Navigate to="/requests/my-requests" />;
    }
    return <Navigate to="/auth" />;
};

export default ErrorPage;
