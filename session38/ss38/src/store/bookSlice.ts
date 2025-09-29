import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Book } from '../components/types';
import * as api from '../apis/bookApi';

interface BookState {
  data: Book[];
  loading: boolean;
}

const initialState: BookState = {
  data: [],
  loading: false,
};

export const getBooks = createAsyncThunk('books/getBooks', async () => {
  return await api.fetchBooks();
});

export const createBook = createAsyncThunk(
  'books/createBook',
  async (book: Omit<Book, 'id'>) => {
    return await api.addBook(book);
  }
);

export const editBook = createAsyncThunk(
  'books/editBook',
  async (book: Book) => {
    return await api.updateBook(book);
  }
);

export const removeBook = createAsyncThunk(
  'books/removeBook',
  async (id: string) => {
    await api.deleteBook(id);
    return id;
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.data.unshift(action.payload); 
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.data = state.data.map((b) =>
          b.id === action.payload.id ? action.payload : b
        );
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.data = state.data.filter((b) => b.id !== action.payload);
      });
  },
});

export default bookSlice.reducer;