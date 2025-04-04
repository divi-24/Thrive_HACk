import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import "../../assets/css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-sections">
          <div className="footer-section">
            <h3>Platform</h3>
            <ul>
              <li><Link to="#help">HelpDesk</Link></li>
              <li><Link to="#pricing">Pricing</Link></li>
              <li><Link to="#security">Security</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="#blog">Blog</Link></li>
              <li><Link to="#practices">Best Practices</Link></li>
              <li><Link to="#support">Support</Link></li>
              <li><Link to="#developers">Developers</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <ul>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram /> Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <p>© 2025 Thrive. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
