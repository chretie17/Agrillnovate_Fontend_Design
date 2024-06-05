import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, setAuthToken } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const Login = ({ setAuthenticated, setUserRole }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ identifier, password });
      const token = response.token;

      if (token) {
        localStorage.setItem('authToken', token);
        setAuthToken(token);

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
        const userName = decodedToken.name;

        console.log("Decoded Token:", decodedToken);
        console.log("User Role:", userRole);

        // Set authenticated state and user role in AppRouter
        setAuthenticated(true);
        setUserRole(userRole);
        localStorage.setItem('userRole', userRole); // Ensure userRole is consistent
        localStorage.setItem('userName', userName); // Store user name

        toast.success('Login successful! Redirecting...');
        
        setTimeout(() => {
          switch (userRole) {
            case 'ROLE_ADMIN':
              navigate('/admin-dashboard');
              break;
            case 'ROLE_EXPERT':
              navigate('/expert-dashboard');
              break;
            case 'ROLE_FARMER':
              navigate('/farmer-dashboard');
              break;
            case 'ROLE_COMMUNITYMEMBER':
              navigate('/community-dashboard');
              break;
            default:
              navigate('/dashboard');
          }
        }, 1000);
      } else {
        toast.error('Login failed: Invalid token received');
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed: Incorrect identifier or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Email or Phone"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
