import React, { useEffect, useState } from 'react';
import ForumService from '../services/ForumService';
import PostForm from './PostForm';

const ThreadComponent = ({ threadId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    ForumService.subscribeToThreadPosts(threadId, (newPost) => {
      setPosts((prevPosts) => [...prevPosts, newPost]);
    });
    ForumService.getPosts(threadId).then((response) => {
      setPosts(response.data);
    });
  }, [threadId]);

  return (
    <div>
      <h2>Thread {threadId}</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.content}</li>
        ))}
      </ul>
      <PostForm onNewPost={(content) => ForumService.createPost(threadId, content)} />
    </div>
  );
};

export default ThreadComponent;
