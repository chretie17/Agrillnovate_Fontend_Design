import React from 'react';
import { Container, Typography, Box, Button, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import '../index.css'; // Ensure you import the index.css

const Home = () => {
  return (
    <div>
      <AppBar position="static" className="bg-green-600">
        <Toolbar>
          <Typography variant="h6" className="text-white flex-grow">
            Agrillnovate
          </Typography>
          <Button color="inherit" component={Link} to="/research" className="text-white">
            Agricultural Research
          </Button>
          <Button color="inherit" component={Link} to="/login" className="text-white">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container className="flex justify-center items-center min-h-screen bg-hero-pattern bg-cover bg-center">
        <Box className="text-center bg-white bg-opacity-75 p-10 rounded-lg shadow-lg">
          <Typography variant="h2" className="text-green-800 font-bold" gutterBottom>
            Welcome to Agrillnovate
          </Typography>
          <Typography variant="h5" className="text-green-600 mb-6">
            Innovating Agriculture for a Better Future
          </Typography>
          <Button
            variant="contained"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            component={Link}
            to="/research"
          >
            Explore Research
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
