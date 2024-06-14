import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { sendMessage, getStompClient } from './WebSocketService';

const API_URL = 'http://localhost:8080/api/forums';
const USER_API_URL = 'http://localhost:8080/api/users';

const getToken = () => {
  return localStorage.getItem('authToken');
};

const getUserDetailsFromToken = () => {
  const token = getToken();
  if (!token) throw new Error('No auth token found');
  
  const decodedToken = jwtDecode(token);
  console.log('Decoded Token:', decodedToken); // Debug log
  return { userId: decodedToken.userId, name: decodedToken.name };
};

class ForumService {
  getThreads() {
    return axios.get(`${API_URL}/threads`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }

  async createThread(title) {
    const { userId, name } = getUserDetailsFromToken();
    console.log('Creating Thread - User ID:', userId, 'Name:', name); // Debug log
    return axios.post(`${API_URL}/threads`, { title, userId, name }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }

  getPosts(threadId) {
    return axios.get(`${API_URL}/threads/${threadId}/posts`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }

  async createPost(threadId, content) {
    const { userId, name } = getUserDetailsFromToken();
    console.log('Creating Post - Thread ID:', threadId, 'User ID:', userId, 'Name:', name); // Debug log
    return axios.post(`${API_URL}/threads/${threadId}/posts`, { content, userId, name }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }

  async getUserById(userId) {
    console.log('Fetching User by ID:', userId); // Debug log
    const response = await axios.get(`${USER_API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    console.log('User Details:', response.data); // Debug log
    return response.data; // Ensure it returns the user object correctly
  }

  subscribeToThreadPosts(threadId, callback) {
    const stompClient = getStompClient();
    if (stompClient && stompClient.connected) {
      stompClient.subscribe(`/topic/thread/${threadId}`, (message) => {
        const post = JSON.parse(message.body);
        console.log('Received Post via WebSocket:', post); // Debug log
        callback(post);
      });
    } else {
      console.error('WebSocket connection not established.');
    }
  }
}

export default new ForumService();
