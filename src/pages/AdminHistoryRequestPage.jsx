import { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Card from '../components/UI/Card';
import RequestsList from '../components/Requests/RequestsTable.jsx/RequestsList';
import axios from 'axios';
import AuthContext from '../store/auth-context';
import AdminDateChange from '../components/Admin/AdminDateChange';
import './AdminHistoryRequestPage.css'

const AdminHistoryRequestPage = () => {
  const [requestsArray, setRequestsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isChangingDate, setIsChangingDate] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [dateRange, setDateRange] = useState([
    {
      startDate: undefined,
      endDate: undefined,
      key: 'selection',
    },
  ]);

  const authCtx = useContext(AuthContext);
  const chooseDateHandler = () => {
    setIsChangingDate(true);
  };
  const onClose = () => {
    setIsChangingDate(false);
  };
  const lastPageHandler = () => {
    setPage((prev) => {
      return prev - 1;
    });
  };
  const nextPageHandler = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const { startDate, endDate } = dateRange[0];
    let url = `http://localhost:8080/admin-history-requests?${
      startDate && `startdate=${startDate.toISOString()}`
    }${endDate && `&enddate=${endDate.toISOString()}`}&page=${page}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setRequestsArray(res.data.requests);
        setTotalPages(res.data.totalPages);
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  }, [authCtx.token, dateRange, page]);

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
            <div className="filter-control-history">
              <h3>כל הבקשות</h3>
              <div>
                <button onClick={chooseDateHandler}>טווח תאריכים</button>
              </div>
            </div>

            <RequestsList
              requestsArray={requestsArray}
              tableType="history-admin"
            />
            {totalPages > 0 && (
              <>
                <div className='page-control'>
                  <button onClick={lastPageHandler} disabled={page <= 1}>
                    &lt;הקודם
                  </button>
                  <p>
                    {page}/{totalPages}
                  </p>
                  <button
                    onClick={nextPageHandler}
                    disabled={page >= totalPages}
                  >
                    הבא&gt;
                  </button>
                </div>
              </>
            )}
          </Card>
          {isChangingDate && (
            <AdminDateChange
              setPage={setPage}
              onClose={onClose}
              setDateRange={setDateRange}
              dateRange={dateRange}
            />
          )}
        </>
      )}
    </>
  );
};

export default AdminHistoryRequestPage;
