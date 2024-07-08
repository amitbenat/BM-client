import { Link } from 'react-router-dom';

import './MainNavBar.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const MainNavBar = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.isAdmin;

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <header className="mainnavbarheader">
      <Link to="/">
        <div className="mainnavbarlogo"> מערך בטחון המידע</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">התחברות</Link>
            </li>
          )}
          {isAdmin && (
            <li>
              <Link to="/admin/open-requests">ניהול בקשות</Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link to="/requests/my-requests">בקשות</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>התנתקות</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavBar;
