import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchBlogs = () => API.get('/blogs');
export const fetchBlog = (id: string) => API.get(`/blogs/${id}`);
export const createBlog = (blog: { title: string; content: string; author: string }) =>
  API.post('/blogs', blog);
export const deleteBlog = (id: string) => API.delete(`/blogs/${id}`);
