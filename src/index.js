import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { AuthContextProvider } from './store/auth-context';
import PrortectedRoute from './components/Auth/ProtecetdRoute';
import MyRequestsPage from './pages/MyRequestsPage';
import NewRequestPage from './pages/NewRequestPage';
import RequestsPage from './pages/RequeatsPage';
import AdminRequestsPage from './pages/AdminRequestsPage';
import AdminOpenRequestsPage from './pages/AdminOpenRequestsPage';
import AdminHistoryRequestPage from './pages/AdminHistoryRequestPage';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/auth',
        element: (
          <PrortectedRoute isProtected={false}>
            <AuthPage />
          </PrortectedRoute>
        ),
      },
      {
        path: '/admin',
        element: (
          <PrortectedRoute isProtected={true} isForAdmin={true}>
            <AdminRequestsPage />
          </PrortectedRoute>
        ),
        children: [
          {
            path: 'open-requests',
            element: <AdminOpenRequestsPage />,
          },
          {
            path: 'request-history',
            element: <AdminHistoryRequestPage />,
          },
        ],
      },
      {
        path: '/requests',
        element: (
          <PrortectedRoute isProtected={true}>
            <RequestsPage />
          </PrortectedRoute>
        ),
        children: [
          {
            path: 'my-requests',
            element: <MyRequestsPage />,
          },
          {
            path: 'new-request',
            element: <NewRequestPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
