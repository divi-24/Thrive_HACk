import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHouseUser, FaUsers, FaBriefcase, FaLink, FaFileAlt, FaUserCircle } from "react-icons/fa";
import "../assets/css/Header.css";
import axios from "axios";
import companyLogo from "../assets/images/Cp.png";

const SettingsIcon = () => (
  <svg 
    className="settings-icon" 
    width="22" 
    height="22" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
      className="settings-center"
    />
    <path 
      d="M20.8891 9.5528C20.9288 9.85334 20.9288 10.1466 20.8891 10.4472L21.8033 11.4944C21.9255 11.6333 21.9255 11.8439 21.8033 11.9828L20.0033 14.9828C19.8811 15.1217 19.6834 15.1616 19.5172 15.0828L18.3289 14.4772C18.0547 14.6837 17.7608 14.8599 17.4516 15.0028L17.2066 16.2828C17.1744 16.4462 17.0303 16.5667 16.8625 16.5667H13.2625C13.0947 16.5667 12.9506 16.4462 12.9184 16.2828L12.6734 15.0028C12.3642 14.8599 12.0703 14.6837 11.7961 14.4772L10.6078 15.0828C10.4416 15.1616 10.2439 15.1217 10.1217 14.9828L8.32172 11.9828C8.19953 11.8439 8.19953 11.6333 8.32172 11.4944L9.23594 10.4472C9.19625 10.1466 9.19625 9.85334 9.23594 9.5528L8.32172 8.50557C8.19953 8.36666 8.19953 8.15613 8.32172 8.01722L10.1217 5.01722C10.2439 4.87831 10.4416 4.83844 10.6078 4.91722L11.7961 5.52275C12.0703 5.31629 12.3642 5.14009 12.6734 4.99722L12.9184 3.71722C12.9506 3.55378 13.0947 3.43333 13.2625 3.43333H16.8625C17.0303 3.43333 17.1744 3.55378 17.2066 3.71722L17.4516 4.99722C17.7608 5.14009 18.0547 5.31629 18.3289 5.52275L19.5172 4.91722C19.6834 4.83844 19.8811 4.87831 20.0033 5.01722L21.8033 8.01722C21.9255 8.15613 21.9255 8.36666 21.8033 8.50557L20.8891 9.5528Z" 
      className="settings-gear"
    />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const developerId = localStorage.getItem("developerId"); 
  const [profile, setProfile] = useState(null);

  // Fetch developer profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!developerId) return;
      try {
        const response = await axios.get("https://thrive-xbzt.onrender.com/api/developer/profile", {
          headers: { "developer-id": developerId },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [developerId]);

  return (
    <nav className="dashboard-nav">
      {/* Logo and Brand Section */}
      <div className="nav-logo-section" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img src={companyLogo} alt="Thrive Logo" className="nav-logo" />
        <span className="nav-brand">Thrive</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <button 
          onClick={() => navigate("/developer/dashboard")}
          className={location.pathname === "/developer/dashboard" ? "active" : ""}
        > 
          <FaHouseUser /> My Dashboard
        </button>

        <button 
          onClick={() => navigate("/developer/connect")}
          className={location.pathname === "/developer/connect" ? "active" : ""}
        >
          <FaUsers /> Connect with Developers
        </button>

        <button 
          onClick={() => navigate("/developer/apply")}
          className={location.pathname === "/developer/apply" ? "active" : ""}
        >
          <FaBriefcase /> Apply to Jobs
        </button>

        <button 
          onClick={() => navigate("/developer/connections")}
          className={location.pathname === "/developer/connections" ? "active" : ""}
        >
          <FaLink /> My Connections
        </button>

        <button 
          onClick={() => navigate("/developer/applications")}
          className={location.pathname === "/developer/applications" ? "active" : ""}
        >
          <FaFileAlt /> My Applications
        </button>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        {/* Profile Button */}
        <button 
          onClick={() => navigate("/developer/profile")}
          className="profile-btn"
        >
          {profile?.profilePhoto ? (
            <img 
              src={`https://thrive-xbzt.onrender.com${profile.profilePhoto}`} 
              alt="Profile" 
              className="profile-photo-header" 
            />
          ) : (
            <FaUserCircle className="default-profile-icon-header" />
          )}
        </button>

        {/* Settings Button */}
        <button 
          onClick={() => navigate("/developer/settings")}
          className="settings-btn"
          title="Settings"
        >
          <SettingsIcon />
        </button>
      </div>
    </nav>
  );
};

export default Header;