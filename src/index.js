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
