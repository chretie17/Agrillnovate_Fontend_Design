import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const getUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error("No auth token found");

    const response = await axios.get(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const updateUserProfile = async (userDetails) => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error("No auth token found");

    const response = await axios.put(`${API_URL}/profile`, userDetails, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export default {
    getUserProfile,
    updateUserProfile,
};