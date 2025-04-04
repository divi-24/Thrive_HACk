import React from "react";
import { Link } from "react-router-dom";
import { FaExchangeAlt } from "react-icons/fa";
import "../../assets/css/Navbar.css";
import companyLogo from "../../assets/images/Cp.png";

const Navbar = () => {
  const handleToggleClick = () => {
    // Replace this URL with the actual deployed link when provided
    window.location.href = "https://thriveai.vercel.app/"; // This will be replaced with the actual URL
  };

  return (
    <nav className="navbar">
      {/* Logo and Text */}
      <div className="logo-container">
        <img src={companyLogo} alt="Company Logo" className="logo" />
        <p className="logo-text">Thrive</p>
      </div>

      {/* Navigation and Authentication Buttons */}
      <div className="nav-buttons">
        <button className="toggle-btn" onClick={handleToggleClick}>
          <i><FaExchangeAlt /></i>
          <span>Thrive AI</span>
        </button>
        <div className="auth-buttons">
          <Link to="/login">
            <button className="login-btn">Log in</button>
          </Link>
          <Link to="/signup">
            <button className="register-btn">Get started</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
