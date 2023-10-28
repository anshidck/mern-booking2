import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './pages/Hero';
import PlacesInfo from './pages/PlacesInfo';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Hero />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/info/:id' element={<PlacesInfo/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
