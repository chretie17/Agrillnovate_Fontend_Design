import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForumService from '../services/ForumService';
import { Container, Typography, Paper, TextField, Button, Box } from '@mui/material';
import ThreadsList from './ThreadsList';

const Forums = ({ isAuthenticated }) => {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    ForumService.getThreads()
      .then((response) => {
        setThreads(response.data);
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Failed to load threads');
      });
  }, []);

  const handleCreateThread = () => {
    if (newThreadTitle) {
      ForumService.createThread(newThreadTitle)
        .then((response) => {
          setThreads([...threads, response.data]);
          setNewThreadTitle('');
        })
        .catch((error) => {
          setError(error.response?.data?.message || 'Failed to create thread');
        });
    }
  };

  const handleThreadSelect = (threadId) => {
    navigate(`/threads/${threadId}`);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Forum
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {isAuthenticated && (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Box display="flex" alignItems="center">
            <TextField
              fullWidth
              label="Thread title"
              value={newThreadTitle}
              onChange={(e) => setNewThreadTitle(e.target.value)}
            />
            <Button onClick={handleCreateThread} variant="contained" sx={{ marginLeft: 2 }}>
              Create Thread
            </Button>
          </Box>
        </Paper>
      )}
      <ThreadsList threads={threads} onThreadSelect={handleThreadSelect} />
    </Container>
  );
};

export default Forums;
