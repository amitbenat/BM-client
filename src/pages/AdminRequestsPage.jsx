import { Outlet } from 'react-router-dom';
import AdminNavBar from '../components/Admin/AdminNavBar';

const AdminRequestsPage = () => {
  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  );
};

export default AdminRequestsPage;
