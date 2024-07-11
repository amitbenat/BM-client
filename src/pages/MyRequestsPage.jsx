import { useContext, useEffect, useState } from 'react';
import RequestsList from '../components/Requests/RequestsTable.jsx/RequestsList';
import Card from '../components/UI/Card';
import AuthContext from '../store/auth-context';
import axios from 'axios';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const MyRequestsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openArray, setOpenArray] = useState([]);
  const [closeArray, setCloseArray] = useState([]);

  const authCtx = useContext(AuthContext);
  useEffect(() => {
    setIsLoading(true);
    let url = `http://localhost:8080/requests`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        const tempOpenArray = [];
        const tempCloseArray = [];

        res.data.forEach((item) => {
          if (item.status === 'pending') {
            tempOpenArray.push(item);
          } else {
            tempCloseArray.push(item);
          }
        });

        setOpenArray(tempOpenArray);
        setCloseArray(tempCloseArray);
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  }, [authCtx.token]);
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
            <h3>בקשות פתוחות</h3>
            <RequestsList requestsArray={openArray} tableType="open-client" />
          </Card>
          <br />
          <Card>
            <h3>בקשות סגורות</h3>
            <RequestsList requestsArray={closeArray} tableType="close-client" />
          </Card>
        </>
      )}
    </>
  );
};

export default MyRequestsPage;
