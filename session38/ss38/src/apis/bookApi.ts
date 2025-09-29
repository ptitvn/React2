import axios from 'axios';
import type { Book } from '../components/types';

const BASE_URL = 'http://localhost:8080/books';

export const fetchBooks = async (): Promise<Book[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
  const res = await axios.post(BASE_URL, book); 
  return res.data;
};

export const updateBook = async (book: Book): Promise<Book> => {
  const res = await axios.put(`${BASE_URL}/${book.id}`, book);
  return res.data;
};

export const deleteBook = async (id: string): Promise<string> => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
};