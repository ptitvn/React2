import axios from 'axios';

const API_URL = 'http://localhost:3000/posts';

export const getPosts = () => axios.get(API_URL);