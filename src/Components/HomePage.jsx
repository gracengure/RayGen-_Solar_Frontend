import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, AccountCircle, Menu } from '@mui/icons-material';
import Sidebar from './SideBar'; 
import './Navbar.css';
import { FaCaretDown } from 'react-icons/fa';

const HomePage = ({ cartCount }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdown(!isDropdown);
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="page-wrapper">
      <nav className="nav">
        <div className="nav-logo">
          <img alt="RayGen Solar Solutions" className="logo-image" />
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li className="navbar-categories">
            Products
            <FaCaretDown onClick={toggleDropdown} />
            {isDropdown && (
              <ul className="dropdown">
                <li><a href="#Solar Panel light">Solar Panel</a></li>
                <li><a href="#solar-wall">Solar Wall</a></li>
                <li><a href="#solar-street-lights">Solar Street Lights</a></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/cart">
              <ShoppingCart className="nav-icon" />
              <span className="cart-count-badge">{cartCount}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile">
              <AccountCircle className="nav-icon" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup">
              <button className="sign-up-button">Sign Up</button>
            </Link>
          </li>
        </ul>
      </nav>
      <Menu className="sidebar-icon" onClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main className="content">
        {/* Content goes here */}
        <img src="/mnt/data/Screenshot from 2024-08-08 10-29-47.png" alt="Solar panels" className="hero-image" />
      </main>
    </div>
  );
};

export default HomePage;
