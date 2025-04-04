import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Navbar.css";
import companyLogo from "../../assets/images/Cp.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo and Text */}
      <div className="logo-container">
        <img src={companyLogo} alt="Company Logo" className="logo" />
        <p className="logo-text">Thrive</p>
      </div>

      {/* Authentication Buttons */}
      <div className="auth-buttons">
        <Link to="/login">
          <button className="login-btn">Log in</button>
        </Link>
        <Link to="/signup">
          <button className="register-btn">Get started</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
