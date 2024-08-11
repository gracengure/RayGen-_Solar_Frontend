import React from 'react';
import { Outlet } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Home from './Home';
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        {/* This is where your main content will be displayed based on the current route */}
        <h1 style={{ textAlign: 'center' }}>Welcome to the Admin Dashboard</h1>
        <Outlet />
        <Home/>
      </div>
    </div>
  );
};

export default Dashboard;
