import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaHome, FaUser, FaResearchgate, FaForumbee, FaChartPie, FaSignInAlt, FaUserPlus, FaBars } from 'react-icons/fa';
import './Sidebar.css';
import { connect } from '../services/WebSocketService';

const Sidebar = ({ userRole, isAuthenticated, onLogout, userName }) => {
  const [localUserRole, setLocalUserRole] = useState(userRole);
  const [localIsAuthenticated, setLocalIsAuthenticated] = useState(isAuthenticated);
  const [localUserName, setLocalUserName] = useState(userName);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setLocalUserRole(userRole);
    setLocalIsAuthenticated(isAuthenticated);
    setLocalUserName(userName);

    if (isAuthenticated) {
      connect(onMessageReceived, 'notifications');
    }
  }, [userRole, isAuthenticated, userName]);

  const onMessageReceived = (notification) => {
    setNotifications((prevNotifications) => [notification, ...prevNotifications]);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2>Agrillnovate</h2>
        </div>
        <ul className="sidebar-list">
          {!localIsAuthenticated && (
            <>
              <li><Link to="/home"><FaHome /> Home</Link></li>
              <li><Link to="/public-knowledge"><FaResearchgate /> Public Knowledge</Link></li>
              <li><Link to="/agricultureresearch"><FaChartPie /> Agriculture Research</Link></li>
              <li><Link to="/forums"><FaForumbee /> Forums</Link></li>
              <li><Link to="/infographics"><FaChartPie /> Infographics</Link></li>
            </>
          )}
          {localIsAuthenticated ? (
            <>
              {localUserRole === 'ROLE_ADMIN' && (
                <>
                  <li><Link to="/admin-dashboard"><FaHome /> Admin Dashboard</Link></li>
                  <li><Link to="/admin/manage-users"><FaUser /> Manage Users</Link></li>
                  <li><Link to="/admin/manage-research"><FaResearchgate /> Manage Research</Link></li>
                  <li><Link to="/admin/manage-forums"><FaForumbee /> Manage Forums</Link></li>
                  <li><Link to="/admin/manage-feedbacks"><FaChartPie /> Manage Feedbacks</Link></li>
                  <li><Link to="/admin/AllCommentsAndFeedbacks"><FaBell /> All Feedbacks and COmments</Link></li>
                </>
              )}
              {localUserRole === 'ROLE_EXPERT' && (
                <>
                  <li><Link to="/expert-dashboard"><FaResearchgate /> Dashboard</Link></li>
                  <li><Link to="/expert/add-research"><FaResearchgate /> Publish Your Research</Link></li>
                  <li><Link to="/expert/manage-my-research"><FaChartPie /> Manage Research</Link></li>
                  <li><Link to="/profile"><FaUser /> Profile</Link></li>
                </>
              )}
              {(localUserRole === 'ROLE_FARMER' || localUserRole === 'ROLE_COMMUNITYMEMBER') && (
                <>
                  <li><Link to="/home"><FaHome /> Home</Link></li>
                  <li><Link to="/public-knowledge"><FaResearchgate /> Public Knowledge</Link></li>
                  <li><Link to="/agricultureresearch"><FaChartPie /> Agriculture Research</Link></li>
                  <li><Link to="/forums"><FaForumbee /> Forums</Link></li>
                  <li><Link to="/infographics"><FaChartPie /> Infographics</Link></li>
                  {localUserRole === 'ROLE_FARMER' && (
                    <>
                      <li><Link to="/farmer-dashboard"><FaHome /> Farmer Dashboard</Link></li>
                      <li><Link to="/profile"><FaUser /> Profile</Link></li>
                    </>
                  )}
                  {localUserRole === 'ROLE_COMMUNITYMEMBER' && (
                    <>
                      <li><Link to="/community-dashboard"><FaHome /> Community Dashboard</Link></li>
                      <li><Link to="/profile"><FaUser /> Profile</Link></li>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <li style={{ marginTop: 'auto' }}><Link to="/login"><FaSignInAlt /> Login</Link></li>
              <li><Link to="/signup"><FaUserPlus /> Signup</Link></li>
            </>
          )}
        </ul>
        {localIsAuthenticated && (
          <div className="sidebar-bottom">
            <div className="notification-icon" onClick={toggleNotifications}>
              <FaBell />
              {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
            </div>
            {showNotifications && (
              <div className="notification-popup">
                <ul>
                  {notifications.slice(0, 3).map((notification, index) => (
                    notification && notification.message ? (
                      <li key={index}>
                        {notification.message}
                      </li>
                    ) : null
                  ))}
                  {notifications.length > 3 && (
                    <li>
                      <Link to="/notifications">See more</Link>
                    </li>
                  )}
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
    </>
  );
};

export default Sidebar;
