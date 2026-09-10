import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMovies = async (limit = 10) => {
  const response = await api.get(`/posts?_limit=${limit}`);
  return response.data;
};

export const addMovieApi = async (movieData) => {
  const response = await api.post('/posts', movieData);
  return response.data;
};

export const updateMovieApi = async (id, movieData) => {
  const response = await api.put(`/posts/${id}`, movieData);
  return response.data;
};

export const deleteMovieApi = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export default api;
