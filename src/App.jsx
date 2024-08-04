import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/Navbar/HomePage';
import Signup from './Components/Auth/Signup.jsx';
import Login from './Components/Auth/Login.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      
    </Routes>
  );
}

export default App;
