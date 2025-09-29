import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookSearchSortFilter from './components/BookSearchSortFilter';
import type { Book } from './components/types';

import type { RootState, AppDispatch } from './store/store';
import {
  getBooks,
  createBook,
  editBook,
  removeBook,
} from './store/bookSlice';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.data);
  const loading = useSelector((state: RootState) => state.books.loading);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Book> | undefined>();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'year'>('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const [openDelete, setOpenDelete] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const categories = useMemo(
    () => Array.from(new Set(books.map((b) => b.category))).sort(),
    [books]
  );

  const existingTitles = useMemo(
    () => books.map((b) => b.title.toLowerCase()),
    [books]
  );

  const filteredSorted = useMemo(() => {
    let out = books.slice();
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }
    if (category !== 'all') {
      out = out.filter((b) => b.category === category);
    }

    out.sort((a, b) => {
      if (sortBy === 'title') {
        const r = a.title.localeCompare(b.title);
        return sortDir === 'asc' ? r : -r;
      } else {
        const r = a.year - b.year;
        return sortDir === 'asc' ? r : -r;
      }
    });

    return out;
  }, [books, search, category, sortBy, sortDir]);

  const handleSubmit = (data: {
    id?: string;
    title: string;
    author: string;
    year: number;
    category: string | number;
  }) => {
    if (data.id) {
      const payload: Book = {
        id: data.id,
        title: data.title.trim(),
        author: data.author.trim(),
        year: data.year,
        category: String(data.category).trim(),
      };
      dispatch(editBook(payload));
    } else {
      const newBook = {
        title: data.title.trim(),
        author: data.author.trim(),
        year: data.year,
        category: String(data.category).trim(),
      };
      dispatch(createBook(newBook));
    }

    setOpenForm(false);
    setEditing(undefined);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      dispatch(removeBook(bookToDelete));
      setBookToDelete(null);
    }
    setOpenDelete(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📚 Book Library Manager</h1>

      <Button
        variant="contained"
        onClick={() => {
          setEditing(undefined);
          setOpenForm(true);
        }}
      >
        ADD BOOK
      </Button>

      <div className="mt-4">
        <BookSearchSortFilter
          search={search}
          category={category}
          sortBy={sortBy}
          sortDir={sortDir}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={(by, dir) => {
            setSortBy(by);
            setSortDir(dir);
          }}
          onClear={() => {
            setSearch('');
            setCategory('all');
            setSortBy('title');
            setSortDir('asc');
          }}
        />
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <CircularProgress />
          </div>
        ) : (
          <BookList
            books={filteredSorted}
            onEdit={(b) => {
              setEditing(b);
              setOpenForm(true);
            }}
            onDelete={(id) => {
              setBookToDelete(id);
              setOpenDelete(true);
            }}
          />
        )}
      </div>

      <BookForm
        open={openForm}
        initial={editing}
        onClose={() => {
          setOpenForm(false);
          setEditing(undefined);
        }}
        onSubmit={handleSubmit}
        existingTitles={existingTitles}
      />

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa sách này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default App;
