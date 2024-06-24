import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResearchById } from '../services/PublicServices';
import { createComment, createFeedback, getCommentsByResearchID } from '../services/FeedbackService';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import {
  Drawer, Button, TextField, Typography, Paper, Grid, Avatar, Container, Snackbar, Alert, Fab, Tooltip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import '../index.css';

const ResearchDetail = () => {
  const { id } = useParams();
  const [research, setResearch] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackDrawerOpen, setFeedbackDrawerOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchResearchDetails();
    fetchComments();
  }, [id]);

  const fetchResearchDetails = async () => {
    try {
      const data = await getResearchById(id);
      setResearch(data);
    } catch (error) {
      console.error('Error fetching research details', error);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await getCommentsByResearchID(id);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments', error);
      setComments([]);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const commentData = {
        content: newComment,
        email: email,
        phone: phone,
        name: name,
        researchID: id,
        dateSubmitted: new Date(),
      };
      await createComment(commentData);
      setNewComment('');
      setPhone('');
      setEmail('');
      setName('');
      fetchComments();
      setSnackbarMessage('Comment submitted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error submitting comment', error);
      setSnackbarMessage('Error submitting comment');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      const feedbackData = {
        content: feedback,
        researchID: id,
        dateSubmitted: new Date(),
      };
      await createFeedback(feedbackData);
      setFeedbackDrawerOpen(false);
      setFeedback('');
      setSnackbarMessage('Feedback submitted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error submitting feedback', error);
      setSnackbarMessage('Error submitting feedback');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
      {research ? (
        <>
          <Paper sx={{ padding: 3, marginBottom: 4 }}>
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <img
                src={`data:image/jpeg;base64,${research.images[0].image}`}
                alt={research.title}
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                }}
              >
                {research.title}
              </Typography>
            </div>
            <Typography variant="h6" gutterBottom>
              By: {research.author}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {research.content}
            </Typography>
            <div style={{ height: '400px', width: '100%', marginBottom: 20 }}>
              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={{ height: '100%', width: '100%' }}
                  center={{ lat: research.latitude, lng: research.longitude }}
                  zoom={15}
                >
                  <MarkerF position={{ lat: research.latitude, lng: research.longitude }} />
                </GoogleMap>
              </LoadScript>
            </div>
          </Paper>
          <Paper sx={{ padding: 3, marginBottom: 4 }}>
            <Typography variant="h5" gutterBottom>
              Comments
            </Typography>
            {comments.length > 0 ? (
              <Grid container direction="column" spacing={2}>
                {comments.map((comment, index) => (
                  <Grid item key={index}>
                    <Paper sx={{ padding: 2, marginBottom: 2 }}>
                      <Grid container alignItems="center">
                        <Avatar sx={{ marginRight: 2 }}>
                          {comment.name[0].toUpperCase()}
                        </Avatar>
                        <div>
                          <Typography variant="body1">{comment.content}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {comment.name} - {new Date(comment.dateSubmitted).toLocaleDateString()}
                          </Typography>
                        </div>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No comments yet. Be the first to comment!
              </Typography>
            )}
            <div className="mt-6 space-y-4">
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                label="Phone"
                fullWidth
                margin="normal"
                value={phone}
                onChange={handlePhoneChange}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                label="New Comment"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={newComment}
                onChange={handleCommentChange}
              />
              <Button
                onClick={handleCommentSubmit}
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Comment
              </Button>
            </div>
          </Paper>
          <Tooltip title="Submit Feedback" aria-label="submit feedback">
            <Fab
              color="secondary"
              aria-label="add"
              onClick={() => setFeedbackDrawerOpen(true)}
              sx={{ position: 'fixed', right: 20, bottom: 20 }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <Drawer
            anchor="right"
            open={feedbackDrawerOpen}
            onClose={() => setFeedbackDrawerOpen(false)}
          >
            <div style={{ width: 300, padding: 20 }}>
              <Typography variant="h6" gutterBottom>
                Submit Feedback
              </Typography>
              <TextField
                label="Feedback"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={feedback}
                onChange={handleFeedbackChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleFeedbackSubmit}
                style={{ marginTop: 20 }}
                fullWidth
              >
                Submit
              </Button>
            </div>
          </Drawer>
        </>
      ) : (
        <Typography variant="h5" align="center" color="textSecondary">
          Loading...
        </Typography>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ResearchDetail;
