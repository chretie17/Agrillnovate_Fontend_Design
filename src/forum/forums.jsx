import React, { useEffect, useState } from 'react';
import { connect } from '../services/WebSocketService';
import ThreadsList from './ThreadsList';
import ThreadForm from './ThreadForm';
import ForumService from '../services/ForumService';
import PostForm from './PostForm';
import ChatModal from './ChatModal';
import '../App.css';

const Forums = () => {
  const [connected, setConnected] = useState(false);
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    connect(() => setConnected(true));

    ForumService.getThreads()
      .then((response) => {
        setThreads(response.data);
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Failed to load threads');
      });
  }, []);

  const handleThreadSelect = (threadId) => {
    setSelectedThread(threadId);
    ForumService.getPosts(threadId)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Failed to load posts');
      });
  };

  const handleNewThread = (title) => {
    ForumService.createThread(title)
      .then((response) => {
        setThreads([...threads, response.data]);
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Failed to create thread');
      });
  };

  const handleNewPost = (content) => {
    if (selectedThread) {
      ForumService.createPost(selectedThread, content)
        .then((response) => {
          setPosts([...posts, response.data]);
        })
        .catch((error) => {
          setError(error.response?.data?.message || 'Failed to create post');
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="forum-home text-center mb-8">
        <h1 className="text-4xl font-bold">Forum Home</h1>
      </div>
      {error && <p className="error text-center">{error}</p>}
      {connected ? (
        <>
          <div className="thread-form mb-4">
            <ThreadForm onNewThread={handleNewThread} />
          </div>
          <div className="thread-list mb-4">
            <ThreadsList threads={threads} onThreadSelect={handleThreadSelect} />
          </div>
          {selectedThread && (
            <div className="thread-details mb-4">
              <h2 className="text-2xl font-semibold mb-4">Thread {selectedThread}</h2>
              <ul className="list-disc pl-5">
                {posts.map((post) => (
                  <li key={post.postId} className="mb-2">{post.content}</li>
                ))}
              </ul>
              <PostForm onNewPost={handleNewPost} />
            </div>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => setIsChatOpen(true)}
          >
            Open Chat
          </button>
          {isChatOpen && <ChatModal onClose={() => setIsChatOpen(false)} />}
        </>
      ) : (
        <p>Connecting to WebSocket...</p>
      )}
    </div>
  );
};

export default Forums;
