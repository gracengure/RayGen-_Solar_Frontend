import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import './Navbar.css';

const HomePage = ({ cartCount}) => {
  return (
    <div className="page-wrapper">
      <nav className="nav">
        <div className="nav-logo">
          <img  alt="RayGen Solar Solutions" className="logo-image" />
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/cart">
              <ShoppingCart className="nav-icon"  />
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
       
      </main>
    </div>
  );
};

export default HomePage;