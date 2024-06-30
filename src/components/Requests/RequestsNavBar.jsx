import { Link } from 'react-router-dom';
import './RequestsNavBar.css';

const RequestsNavBar = () => {
  return (
    <header className="requestnavbarheader">
      <nav>
        <ul>
          <li>
            <Link to="/requests/my-requests">הבקשות שלי</Link>
          </li>
          <li>
            <Link to="/requests/new-request">בקשה חדשה</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default RequestsNavBar;
