import React from 'react';
import { Container, Typography, Box, Button, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import '../index.css'; // Ensure you import the index.css

const Home = () => {
  return (
    <div>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Agrillnovate
          </Typography>
          <Button color="inherit" component={Link} to="/research">
            Agricultural Research
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container className="container">
        <Box className="hero-box">
          <Typography variant="h2" className="hero-title" gutterBottom>
            Welcome to Agrillnovate
          </Typography>
          <Typography variant="h5" className="hero-subtitle" gutterBottom>
            Innovating Agriculture for a Better Future
          </Typography>
          <Box mt={4}>
            <Button variant="contained" className="hero-button" component={Link} to="/research">
              Explore Research
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
