import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import { AuthContextProvider } from './store/auth-context';
import PrortectedRoute from './components/Auth/ProtecetdRoute';


const router = createBrowserRouter([
  {
    element: <App/>,
    children:[
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/auth",
        element:( 
        <PrortectedRoute isProtected={false}>
          <AuthPage/>
        </PrortectedRoute>
      )},
      {
        path: '/profile',
        element: (
          <PrortectedRoute isProtected={true}>
            <ProfilePage/>
          </PrortectedRoute>
          )
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);