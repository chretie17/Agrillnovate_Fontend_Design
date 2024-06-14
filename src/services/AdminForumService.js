import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin';

const getToken = () => {
    return localStorage.getItem('authToken');
};

class AdminForumService {
    getAllThreads() {
        return axios.get(`${API_URL}/forums/threads`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
    }

    createThread(threadData) {
        return axios.post(`${API_URL}/forums/threads`, threadData, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
    }

    updateThread(threadId, threadData) {
        return axios.put(`${API_URL}/forums/threads/${threadId}`, threadData, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
    }

    deleteThread(threadId) {
        return axios.delete(`${API_URL}/forums/threads/${threadId}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
    }

    getPostsByThreadId(threadId) {
        return axios.get(`${API_URL}/forums/threads/${threadId}/posts`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
    }

    createPost(threadId, postData) {
        return axios.post(`${API_URL}/forums/threads/${threadId}/posts`, postData, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
    }

    updatePost(postId, postData) {
        return axios.put(`${API_URL}/forums/posts/${postId}`, postData, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
    }

    deletePost(postId) {
        return axios.delete(`${API_URL}/forums/posts/${postId}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
    }
}

export default new AdminForumService();
