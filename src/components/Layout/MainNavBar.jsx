import { Link, useNavigate } from 'react-router-dom';
import profileIcon from '../../utils/profileIcon.png';
import './MainNavBar.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const MainNavBar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.isAdmin;
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/auth');
  };
  return (
    <header className="mainnavbarheader">
      <h3 className="mainnavbarlogo"> מערך בטחון המידע</h3>

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
                <Link to="/profile">
                  <img src={profileIcon} alt="פרופיל" />
                </Link>
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
