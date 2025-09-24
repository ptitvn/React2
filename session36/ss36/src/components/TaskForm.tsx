import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from '@mui/material';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';

interface TaskFormProps {
  onAdd: (title: string, priority: 'low' | 'medium' | 'high') => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | ''>('medium');
  const [errors, setErrors] = useState<{ title?: string; priority?: string }>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const tasks = useSelector((state: RootState) => state.tasks);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = 'Tên công việc không được để trống';
    } else if (tasks.some((t) => t.title.toLowerCase() === title.toLowerCase())) {
      newErrors.title = 'Tên công việc đã tồn tại';
    }

    if (!priority) {
      newErrors.priority = 'Phải chọn độ ưu tiên';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      inputRef.current?.focus();
      return;
    }

    onAdd(title, priority as 'low' | 'medium' | 'high');
    setTitle('');
    setPriority('medium');
    setErrors({});
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 items-start bg-white p-4 rounded-2xl shadow-md"
    >
      <TextField
        label="Công việc mới"
        variant="outlined"
        size="small"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={!!errors.title}
        helperText={errors.title}
        inputRef={inputRef}
        className="flex-1"
      />
      <FormControl size="small" className="w-36" error={!!errors.priority}>
        <InputLabel>Ưu tiên</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          label="Ưu tiên"
        >
          <MenuItem value="low">Thấp</MenuItem>
          <MenuItem value="medium">Trung bình</MenuItem>
          <MenuItem value="high">Cao</MenuItem>
        </Select>
        {errors.priority && <FormHelperText>{errors.priority}</FormHelperText>}
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Thêm
      </Button>
    </form>
  );
};

export default TaskForm;