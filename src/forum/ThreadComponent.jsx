import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ForumService from '../services/ForumService';
import { Container, Typography, Paper, TextField, Button, Box } from '@mui/material';

const ThreadComponent = ({ isAuthenticated }) => {
  const { threadId } = useParams();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [userNames, setUserNames] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await ForumService.getPosts(threadId);
        const postsData = response.data;
        setPosts(postsData);

        const userIds = [...new Set(postsData.map(post => post.userId))];
        const userNamesMap = {};
        for (let userId of userIds) {
          const user = await ForumService.getUserById(userId);
          userNamesMap[userId] = user.name;
        }
        setUserNames(userNamesMap);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch posts', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [threadId]);

  const handlePostSubmit = async () => {
    try {
      await ForumService.createPost(threadId, newPost);
      setNewPost('');
      const response = await ForumService.getPosts(threadId);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2" className="mb-4">Thread Details</Typography>
      <Paper elevation={3} className="p-4 mb-4 bg-gray-50">
        {posts.length === 0 ? (
          <Typography>No comments yet</Typography>
        ) : (
          posts.map((post, index) => (
            <Box key={index} className="mb-4">
              <Typography>{post.content}</Typography>
              {isAuthenticated && (
                <Typography variant="caption" className="text-gray-500">
                  Posted by: {userNames[post.userId]}
                </Typography>
              )}
            </Box>
          ))
        )}
      </Paper>
      {isAuthenticated && (
        <Box>
          <TextField
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            fullWidth
            placeholder="Type your message"
            className="mb-4"
          />
          <Button variant="contained" color="primary" onClick={handlePostSubmit}>
            Post
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ThreadComponent;
