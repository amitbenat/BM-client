import { Link } from 'react-router-dom';
import './AdminNavBar.css';

const RequestsNavBar = (props) => {
  return (
    <header className="requestnavbarheader">
      <nav>
        <ul>
          <li>
            <Link to="/admin/open-requests">בקשות פתוחות</Link>
          </li>
          <li>
            <Link to="/admin/request-history">היסטוריית בקשות</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default RequestsNavBar;
