import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/react-fontawesome'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
const Home = React.lazy(() => import('./components/Home'))
const Login = React.lazy(() => import('./components/AuthComponents/Login'))

const Register = React.lazy(() => import('./components/AuthComponents/Register'))

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Suspense fallback='Loading...'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
