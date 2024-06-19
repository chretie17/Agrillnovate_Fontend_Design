import axios from 'axios';

const API_URL = 'http://localhost:8080/api/feedbacks';

// Function to get the token from local storage or any other storage mechanism you are using
const getToken = () => {
    return localStorage.getItem('authToken');
};

export const createComment = async (commentData) => {
    try {
        const token = getToken();
        const headers = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.post(`${API_URL}/comments`, commentData, { headers });
        return response.data;
    } catch (error) {
        console.error('Error creating comment', error);
        throw error;
    }
};

export const createFeedback = async (feedbackData) => {
    try {
        const token = getToken();
        const headers = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.post(`${API_URL}/feedback`, feedbackData, { headers });
        return response.data;
    } catch (error) {
        console.error('Error creating feedback', error);
        throw error;
    }
};

export const getCommentsByResearchID = async (researchID) => {
    try {
        const response = await axios.get(`${API_URL}/comments/${researchID}`);
        return response.data; // This should now be an array of comments
    } catch (error) {
        console.error('Error fetching comments', error);
        throw error;
    }
};
