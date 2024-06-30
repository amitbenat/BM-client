import { Outlet } from 'react-router-dom';
import RequestsNavBar from '../components/Requests/RequestsNavBar';

const RequestsPage = () => {
  return (
    <>
      <RequestsNavBar />
      <Outlet />
    </>
  );
};

export default RequestsPage;
