import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import AdminDashboard from './admin/AdminDashboard';
import ManageUsers from './admin/ManageUsers';
import ManageResearch from './admin/ResearchTables/ManageResearch';
import NotificationComponent from './components/NotificationComponent';
import ManageForums from './admin/ManageForums';
import Managenotifications from './admin/AdminNotifications';
import ManageFeedbacks from './admin/ManageFeedbacks';
import ExpertDashboard from './expert/ExpertDashboard';
import FarmerDashboard from './Dashboard/FarmerDashboard';
import CommunityDashboard from './Dashboard/CommunityDashboard';
import ResearchManagement from './researchManagement/ResearchManagement';
import Forums from './forum/forums';
import ThreadComponent from './forum/ThreadComponent';
import NotificationsPopup from './components/NotificationsPopup';
import Login from './auth/login';
import Signup from './auth/Signup';
import Homepage from './Homepage/home';
import ResearchDetail from './components/ResearchDetail';
import Feedback from './researchManagement/Feedback';
import ManageMyResearch from './expert/ManagemyResearch';
import ExpertAddResearch from './expert/AddResearch';
import ExpertUpdateResearch from './expert/UpdateResearch';
import AdminAddResearch from './admin/ResearchTables/AdminAddResearch';
import AgriculturalResearch from './PublicPages/AgricultureResearchs';
import AdminUpdateResearch from './admin/ResearchTables/AdminUpdateResearch';
import { setAuthToken } from './services/api';

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    if (token && role && name) {
      setAuthToken(token);
      setIsAuthenticated(true);
      setUserRole(role);
      setUserName(name);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserRole('');
    setUserName('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Sidebar 
        userRole={userRole} 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
        userName={userName} 
      />
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login setAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/research/:id" element={<ResearchDetail />} />
          <Route path="/agricultureresearch" element={<AgriculturalResearch />} />

          <Route path="/forums" element={<Forums isAuthenticated={isAuthenticated} />} />
          <Route path="/threads/:threadId" element={<ThreadComponent isAuthenticated={isAuthenticated} />} />
          <Route path="/research" element={<ResearchManagement />} />
          {isAuthenticated ? (
            <>
              {userRole === 'ROLE_ADMIN' && (
                <>
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/manage-users" element={<ManageUsers />} />
                  <Route path="/admin/manage-research" element={<ManageResearch />} />
                  <Route path="/admin/manage-forums" element={<ManageForums />} />
                  <Route path="/admin/manage-feedbacks" element={<ManageFeedbacks />} />
                  <Route path="/admin/manage-notifications" element={<Managenotifications />} />
                  <Route path="/admin/add-research" element={<AdminAddResearch />} />
                  <Route path="/admin/update-research/:id" element={<AdminUpdateResearch />} />
                </>
              )}
              {userRole === 'ROLE_EXPERT' && (
                <>
                  <Route path="/expert/add-research" element={<ExpertAddResearch />} />
                  <Route path="/expert/update-research/:id" element={<ExpertUpdateResearch />} />
                  <Route path="/expert-dashboard" element={<ExpertDashboard />} />
                  <Route path="/expert/manage-my-research" element={<ManageMyResearch />} />
                </>
              )}
              {userRole === 'ROLE_FARMER' && <Route path="/farmer-dashboard" element={<FarmerDashboard />} />}
              {userRole === 'ROLE_COMMUNITYMEMBER' && <Route path="/community-dashboard" element={<CommunityDashboard />} />}
              <Route path="/notifications" element={<NotificationsPopup />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
