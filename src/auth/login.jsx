import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, setAuthToken } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import { Box, Button, Container, TextField, Typography, Avatar, CssBaseline, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="identifier"
              label="Email or Phone"
              name="identifier"
              autoComplete="identifier"
              autoFocus
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Paper>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
