// src/services/PublicServices.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/public';

export const getAllResearch = async () => {
  try {
    const response = await axios.get(`${API_URL}/research`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all research', error);
    throw error;
  }
};

export const getResearchById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/research/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching research by ID', error);
    throw error;
  }
};
