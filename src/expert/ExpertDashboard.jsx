import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Avatar, ListItemAvatar, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Card, CardMedia } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getQuickStats, getResearchProjectsByExpert, getNotifications, updateResearchProject, deleteResearchProject } from '../services/ExpertServices';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px'
};

const center = {
  lat: -1.94407,
  lng: 30.0619
};

const ExpertDashboard = () => {
  const [researchProjects, setResearchProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({ ongoing: 0, published: 0, feedback: 0 });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formValues, setFormValues] = useState({ title: '', author: '', content: '', latitude: '', longitude: '' });
  const [newImages, setNewImages] = useState([]);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAwSoEbsNk6EWrGdcaLPUxyp2FPUJ5eBQg'
  });

  useEffect(() => {
    fetchQuickStats();
    fetchResearchProjects();
    fetchNotifications();
  }, []);

  const fetchQuickStats = async () => {
    try {
      const data = await getQuickStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching quick stats', error);
    }
  };

  const fetchResearchProjects = async () => {
    try {
      const data = await getResearchProjectsByExpert();
      setResearchProjects(data);
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
    if (selectedProject) {
      try {
        await updateResearchProject(selectedProject.researchID, formValues, newImages);
        fetchResearchProjects();
        handleEditClose();
      } catch (error) {
        console.error('Error updating research project', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResearchProject(id);
      fetchResearchProjects();
    } catch (error) {
      console.error('Error deleting research project', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Expert Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Quick Stats</Typography>
            <Typography>Ongoing Research: {stats.ongoing}</Typography>
            <Typography>Published Papers: {stats.published}</Typography>
            <Typography>Pending Feedback: {stats.feedback}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Recent Activities</Typography>
            <List>
              {notifications.map((notification, index) => (
                <ListItem key={index}>
                  <ListItemText primary={notification.message} secondary={notification.date} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">My Published Research Projects</Typography>
            <List>
              {researchProjects.map((project, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{project.title.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={project.title} secondary={`Author: ${project.author}`} />
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
      </Grid>

      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Research Project</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
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
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{ lat: parseFloat(formValues.latitude) || center.lat, lng: parseFloat(formValues.longitude) || center.lng }}
                  zoom={10}
                  onClick={handleMapClick}
                >
                  <Marker position={{ lat: parseFloat(formValues.latitude) || center.lat, lng: parseFloat(formValues.longitude) || center.lng }} />
                </GoogleMap>
              )}
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
