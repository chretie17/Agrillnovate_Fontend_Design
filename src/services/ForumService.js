import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { sendMessage, getStompClient } from './WebSocketService';

const API_URL = 'http://localhost:8080/api/forums';

// Function to get JWT token from local storage
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Function to decode JWT token and get the user ID
const getUserIdFromToken = () => {
  const token = getToken();
  if (!token) throw new Error('No auth token found');
  
  const decodedToken = jwtDecode(token);
  return decodedToken.userId; // Assuming the token contains a 'userId' field
};

class ForumService {
  getThreads() {
    return axios.get(`${API_URL}/threads`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }

  async createThread(title) {
    const userId = getUserIdFromToken();
    return axios.post(`${API_URL}/threads`, { title, userId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }

  getPosts(threadId) {
    return axios.get(`${API_URL}/threads/${threadId}/posts`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }

  async createPost(threadId, content) {
    const userId = getUserIdFromToken();
    return axios.post(`${API_URL}/threads/${threadId}/posts`, { content, userId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }

  subscribeToThreadPosts(threadId, callback) {
    const stompClient = getStompClient();
    if (stompClient && stompClient.connected) {
      stompClient.subscribe(`/topic/thread/${threadId}`, (message) => {
        const post = JSON.parse(message.body);
        callback(post);
      });
    } else {
      console.error('WebSocket connection not established.');
    }
  }
}

export default new ForumService();
