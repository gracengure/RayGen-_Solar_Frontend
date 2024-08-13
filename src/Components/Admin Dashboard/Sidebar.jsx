import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Dashboard.css';
import image from '../../assets/logo.jpg'; // Adjust path if needed

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthenticated");
    
    // Redirect to the login page
    navigate("/login");
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="logo">
        <img src={image} alt="Admin Logo" />
      </div>
      <ul>
        <li><Link to="/dashboard/home">Home</Link></li>
        <li><Link to="/dashboard/products">Products</Link></li>
        <li><Link to="/dashboard/orders">Orders</Link></li>
        <li><Link to="/dashboard/customers">Customers</Link></li>
        <li><Link to="/dashboard/calendar">Calendar</Link></li>
        <li>
          {isAuthenticated ? (
            <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
          ) : (
            <Link to="/signup">
              <button className="sign-up-button">Sign Up</button>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
