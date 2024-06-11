import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import UsersTable from './UsersTable';
import ResearchTable from './ResearchTable';
import FeedbackTable from './FeedbackTable';
import ForumsTable from './ForumsTable';
import NotificationsTable from './NotificationsTable';
import { getUsers, getResearch, getFeedback, getForums, getNotifications } from '../services/AdminService';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [research, setResearch] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [forums, setForums] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const researchData = await getResearch();
        const feedbackData = await getFeedback();
        const forumsData = await getForums();
        const notificationsData = await getNotifications();

        console.log("Fetched users:", usersData);
        console.log("Fetched research:", researchData);
        console.log("Fetched feedback:", feedbackData);
        console.log("Fetched forums:", forumsData);
        console.log("Fetched notifications:", notificationsData);

        setUsers(usersData);
        setResearch(researchData);
        setFeedback(feedbackData);
        setForums(forumsData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Users
              </Typography>
              {users.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No users available</Typography>
              ) : (
                <UsersTable users={users} />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Research
              </Typography>
              <ResearchTable research={research} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Feedback
              </Typography>
              <FeedbackTable feedback={feedback} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Forums
              </Typography>
              <ForumsTable forums={forums} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <NotificationsTable notifications={notifications} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
