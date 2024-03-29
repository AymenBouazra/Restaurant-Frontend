import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/react-fontawesome'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './firebase-messaging-sw'

import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { adminRoutes, clientRoutes } from './routes'
import Page404 from './components/Page404';
import PrivateRoute from './PrivateRoute/PrivateRoute';
const Layout = React.lazy(() => import('./components/Layout'));
const ClientLayout = React.lazy(() => import('./clientSide/ClientLayout'));
const Login = React.lazy(() => import('./components/AuthComponents/Login'));
const Register = React.lazy(() => import('./components/AuthComponents/Register'));
const Loading =
  <div className="d-flex justify-content-center vh-100 align-items-center">
    <div className="spinner-grow text-info" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>

const adminRouting = adminRoutes.map((route) => {
  return (
    route.element && {
      path: route.path,
      element: <route.element />,
      exact: route.exact,
      name: route.name
    }
  )
})
const clientRouting = clientRoutes.map((route) => {
  return (
    route.element && {
      path: route.path,
      element: <route.element />,
      exact: route.exact,
      name: route.name
    }
  )
})
const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: clientRouting
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/admin',
    element: <PrivateRoute><Layout /></PrivateRoute>,
    children: adminRouting
  },
  {
    path: '*',
    element: <Page404 />
  },

]);
function App() {


  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Suspense fallback={Loading}>
        <RouterProvider router={router} fallbackElement={Loading} />

      </Suspense>
    </div>
  );
}

export default App;
