import { useContext, useEffect, useState } from 'react';
import RequestsList from '../Requests/RequestsTable.jsx/RequestsList';
import AuthContext from '../../store/auth-context';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';

const AdminOpenTable = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestsArray, setRequestsArray] = useState([]);

  const authCtx = useContext(AuthContext);


  useEffect(() => {
    setIsLoading(true);
    let url = `http://localhost:8080/admin-open-requests?requestType=${props.requestTypeFilter}`;
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
  }, [authCtx.token, props.requestTypeFilter]);

  return (
    <>
      {isLoading && (
        <div className="requestformloading">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <>
            <RequestsList requestArray={requestsArray} tableType="open-admin" />
        </>
      )}
    </>
  );
};

export default AdminOpenTable;
