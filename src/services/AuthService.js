// src/services/AuthService.js
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'authToken';

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getEmailFromToken = () => {
  const token = getToken();
  if (!token) throw new Error('No auth token found');
  
  const decodedToken = jwtDecode(token);
  return decodedToken.sub; // Assuming the token contains a 'sub' field with the user's email
};
