import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext)

  const isLoggedIn = authCtx.isLoggedIn

  const logoutHandler = () => {
    authCtx.logout()
  }
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {!isLoggedIn&&<li>
            <Link to='/auth'>התחברות</Link>
          </li>}
          {isLoggedIn&&<li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedIn&&<li>
            <button onClick={logoutHandler}>התנתקות</button>
          </li>}
        </ul>
      </nav>
      <Link to='/'>
        <div className={classes.logo}> מערך בטחון המידע</div>
      </Link>
    </header>
  );
};

export default MainNavigation;
