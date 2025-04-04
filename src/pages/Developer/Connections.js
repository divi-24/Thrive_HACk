import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../assets/css/Developer/Connections.css";
import { FaLinkedin, FaGithub, FaGlobe, FaEnvelope, FaPhone, FaCheck, FaTimes, FaUndo, FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../../components/Header";
import { io } from 'socket.io-client';



// Connect to the WebSocket server
const socket = io("https://thrive-xbzt.onrender.com", {  
  transports: ["websocket"], 
  reconnectionAttempts: 5, // Retry up to 5 times if disconnected
  reconnectionDelay: 3000 // wait for 3 seconds before retrying
});

const LoadingSkeleton = () => (
  <div className="connection-card skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-text title"></div>
    <div className="skeleton-text subtitle"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-button"></div>
  </div>
);

const Connections = () => {
  const [connections, setConnections] = useState({
    connectionRequests: [],
    requested: [],
    matched: []
  });
  const [activeTab, setActiveTab] = useState('connectionRequests');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animateCard, setAnimateCard] = useState(null);

  // Fetch connections on component mount
  useEffect(() => {
    const loggedInDeveloperId = localStorage.getItem("developerId");
    if (loggedInDeveloperId) {
      socket.emit("joinRoom", loggedInDeveloperId); // Join the WebSocket room
    }

    if (!socket.connected) {
      socket.connect();
    }
    fetchConnections();  // Initial fetch when component mounts

    
  }, []);

  // Fetch Developer Connections from API
  const fetchConnections = async () => {
    try {
      const loggedInDeveloperId = localStorage.getItem("developerId");  
      
      const response = await axios.get('https://thrive-xbzt.onrender.com/api/developer/connections', {
        headers: {
          "developer-id": loggedInDeveloperId
        }
      });

      setConnections(response.data);

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching connections");
      setLoading(false);
    }
  };

  // Handle Connection Actions (Accept, Reject, Cancel)
  const handleConnectionAction = async (targetDeveloperId, action) => {
    try {
      setAnimateCard(targetDeveloperId);
      const loggedInDeveloperId = localStorage.getItem("developerId");

      await new Promise(resolve => setTimeout(resolve, 300)); // Wait for animation

      const response = await axios.put('https://thrive-xbzt.onrender.com/api/developer/connections', {
        targetDeveloperId,
        action
      }, {
        headers: {
          "developer-id": loggedInDeveloperId
        }
      });
      console.log(response.data.message);

      // Refresh the connection list after action
      fetchConnections();
      setAnimateCard(null);
    } catch (err) {
      console.error('Error updating connection:', err.response?.data?.message || err.message);
      setAnimateCard(null);
    }
  };

  // Render connection cards based on active tab
  const renderConnections = () => {
    const currentConnections = connections[activeTab];
    
    if (!currentConnections || currentConnections.length === 0) {
      return <p className="no-connections">No connections in this category.</p>;
    }

    return currentConnections.map((dev) => (
      <div 
        key={dev.developerId} 
        className={`connection-card ${activeTab === 'matched' ? 'matched' : ''} ${animateCard === dev.developerId ? 'animate-out' : ''}`}
      >
        {/* Status Indicator */}
        <div className={`status-indicator ${activeTab === 'matched' ? 'status-matched' : 'status-pending'}`}>
          {activeTab === 'matched' ? 'Connected' : activeTab === 'requested' ? 'Pending' : 'Request'}
        </div>
        
        {/* Profile Section */}
        <div className="profile-left">
          {dev.profilePhoto ? (
            <img 
              src={`https://thrive-xbzt.onrender.com${dev.profilePhoto}`} 
              alt={dev.fullName} 
              className="profile-photo-connections" 
            />
          ) : (
            <FaUserCircle className="default-profile-icon-connections" />
          )}
          
          <h4>{dev.fullName}</h4>
          <p className="current-role">{dev.professionalDetails?.currentJob || "Role not specified"}</p>
          
          {/* Skills Tags */}
          {dev.professionalDetails?.skills && dev.professionalDetails.skills.length > 0 && (
            <div className="skills-tags">
              {dev.professionalDetails.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
              {dev.professionalDetails.skills.length > 3 && (
                <span className="skill-tag more">+{dev.professionalDetails.skills.length - 3}</span>
              )}
            </div>
          )}
          
          {/* Location */}
          {dev.location && (
            <p className="location">
              <FaMapMarkerAlt className="icon" /> {dev.location}
            </p>
          )}
          
          {/* Social Links */}
          <div className="social-links">
            {dev.linkedIn && (
              <a href={dev.linkedIn} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
            )}
            {dev.github && (
              <a href={dev.github} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
            )}
            {dev.portfolio && (
              <a href={dev.portfolio} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGlobe />
              </a>
            )}
          </div>
        </div>

        {/* Contact Info (Only for matched connections) */}
        {activeTab === 'matched' && (
          <div className="contact-info">
            <div className="contact-info-row">
              <FaEnvelope className="icon" />
              <p>{dev.email}</p>
            </div>
            <div className="contact-info-row">
              <FaPhone className="icon" />
              <p>{dev.phoneNumber}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          {activeTab === 'connectionRequests' && (
            <>
              <button onClick={() => handleConnectionAction(dev.developerId, 'accept')} className="accept-btn">
                <FaCheck /> Accept
              </button>
              <button onClick={() => handleConnectionAction(dev.developerId, 'reject')} className="reject-btn">
                <FaTimes /> Reject
              </button>
            </>
          )}
          {activeTab === 'requested' && (
            <button 
              onClick={() => handleConnectionAction(dev.developerId, 'cancelRequest')} 
              className="cancel-btn"
              title="Cancel Request"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>
    ));
  };
  

  if (loading) {
    return (
      <div className="connections-container loading">
        <Header />
        <div className="connections-tabs loading">
          <button>
            Connection Requests
            <span className="tab-badge">0</span>
          </button>
          <button>
            Requested
            <span className="tab-badge">0</span>
          </button>
          <button>
            Matched Developers
            <span className="tab-badge">0</span>
          </button>
        </div>
        <div className="connections-list">
          {[1, 2, 3].map((i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <Header />
        {error}
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header />
      </div>
  
      <div className="connections-container">
        <div className="connections-tabs">
          <button
            className={activeTab === 'connectionRequests' ? 'active-tab' : ''}
            onClick={() => setActiveTab('connectionRequests')}
          >
            Connection Requests
            <span className="tab-badge">{connections.connectionRequests.length}</span>
          </button>
          <button
            className={activeTab === 'requested' ? 'active-tab' : ''}
            onClick={() => setActiveTab('requested')}
          >
            Requested
            <span className="tab-badge">{connections.requested.length}</span>
          </button>
          <button
            className={activeTab === 'matched' ? 'active-tab' : ''}
            onClick={() => setActiveTab('matched')}
          >
            Matched Developers
            <span className="tab-badge">{connections.matched.length}</span>
          </button>
        </div>
  
        {/* Display corresponding connections */}
        <div className="connections-list">
          {renderConnections()}
        </div>
      </div>
    </div>
  );
  
};

export default Connections;
