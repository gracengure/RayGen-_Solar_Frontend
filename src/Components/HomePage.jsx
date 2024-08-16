import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import './Navbar.css';
import { FaCaretDown } from 'react-icons/fa';
import image from '../assets/logo.jpg';
const HomePage = ({ cartCount }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const navigate = useNavigate();
  
  function toggleDropdown() {
    setIsDropdown(!isDropdown);
  }

  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem('cart');
    
    // Optionally redirect to the login page
    navigate("/login");
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div className="page-wrapper">
      <nav className="nav">
        <div className="nav-logo">
          <img  src={image} alt="RayGen Solar Solutions" className="logo-image" />
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
                <li><a href="#Solar Wall Light">Solar Wall</a></li>
                <li><a href="#Solar Street Light">Solar Street Lights</a></li>
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
          {isAuthenticated && (
            <li className="nav-item">
              <Link to="/profile">
                <AccountCircle className="nav-icon" />
              </Link>
            </li>
          )}
          <li className="nav-item">
            {isAuthenticated ? (
              <button className="sign-up-button" onClick={handleSignOut}>Sign Out</button>
            ) : (
              <Link to="/signup">
                <button className="sign-up-button">Sign Up</button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      
      <main className="content">
        {/* Content goes here */}
       
      </main>
    </div>
  );
};

export default HomePage;