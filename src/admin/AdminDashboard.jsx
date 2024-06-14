import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import UsersTable from './UsersTable';
import ResearchTable from './ResearchTable';
import FeedbackTable from './FeedbackTable';
import ThreadsTable from './forumstables/ThreadsTable';
import PostsTable from './forumstables/PostsTable';
import NotificationsTable from './NotificationsTable';
import { getUsers, getResearch, getFeedback, getThreads, getPosts } from '../services/AdminService';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [research, setResearch] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [threads, setThreads] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const researchData = await getResearch();
        const feedbackData = await getFeedback();
        const threadsData = await getThreads();
        const postsData = await getPosts();

        setUsers(usersData);
        setResearch(researchData);
        setFeedback(feedbackData);
        setThreads(threadsData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: 3, backgroundColor: theme.palette.primary.light }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Notifications
              </Typography>
              <NotificationsTable />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: 3, backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
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
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3, backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Research
              </Typography>
              <ResearchTable research={research} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3, backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Feedback
              </Typography>
              <FeedbackTable feedback={feedback} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3, backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Threads
              </Typography>
              <ThreadsTable threads={threads} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3, backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Posts
              </Typography>
              <PostsTable posts={posts} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
