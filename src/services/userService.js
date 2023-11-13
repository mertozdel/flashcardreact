import axios from 'axios';

const API_URL = 'http://localhost:3000/api';


const getToken = () => localStorage.getItem('token');

export const listUsers = async () => {
  const config = {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  };
  return await axios.get(`${API_URL}/users`, config);
};

export const deleteUser = async (userId) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  };
  return await axios.delete(`${API_URL}/users/${userId}`, config);
};

export const updateUser = async (userId, userData) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, config);
    return response.data; 
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error; 
  }
};
