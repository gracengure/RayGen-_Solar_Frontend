import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import image from '../../assets/logo.jpg'; // Adjust path if needed

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="logo">
        <img src={image} alt="Admin Logo" />
      </div>
      <ul>
        <li><Link to="/dashboard/home">Home</Link></li>
        <li style={{ marginTop: '70px' }}><Link to="/dashboard/products">Products</Link></li>
        <li style={{ marginTop: '70px' }}><Link to="/dashboard/orders">Orders</Link></li>
        <li style={{ marginTop: '70px' }}><Link to="/dashboard/customers">Customers</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
