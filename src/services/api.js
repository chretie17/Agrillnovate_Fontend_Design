import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
});

// Set auth token function


export const loginUser = async (credentials) => {
  const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
  return response.data;
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
// Register user function
export const registerUser = async (user) => {
  try {
    const response = await api.post('/api/users/register', user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Check if email exists function
export const checkEmailExists = async (email) => {
  try {
    const response = await api.get(`/api/users/check-email`, {
      params: { email }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const checkPhoneExists = async (phone) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/check-phone_exists`, {
      params: { phone }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Add other API calls as needed

export default api;
