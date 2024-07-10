import { useContext, useEffect, useState } from 'react';
import RequestsList from '../components/Requests/RequestsTable.jsx/RequestsList';
import Card from '../components/UI/Card';
import AuthContext from '../store/auth-context';
import axios from 'axios';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import './AdminOpenRequestsPage.css';
import AdminRejectDescription from '../components/Admin/AdminRejectDescription';

const AdminOpenRequestsPage = () => {
  const [isRejectDescriptionOpen, setIsRejectDescriptionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestsArray, setRequestsArray] = useState([]);
  const [requestTypeFilter, setRequestTypeFilter] = useState('הכל');
  const [chosenRequestId, setChosenRequestId] = useState('');

  const authCtx = useContext(AuthContext);
  const onChangeHandler = (event) => {
    setRequestTypeFilter(event.target.value);
  };

  const openRejectHandler = () => {
    setIsRejectDescriptionOpen(true);
  };

  const closeRejectHandler = () => {
    setIsRejectDescriptionOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    let url = `http://localhost:8080/admin-open-requests?requestType=${requestTypeFilter}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setRequestsArray(res.data);
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  }, [authCtx.token, requestTypeFilter]);

  return (
    <>
      {isLoading && (
        <div className="requestformloading">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <>
          <br />
          <Card>
            <div className="adminopencontrol">
              <h3>בקשות פתוחות לאישור קב"מ</h3>
              <select
                onChange={onChangeHandler}
                value={requestTypeFilter}
                dir="rtl"
              >
                <option value="הכל">הכל</option>
                <option value="בקשת השחרה">בקשת השחרה</option>
                <option value="בקשת אישור כניסה רגלי">
                  בקשת אישור כניסה רגלי
                </option>
                <option value="בקשת אישור כניסה רכוב">
                  בקשת אישור כניסה רכוב
                </option>
                <option value="בקשת קידוד חוגר">בקשת קידוד חוגר</option>
                <option value='בקשת טופס חתימה על שו"ס'>
                  בקשת טופס חתימה על שו"ס
                </option>
              </select>
            </div>

            <RequestsList
              openRejectHandler={openRejectHandler}
              setRequestsArray={setRequestsArray}
              requestsArray={requestsArray}
              tableType="open-admin"
              setChosenRequestId={setChosenRequestId}
            />
          </Card>
          {isRejectDescriptionOpen && (
            <AdminRejectDescription
              requestsArray={requestsArray}
              setRequestsArray={setRequestsArray}
              chosenRequestId={chosenRequestId}
              onClose={closeRejectHandler}
            />
          )}
        </>
      )}
    </>
  );
};

export default AdminOpenRequestsPage;
