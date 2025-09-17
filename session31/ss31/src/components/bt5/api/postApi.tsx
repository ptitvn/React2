import axios from 'axios';

const API_URL = 'http://localhost:3000/posts';

export const getPosts = () => axios.get(API_URL);
export const updatePost = (id: number, data: any) =>
  axios.put(`http://localhost:3000/posts/${id}`, data);