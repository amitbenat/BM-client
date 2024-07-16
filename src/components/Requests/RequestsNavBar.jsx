import { Link, useNavigate } from 'react-router-dom';
import './RequestsNavBar.css';

const RequestsNavBar = (props) => {
  const navigate = useNavigate();

  const newRequestHandler = (event) => {
    const requestType = event.target.value;
    props.setRequestType(requestType);
    if (requestType) {
      navigate('/requests/new-request');
    }
  };
  return (
    <header className="request-navbar-header">
      <nav>
        <ul>
          <li>
            <Link to="/requests/my-requests">הבקשות שלי</Link>
          </li>
          <li>
            <select value="בקשה חדשה" onChange={newRequestHandler} dir="rtl">
              <option>בקשה חדשה</option>
              <option value="בקשת השחרה">בקשת השחרה</option>
              <option value='בקשת אישור כניסה רגלי/רכוב לבה"ד'>
                בקשת אישור כניסה רגלי/רכוב לבה"ד
              </option>
              <option value="בקשת קידוד חוגר">בקשת קידוד חוגר</option>
              <option value='בקשת טופס חתימה על שו"ס'>
                בקשת טופס חתימה על שו"ס
              </option>
            </select>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default RequestsNavBar;
