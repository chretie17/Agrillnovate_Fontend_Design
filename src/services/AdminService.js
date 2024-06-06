import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin';

// Set up the authorization token
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Get all users
const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

// Create a new user
const createUser = async (user) => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

// Update a user
const updateUser = async (id, userDetails) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userDetails);
  return response.data;
};

// Delete a user
const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
};

// Research services
const getResearch = async () => {
  const response = await axios.get(`${API_URL}/research`);
  return response.data;
};

const createResearch = async (research, image) => {
  const formData = new FormData();
  formData.append('research', new Blob([JSON.stringify(research)], { type: 'application/json' }));
  if (image) {
    formData.append('image', image);
  }
  const response = await axios.post(`${API_URL}/research`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const getResearchById = async (id) => {
  const response = await axios.get(`${API_URL}/research/${id}`);
  return response.data;
};

const updateResearch = async (id, researchDetails, image) => {
  const formData = new FormData();
  formData.append('research', new Blob([JSON.stringify(researchDetails)], { type: 'application/json' }));
  if (image) {
    formData.append('image', image);
  }
  const response = await axios.put(`${API_URL}/research/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const deleteResearch = async (id) => {
  await axios.delete(`${API_URL}/research/${id}`);
};


// Get all feedback
const getFeedback = async () => {
  const response = await axios.get(`${API_URL}/feedback`);
  return response.data;
};

// Create feedback
const createFeedback = async (feedback) => {
  const response = await axios.post(`${API_URL}/feedback`, feedback);
  return response.data;
};

// Update feedback
const updateFeedback = async (id, feedbackDetails) => {
  const response = await axios.put(`${API_URL}/feedback/${id}`, feedbackDetails);
  return response.data;
};

// Delete feedback
const deleteFeedback = async (id) => {
  await axios.delete(`${API_URL}/feedback/${id}`);
};

// Get all forums
const getForums = async () => {
  const response = await axios.get(`${API_URL}/forums`);
  return response.data;
};

// Create a new forum
const createForum = async (forum) => {
  const response = await axios.post(`${API_URL}/forums`, forum);
  return response.data;
};

// Update forum
const updateForum = async (id, forumDetails) => {
  const response = await axios.put(`${API_URL}/forums/${id}`, forumDetails);
  return response.data;
};

// Delete forum
const deleteForum = async (id) => {
  await axios.delete(`${API_URL}/forums/${id}`);
};

// Get all notifications
const getNotifications = async () => {
  const response = await axios.get(`${API_URL}/notifications`);
  return response.data;
};

// Create a new notification
const createNotification = async (notification) => {
  const response = await axios.post(`${API_URL}/notifications`, notification);
  return response.data;
};

// Update notification
const updateNotification = async (id, notificationDetails) => {
  const response = await axios.put(`${API_URL}/notifications/${id}`, notificationDetails);
  return response.data;
};

// Delete notification
const deleteNotification = async (id) => {
  await axios.delete(`${API_URL}/notifications/${id}`);
};

export {
  setAuthToken,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getResearch,
  createResearch,
  getResearchById,
  updateResearch,
  deleteResearch,
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getForums,
  createForum,
  updateForum,
  deleteForum,
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification
};
