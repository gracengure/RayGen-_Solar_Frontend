import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/Navbar/HomePage';
import Signup from './Components/Auth/Signup.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />

      
    </Routes>
  );
}

export default App;
