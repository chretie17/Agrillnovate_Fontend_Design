import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import UsersTable from './UsersTable';
import ResearchTable from './ResearchTable';
import FeedbackTable from './FeedbackTable';
import ThreadsTable from './forumstables/ThreadsTable';
import PostsTable from './forumstables/PostsTable';
import AnalyticsChart from './AnalyticsChart';
import CommentsTable from './CommentsTable';
import NotificationsList from './NotificationsList';
import {
  getUsers,
  getResearch,
  getFeedback,
  getThreads,
  getPosts,
  getComments,
} from '../services/AdminService';

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: 4,
    backgroundColor: '#fff',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
  },
  notificationButtonContainer: {
    position: 'relative',
  },
  notificationButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [research, setResearch] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [threads, setThreads] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const researchData = await getResearch();
        const feedbackData = await getFeedback();
        const threadsData = await getThreads();
        const postsData = await getPosts();
        const commentsData = await getComments();

        setUsers(usersData);
        setResearch(researchData);
        setFeedback(feedbackData);
        setThreads(threadsData);
        setPosts(postsData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div className={classes.notificationButtonContainer}>
        <NotificationsList />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                Analytics
              </Typography>
              <AnalyticsChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                Users
              </Typography>
              {users.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No users available
                </Typography>
              ) : (
                <UsersTable users={users} />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                Research
              </Typography>
              <ResearchTable research={research} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                Feedback
              </Typography>
              <FeedbackTable feedback={feedback} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                Threads
              </Typography>
              <ThreadsTable threads={threads} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                Posts
              </Typography>
              <PostsTable posts={posts} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                Comments
              </Typography>
              <CommentsTable comments={comments} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
