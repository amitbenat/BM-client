import { useContext, useEffect, useRef, useState } from 'react';
import RequestsList from '../components/Requests/RequestsTable.jsx/RequestsList';
import Card from '../components/UI/Card';
import AuthContext from '../store/auth-context';
import axios from 'axios';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import './AdminOpenRequestsPage.css';
import AdminRejectDescription from '../components/Admin/AdminRejectDescription';

const AdminOpenRequestsPage = () => {
  const [isRejectDescriptionOpen, setIsRejectDescriptionOpen] = useState(false);
  const [isFilterByType, setIsFilterByType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [requestsArray, setRequestsArray] = useState([]);
  const [requestTypeFilter, setRequestTypeFilter] = useState('הכל');
  const [chosenRequestId, setChosenRequestId] = useState('');
  const [count, setCount] = useState(0);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const searchEmailInputRef = useRef('e');

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
    let params;
    if (isFilterByType) {
      params = {
        requestType: requestTypeFilter,
        filterByType: isFilterByType,
      };
    } else {
      params = {
        email: searchEmailInputRef.current.value,
        filterByType: isFilterByType,
      };
    }
    setIsLoading(true);
    let url = `http://localhost:8080/admin-open-requests`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
        params,
      })
      .then((res) => {
        setIsLoading(false);
        setRequestsArray(res.data.requests);
        setIsEmailValid(res.data.isEmailValid);
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  }, [authCtx.token, requestTypeFilter, count]);

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
            <div className='filter-control-open'>

            <button
              onClick={() => {
                setIsFilterByType((prev) => !prev);
                setIsEmailValid(true);
              }}
              >
              {!isFilterByType ? 'סנן לפי סוג בקשה' : 'סנן לפי אימייל'}
            </button>
            <div>
              {!isFilterByType && (
                <form className="adminopencontrol">
                  <label htmlFor="email">כתובת אימייל</label>
                  <input
                    type="email"
                    id="email"
                    required
                    ref={searchEmailInputRef}
                    />
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      setCount((prevCount) => prevCount + 1);
                      setRequestTypeFilter('הכל');
                      setIsEmailValid(true);
                    }}
                    >
                    סנן
                  </button>
                </form>
              )}
              {isFilterByType && (
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
              )}
              {!isEmailValid && <p className='error-massage'>לא נמצאו בקשות מאימייל זה</p>}
            </div>
            <br />
                  </div>
          </Card>
          <Card>
            <div className="adminopencontrol">
              <h3>בקשות פתוחות לאישור קב"מ</h3>
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
