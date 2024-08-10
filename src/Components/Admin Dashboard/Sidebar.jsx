import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/assets/WhatsApp Image 2024-08-02 at 20.05.11.jpeg" alt="Admin Logo" />
      </div>
      <ul>
        <li><Link to="/dashboard/home">Home</Link></li>
        <li><Link to="/dashboard/products">Products</Link></li>
        <li><Link to="/dashboard/orders">Orders</Link></li>
        <li><Link to="/dashboard/customers">Customers</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
