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
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">התחברות</Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <button onClick={logoutHandler}>התנתקות</button>
              </li>
              <li>
                <Link to="/requests/my-requests">בקשות</Link>
              </li>
            </>
          )}
          {isAdmin  && (
            <li>
              <Link to="/admin">צד המאסטר זה אני ואתן לא</Link>
            </li>
          )}
        </ul>
      </nav>
      <Link to="/">
        <div className="mainnavbarlogo"> מערך בטחון המידע</div>
      </Link>
    </header>
  );
};

export default MainNavBar;
