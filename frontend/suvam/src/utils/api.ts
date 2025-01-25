import axios from 'axios';
import { backendURL } from '../backend';

const API = axios.create({ baseURL: `${backendURL}api`});

export const fetchBlogs = (blogType: string) => API.get(`/blogs?blogType=${blogType}`);
export const fetchBlog = (id: string) => API.get(`/blogs/${id}`);
export const createBlog = (blog: { title: string; content: string; author: string }) =>
  API.post('/blogs', blog);
export const deleteBlog = (id: string) => API.delete(`/blogs/${id}`);
