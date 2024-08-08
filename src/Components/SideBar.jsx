import React from 'react';
import './Navbar.css'; // Make sure this is the correct path
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <ul>
        <li>
            <Link to="/home">Home</Link>
          </li>
    
          <li> 
            <Link to="/customer">Customers</Link>
        </li>
        <li> 
            <Link to="/products">Products</Link>
        </li>
          <li>Orders</li>
        </ul>
      </div>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
};

export default Sidebar;
