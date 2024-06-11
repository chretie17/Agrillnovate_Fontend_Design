import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8080/api';

// Function to get JWT token from local storage
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Function to decode JWT token and get the email
const getEmailFromToken = () => {
  const token = getToken();
  if (!token) throw new Error('No auth token found');
  
  const decodedToken = jwtDecode(token);
  return decodedToken.sub; // Assuming the token contains a 'sub' field with the user's email
};

// Function to get user ID from backend using email
const getUserId = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/users/id`, { params: { email } });
    return response.data;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    throw error;
  }
};

export const getQuickStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats/quick`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quick stats', error);
    throw error;
  }
};

export const getResearchProjectsByExpert = async () => {
  try {
    const email = getEmailFromToken();
    const userId = await getUserId(email);
    const response = await axios.get(`${API_URL}/research/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching research projects', error);
    throw error;
  }
};

export const getNotifications = async () => {
  try {
    const email = getEmailFromToken();
    const userId = await getUserId(email);
    const response = await axios.get(`${API_URL}/notifications/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications', error);
    throw error;
  }
};

export const updateResearchProject = async (id, formValues, newImages) => {
  const formData = new FormData();
  formData.append('research', new Blob([JSON.stringify(formValues)], { type: 'application/json' }));
  if (newImages.length > 0) {
    Array.from(newImages).forEach(file => formData.append('images', file));
  }

  try {
    const response = await axios.put(`${API_URL}/research/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating research project', error);
    throw error;
  }
};

export const deleteResearchProject = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/research/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting research project', error);
    throw error;
  }
};