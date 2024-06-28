import axios from 'axios';

const API_URL = 'http://localhost:8080/api/research';

// Set the auth token for any request
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Get all research
const getAllResearch = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching research:', error);
    throw error;
  }
};

// Get research by ID
const getResearchById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching research with ID ${id}:`, error);
    throw error;
  }
};

// Create new research
const createResearch = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
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

// Update research
const updateResearch = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating research with ID ${id}:`, error);
    throw error;
  }
};

// Delete research
const deleteResearch = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting research with ID ${id}:`, error);
    throw error;
  }
};

// Get distinct categories from research
const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Create new category (if applicable)
const createCategory = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, { category });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export {
  setAuthToken,
  getAllResearch,
  getResearchById,
  createResearch,
  updateResearch,
  deleteResearch,
  getCategories,
  createCategory
};
