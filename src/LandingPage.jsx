import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to session page or perform session creation logic here
    navigate('/session');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // This stacks the children vertically
        justifyContent: 'center', // Vertically center the content
        alignItems: 'center', // Horizontally center the content
        height: '100vh', // Use full viewport height
        width: '100vw', // Use full viewport width
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
      Stop Arguing, Start Eating
      </Typography>
      <Typography variant="h6" paragraph>
      Decide where to eat with your partner or friends instantly. 
      No downloads, no logins — just share a link and swipe.      
      </Typography>
      <Button variant="contained" color="primary" size="large" onClick={handleGetStarted}>
        Get Started
      </Button>
    </Box>
  );
};

export default LandingPage;
