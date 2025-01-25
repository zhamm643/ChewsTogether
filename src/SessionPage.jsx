import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SessionPage() {
  const [sessionLink, setSessionLink] = useState('https://example.com/session/abc123');
  const navigate = useNavigate();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sessionLink)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy link: ', err);
      });
  };

  const handleGoToSwiping = () => {
    // Navigate to swiping page
    navigate('/swiping');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Stacks elements vertically
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Centers content horizontally
        height: '100vh', // Ensures full viewport height
        width: '100vw', // Ensures full viewport width
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Your Session
      </Typography>

      <Typography variant="body1" paragraph>
        Share this link with a friend or partner to start swiping together:
      </Typography>

      <TextField
        fullWidth
        color='info'
        variant='outlined'
        margin="normal"
        value={sessionLink}
        InputProps={{
          readOnly: true,
          style: { color: '#FFFFFF' }, // Custom color for the link
        }}
        sx={{
          minWidth: '300px', // Ensures it doesn't get too narrow
          maxWidth: '20%', // Allows it to be responsive to the screen size
        }}
      />

      <Button
        variant="outlined"
        onClick={handleCopyLink}
        sx={{ mb: 2 }}
      >
        Copy Link
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGoToSwiping}
      >
        Go to Swiping
      </Button>
    </Box>
  );
}

export default SessionPage;
