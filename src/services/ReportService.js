import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reports';

export const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
};

/**
 * Fetches the report data including counts for various entities.
 */
export const getReport = async () => {
  try {
    const response = await axios.get(`${API_URL}/report`);
    console.log('Report data:', response.data); // Log report data
    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error;
  }
};

/**
 * Fetches the count of comments per day.
 */
export const getCommentsPerDay = async () => {
  try {
    const response = await axios.get(`${API_URL}/comments-per-day`);
    console.log('Comments per day data:', response.data); // Log comments per day data
    return response.data;
  } catch (error) {
    console.error('Error fetching comments per day:', error);
    throw error;
  }
};

/**
 * Fetches the count of feedback per day.
 */
export const getFeedbackPerDay = async () => {
  try {
    const response = await axios.get(`${API_URL}/feedback-per-day`);
    console.log('Feedback per day data:', response.data); // Log feedback per day data
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback per day:', error);
    throw error;
  }
};

/**
 * Fetches the feedback data for a specific date.
 * @param {string} date - The date to fetch feedback for (format: YYYY-MM-DD).
 */
export const getFeedbackByDate = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/feedback-by-date`, {
      params: { date },
    });
    console.log(`Feedback data for ${date}:`, response.data); // Log feedback data for specific date
    return response.data;
  } catch (error) {
    console.error(`Error fetching feedback for date ${date}:`, error);
    throw error;
  }
};

/**
 * Fetches the comments data for a specific date.
 * @param {string} date - The date to fetch comments for (format: YYYY-MM-DD).
 */
export const getCommentsByDate = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/comments-by-date`, {
      params: { date },
    });
    console.log(`Comments data for ${date}:`, response.data); // Log comments data for specific date
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for date ${date}:`, error);
    throw error;
  }
};

// Add any other necessary API calls below...
