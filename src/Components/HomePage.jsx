
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import './Navbar.css';
import { FaCaretDown } from 'react-icons/fa';

const HomePage = ({ cartCount }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  function toggleDown() {
    setIsDropdown(!isDropdown);
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
            <FaCaretDown onClick={toggleDown} />
            {isDropdown && (
              <ul className="dropdown">
                <li><a href="#Solar Panel light">Solar Panel</a></li>
                <li><a href="#solar-wall">Solar Wall</a></li>
                <li><a href="#solar-street-lights">Solar Street Lights</a></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/">About</Link>
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
      <main className="content">
        {/* Content goes here */}
      </main>
    </div>
  );
};

export default HomePage;
