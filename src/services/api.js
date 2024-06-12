import axios from 'axios';

const API_URL = 'https://articlebackend.onrender.com/api';

export const getArticles = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/articles`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const createArticle = async (article, token) => {
    console.log(article)
  try {
    const response = await axios.post(`${API_URL}/articles`, article, {
      headers: {
        Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};
