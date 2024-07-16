import { Link, useNavigate } from 'react-router-dom';
import profileIcon from '../../assets/media/profileIcon.png';
import './MainNavBar.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const MainNavBar = () => {
  const authCtx = useContext(AuthContext);
  const {isLoggedIn, isAdmin, logout} = authCtx;
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/auth');
  };
  return (
    <header className="main-navbar-header">
      <h3 className="main-navbar-logo"> מערך בטחון המידע</h3>

      <nav className='main-navbar-nav'>
        <ul>
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
