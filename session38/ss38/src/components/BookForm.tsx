import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import type { Book } from './types';

interface Props {
  open: boolean;
  initial?: Partial<Book>;
  onClose: () => void;
  onSubmit: (data: Book | Omit<Book, 'id'>) => void;
  existingTitles: string[];
}

const BookForm: React.FC<Props> = ({
  open,
  initial = {},
  onClose,
  onSubmit,
  existingTitles,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const titleRef = useRef<HTMLInputElement>(null);

  // ✅ Reset form khi mở modal hoặc khi đổi sang edit cuốn khác
  useEffect(() => {
    if (open) {
      setTitle(initial.title ?? '');
      setAuthor(initial.author ?? '');
      setYear(initial.year ?? new Date().getFullYear());
      setCategory(initial.category ?? '');
      setErrors({});
    }
  }, [open, initial?.id]);

  // ✅ Validate đầu vào
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Tiêu đề sách không được để trống';
    } else if (
      !initial.id &&
      existingTitles.includes(title.trim().toLowerCase())
    ) {
      newErrors.title = 'Tiêu đề sách không được trùng';
    }

    if (!author.trim()) {
      newErrors.author = 'Tên tác giả không được để trống';
    }

    if (year === '' || Number(year) <= 0) {
      newErrors.year = 'Năm xuất bản phải lớn hơn 0 và không được để trống';
    }

    if (!category.trim()) {
      newErrors.category = 'Thể loại không được để trống';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.title && titleRef.current) {
        titleRef.current.focus();
      }
      return false;
    }

    return true;
  };

  // ✅ Gửi dữ liệu nếu hợp lệ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (initial.id) {
      // ✏️ Edit mode → gửi đủ Book có id
      const updatedBook: Book = {
        id: initial.id,
        title: title.trim(),
        author: author.trim(),
        year: Number(year),
        category: category.trim(),
      };
      onSubmit(updatedBook);
    } else {
      // ➕ Add mode → gửi Omit<Book, 'id'> (không có id)
      const newBook: Omit<Book, 'id'> = {
        title: title.trim(),
        author: author.trim(),
        year: Number(year),
        category: category.trim(),
      };
      onSubmit(newBook);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initial.id ? 'Edit Book' : 'Add Book'}</DialogTitle>
        <DialogContent className="flex flex-col gap-4 pt-2">
          <TextField
            label="Tiêu đề sách"
            value={title}
            inputRef={titleRef}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
          />
          <TextField
            label="Tên tác giả"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            error={!!errors.author}
            helperText={errors.author}
            fullWidth
          />
          <TextField
            label="Năm xuất bản"
            type="number"
            value={year === '' ? '' : String(year)}
            onChange={(e) => setYear(Number(e.target.value))}
            error={!!errors.year}
            helperText={errors.year}
            fullWidth
          />
          <TextField
            label="Thể loại"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            error={!!errors.category}
            helperText={errors.category}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initial.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookForm;
