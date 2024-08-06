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
export const approveUser = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/approve/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error approving user:', error);
    throw error;
  }
};
export const disableUser = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/disable/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error approving user:', error);
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

// Forum services
const getThreads = async () => {
  try {
    const response = await axios.get(`${API_URL}/forums/threads`);
    return response.data;
  } catch (error) {
    console.error('Error fetching threads', error);
    throw error;
  }
};

const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/forums/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts', error);
    throw error;
  }
};

// Get all notifications
const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications', error);
    throw error;
  }
};

export const getComments = async () => {
  const response = await axios.get(`${API_URL}/comments`);
  return response.data;
};



export const createComment = async (commentDTO) => {
  const response = await axios.post(`${API_URL}/comments`, commentDTO);
  return response.data;
};
// Public Knowledge services
export const getPublicKnowledge = async () => {
  const response = await axios.get(`${API_URL}/public-knowledge`);
  return response.data;
};

export const createPublicKnowledge = async (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content); // Ensure this is submitted as a string
  formData.append('image', data.image);
  formData.append('datePublished', data.datePublished);
  
  const response = await axios.post(`${API_URL}/public-knowledge`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updatePublicKnowledge = async (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content); // Ensure this is submitted as a string
  formData.append('image', data.image);
  formData.append('datePublished', data.datePublished);
  
  const response = await axios.put(`${API_URL}/public-knowledge/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
export const deletePublicKnowledge = async (id) => {
  const response = await axios.delete(`${API_URL}/public-knowledge/${id}`);
  return response.data;
};
// Infographic services
// Infographics
export const getInfographics = async () => {
  const response = await axios.get(`${API_URL}/infographics`);
  return response.data;
};

export const createInfographic = async (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('image', data.image);
  formData.append('description', data.description);
  const response = await axios.post(`${API_URL}/infographics`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateInfographic = async (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('image', data.image);
  formData.append('description', data.description);
  const response = await axios.put(`${API_URL}/infographics/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteInfographic = async (id) => {
  const response = await axios.delete(`${API_URL}/infographics/${id}`);
  return response.data;
};
export const getReport = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports`);
    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error;
  }
};
// Get all experts
export const getExperts = async () => {
  try {
    const response = await axios.get(`${API_URL}/experts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching experts:', error);
    throw error;
  }
};

// Get research by expert
export const getResearchByExpert = async (expertId) => {
  try {
    const response = await axios.get(`${API_URL}/expert-research/${expertId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching research by expert:', error);
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
  getThreads,
  getPosts,
  getNotifications
};
