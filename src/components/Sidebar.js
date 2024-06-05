import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ userRole, isAuthenticated, onLogout, userName }) => {
  const [localUserRole, setLocalUserRole] = useState(userRole);
  const [localIsAuthenticated, setLocalIsAuthenticated] = useState(isAuthenticated);
  const [localUserName, setLocalUserName] = useState(userName);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setLocalUserRole(userRole);
    setLocalIsAuthenticated(isAuthenticated);
    setLocalUserName(userName);
  }, [userRole, isAuthenticated, userName]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {!localIsAuthenticated && (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/public-knowledge">Public Knowledge</Link></li>
            <li><Link to="/agriculture-research">Agriculture Research</Link></li>
            <li><Link to="/forums">Forums</Link></li>
            <li><Link to="/infographics">Infographics</Link></li>
          </>
        )}
        {localIsAuthenticated ? (
          <>
            {localUserRole === 'ROLE_ADMIN' && (
              <>
                <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                <li><Link to="/admin/manage-users">Manage Users</Link></li>
                <li><Link to="/admin/manage-research">Manage Research</Link></li>
                <li><Link to="/admin/manage-forums">Manage Forums</Link></li>
                <li><Link to="/admin/manage-feedbacks">Manage Feedbacks</Link></li>
              </>
            )}
            {localUserRole === 'ROLE_FARMER' && (
              <>
                <li><Link to="/farmer-dashboard">Farmer Dashboard</Link></li>
                <li><Link to="/research">Research</Link></li>
                <li><Link to="/forum">Forum</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </>
            )}
            {localUserRole === 'ROLE_EXPERT' && (
              <>
                <li><Link to="/expert/add-research">Add Research</Link></li>
                <li><Link to="/expert/manage-research">Manage Research</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </>
            )}
            {localUserRole === 'ROLE_COMMUNITYMEMBER' && (
              <>
                <li><Link to="/community-dashboard">Community Dashboard</Link></li>
                <li><Link to="/research">Research</Link></li>
                <li><Link to="/forum">Forum</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </>
            )}
          </>
        ) : (
          <>
            <li style={{ marginTop: 'auto' }}><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
      {localIsAuthenticated && (
        <div className="sidebar-bottom">
          <div className="notification-icon" onClick={toggleNotifications}>
            <FaBell />
          </div>
          {showNotifications && (
            <div className="notification-popup">
              <ul>
                <li>Notification 1</li>
                <li>Notification 2</li>
                <li>Notification 3</li>
              </ul>
            </div>
          )}
          <div className="user-info">
            <span>{localUserName}</span>
            <Link to="/profile">Profile</Link>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
