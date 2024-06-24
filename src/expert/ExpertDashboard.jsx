import React, { useEffect, useState, useCallback } from 'react';
import {
  Container, Grid, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Avatar,
  ListItemAvatar, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Card, CardMedia, Drawer, Badge, Box,
  Alert
} from '@mui/material';
import { Edit, Delete, Notifications } from '@mui/icons-material';
import {
  getResearchProjectsByExpert, getNotifications, updateResearchProject, deleteResearchProject,
  getCommentsStats, getFeedbackStats, getCommentsByResearchId, getFeedbackByResearchId
} from '../services/ExpertServices';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { connectWebSocket, disconnectWebSocket } from '../services/WebSocketService';
import useGoogleMapsLoader from '../hooks/useGoogleMapsLoader'; // Import the custom hook

const containerStyle = {
  width: '100%',
  height: '300px'
};

const center = {
  lat: -1.94407,
  lng: 30.0619
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ExpertDashboard = () => {
  const [researchProjects, setResearchProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [feedbackStats, setFeedbackStats] = useState([]);
  const [commentsStats, setCommentsStats] = useState([]);
  const [comments, setComments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formValues, setFormValues] = useState({ title: '', author: '', content: '', latitude: '', longitude: '' });
  const [newImages, setNewImages] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [updateError, setUpdateError] = useState('');

  const { isLoaded, loadError } = useGoogleMapsLoader(); // Use the custom hook

  useEffect(() => {
    fetchResearchProjects();
    fetchNotifications();
    fetchCommentsStats();
    fetchFeedbackStats();
    connectWebSocket(handleNotificationReceived);

    return () => {
      disconnectWebSocket();
    };
  }, []);

  const fetchResearchProjects = async () => {
    try {
      const data = await getResearchProjectsByExpert();
      setResearchProjects(data);
      if (data.length > 0) {
        handleProjectSelect(data[0]); // Select the first project by default
      }
    } catch (error) {
      console.error('Error fetching research projects', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications', error);
    }
  };

  const fetchCommentsStats = async () => {
    try {
      const data = await getCommentsStats();
      setCommentsStats(data);
    } catch (error) {
      console.error('Error fetching comments stats', error);
    }
  };

  const fetchFeedbackStats = async () => {
    try {
      const data = await getFeedbackStats();
      setFeedbackStats(data);
    } catch (error) {
      console.error('Error fetching feedback stats', error);
    }
  };

  const fetchCommentsAndFeedback = async (researchId) => {
    try {
      const commentsData = await getCommentsByResearchId(researchId);
      setComments(commentsData || []);
      const feedbackData = await getFeedbackByResearchId(researchId);
      setFeedbacks(feedbackData || []);
    } catch (error) {
      console.error('Error fetching comments and feedback', error);
    }
  };

  const handleNotificationReceived = (message) => {
    setNotifications((prevNotifications) => [message, ...prevNotifications]);
  };

  const handleEditOpen = (project) => {
    setSelectedProject(project);
    setFormValues({
      title: project.title,
      author: project.author,
      content: project.content,
      latitude: project.latitude,
      longitude: project.longitude
    });
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedProject(null);
    setFormValues({ title: '', author: '', content: '', latitude: '', longitude: '' });
    setNewImages([]);
    setUpdateError('');
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (event) => {
    setNewImages(event.target.files);
  };

  const handleMapClick = (event) => {
    setFormValues({
      ...formValues,
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng()
    });
  };

  const handleUpdate = async () => {
    if (!newImages.length) {
      setUpdateError('Please add new images for the update to work.');
      return;
    }

    if (validateForm()) {
      if (selectedProject) {
        try {
          await updateResearchProject(selectedProject.researchID, formValues, newImages);
          fetchResearchProjects();
          handleEditClose();
        } catch (error) {
          console.error('Error updating research project', error);
        }
      }
    }
  };

  const validateForm = () => {
    const { title, author, content, latitude, longitude } = formValues;
    if (!title || !author || !content || !latitude || !longitude) {
      alert('All fields are required');
      return false;
    }
    if (isNaN(latitude) || isNaN(longitude)) {
      alert('Latitude and Longitude must be valid numbers');
      return false;
    }
    return true;
  };

  const handleDelete = async (id) => {
    try {
      await deleteResearchProject(id);
      fetchResearchProjects();
    } catch (error) {
      console.error('Error deleting research project', error);
    }
  };

  const displayNewImages = () => {
    const imageUrls = Array.from(newImages).map(file => URL.createObjectURL(file));
    return imageUrls.map((url, index) => (
      <Card key={index} sx={{ maxWidth: '100%' }}>
        <CardMedia
          component="img"
          height="300"
          image={url}
          alt={`New Research Image ${index + 1}`}
        />
      </Card>
    ));
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    fetchCommentsAndFeedback(project.researchID);
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Expert Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid item>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <Badge badgeContent={notifications.length} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
        </Grid>
      </Grid>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 350, padding: 2 }}>
          <Typography variant="h6">Notifications</Typography>
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index}>
                <ListItemText primary={notification.message} secondary={notification.timestamp} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Comments Overview</Typography>
            <BarChart width={500} height={300} data={commentsStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="researchTitle" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="commentCount" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Feedback Overview</Typography>
            <PieChart width={500} height={300}>
              <Pie
                data={feedbackStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {feedbackStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">My Published Research Projects</Typography>
            <List>
              {researchProjects.map((project, index) => (
                <ListItem key={index} onClick={() => handleProjectSelect(project)} button>
                  <ListItemAvatar>
                    <Avatar>{project.title.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${project.researchID}: ${project.title}`} secondary={`Author: ${project.author}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditOpen(project)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(project.researchID)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Comments on My Research</Typography>
            <List>
              {Array.isArray(comments) && comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemText primary={comment.content} secondary={`Research ID: ${comment.researchID}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Feedback on My Research</Typography>
            <List>
              {Array.isArray(feedbacks) && feedbacks.map((feedback, index) => (
                <ListItem key={index}>
                  <ListItemText primary={feedback.content} secondary={`Research ID: ${feedback.researchID}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Research Project</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {updateError && <Alert severity="error">{updateError}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={formValues.title}
                onChange={handleFormChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author"
                name="author"
                value={formValues.author}
                onChange={handleFormChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Content"
                name="content"
                value={formValues.content}
                onChange={handleFormChange}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Latitude"
                name="latitude"
                value={formValues.latitude}
                onChange={handleFormChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Longitude"
                name="longitude"
                value={formValues.longitude}
                onChange={handleFormChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: parseFloat(formValues.latitude) || center.lat, lng: parseFloat(formValues.longitude) || center.lng }}
                zoom={10}
                onClick={handleMapClick}
              >
                <Marker position={{ lat: parseFloat(formValues.latitude) || center.lat, lng: parseFloat(formValues.longitude) || center.lng }} />
              </GoogleMap>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="upload-images">
                <input
                  style={{ display: 'none' }}
                  id="upload-images"
                  name="upload-images"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                />
                <Button variant="contained" color="primary" component="span">
                  Upload New Images
                </Button>
              </label>
            </Grid>
            {selectedProject?.images && selectedProject.images.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Current Image:
                </Typography>
                <Card sx={{ maxWidth: '100%' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`data:image/jpeg;base64,${selectedProject.images[0].image}`}
                    alt="Current Research Image"
                  />
                </Card>
              </Grid>
            )}
            {newImages.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  New Images:
                </Typography>
                {displayNewImages()}
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExpertDashboard;
