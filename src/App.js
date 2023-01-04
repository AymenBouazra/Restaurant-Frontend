import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/react-fontawesome'

import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Suspense fallback={<h2 className='text-center'>Loading...</h2>}>
          <Routes>
              <Route path='/' element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
