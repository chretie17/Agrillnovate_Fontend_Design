import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Avatar, ListItemAvatar } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getQuickStats, getResearchProjectsByExpert, getNotifications } from '../services/ExpertServices';

const ExpertDashboard = () => {
  const [researchProjects, setResearchProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({ ongoing: 0, published: 0, feedback: 0 });

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
                    <IconButton edge="end" aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpertDashboard;
