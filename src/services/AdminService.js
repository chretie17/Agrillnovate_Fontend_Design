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
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Create a new user
const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update a user
const updateUser = async (id, userDetails) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, userDetails);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Research services
const getResearch = async () => {
  try {
    const response = await axios.get(`${API_URL}/research`);
    return response.data;
  } catch (error) {
    console.error('Error fetching research:', error);
    throw error;
  }
};

const getResearchById = async (id) => {
  const response = await axios.get(`${API_URL}/research/${id}`);
  return response.data;
};

const updateResearch = async (id, researchData, images) => {
  const formData = new FormData();
  formData.append('research', new Blob([JSON.stringify(researchData)], { type: 'application/json' }));
  if (images) {
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
  }
  const response = await axios.put(`${API_URL}/research/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const createResearch = async (researchData, image) => {
  const formData = new FormData();
  formData.append('research', new Blob([JSON.stringify(researchData)], { type: 'application/json' }));
  if (image) {
    formData.append('images', image);
  }

  try {
    const response = await axios.post(`${API_URL}/research`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating research:', error);
    throw error;
  }
};

const deleteResearch = async (id) => {
  try {
    await axios.delete(`${API_URL}/research/${id}`);
  } catch (error) {
    console.error('Error deleting research:', error);
    throw error;
  }
};

// Get all feedback
const getFeedback = async () => {
  try {
    const response = await axios.get(`${API_URL}/feedback`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

const createFeedback = async (feedback) => {
  try {
    const response = await axios.post(`${API_URL}/feedback`, feedback);
    return response.data;
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw error;
  }
};

const updateFeedback = async (id, feedbackDetails) => {
  try {
    const response = await axios.put(`${API_URL}/feedback/${id}`, feedbackDetails);
    return response.data;
  } catch (error) {
    console.error('Error updating feedback:', error);
    throw error;
  }
};

const deleteFeedback = async (id) => {
  try {
    await axios.delete(`${API_URL}/feedback/${id}`);
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};

// Get all forums
const getForums = async () => {
  try {
    const response = await axios.get(`${API_URL}/forums`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forums:', error);
    throw error;
  }
};

const createForum = async (forum) => {
  try {
    const response = await axios.post(`${API_URL}/forums`, forum);
    return response.data;
  } catch (error) {
    console.error('Error creating forum:', error);
    throw error;
  }
};

const updateForum = async (id, forumDetails) => {
  try {
    const response = await axios.put(`${API_URL}/forums/${id}`, forumDetails);
    return response.data;
  } catch (error) {
    console.error('Error updating forum:', error);
    throw error;
  }
};

const deleteForum = async (id) => {
  try {
    await axios.delete(`${API_URL}/forums/${id}`);
  } catch (error) {
    console.error('Error deleting forum:', error);
    throw error;
  }
};

// Get all notifications
const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

const createNotification = async (notification) => {
  try {
    const response = await axios.post(`${API_URL}/notifications`, notification);
    return response.data;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

const updateNotification = async (id, notificationDetails) => {
  try {
    const response = await axios.put(`${API_URL}/notifications/${id}`, notificationDetails);
    return response.data;
  } catch (error) {
    console.error('Error updating notification:', error);
    throw error;
  }
};

const deleteNotification = async (id) => {
  try {
    await axios.delete(`${API_URL}/notifications/${id}`);
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
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
