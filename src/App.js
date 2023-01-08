import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/react-fontawesome'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Login from './components/AuthComponents/Login';
import Register from './components/AuthComponents/Register';
import { ToastContainer } from 'react-toastify';
import routes from './routes'

const Layout = () => {
  return (<div className='app'>
    <Navbar />
    <Outlet />
  </div>)
}
const routing = routes.map((route)=> {
  console.log(route);
  return(
    {
      path:route.path,
      element:<route.element />,
      exact : route.exact
    }
  )
})
const router = createBrowserRouter([

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: routing
  }

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
      <Suspense fallback='Loading...'>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
