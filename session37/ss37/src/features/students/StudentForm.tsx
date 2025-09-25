import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { Student } from './types';

interface Props {
  open: boolean;
  initial?: Partial<Student>;
  onClose: () => void;
  onSubmit: (data: { id?: string; name: string; age: number; grade: string }) => void;
  existingNames: string[]; // danh sách tên sinh viên hiện có
}

const StudentForm: React.FC<Props> = ({
  open,
  initial,
  onClose,
  onSubmit,
  existingNames,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(16);
  const [grade, setGrade] = useState('');
  const [errors, setErrors] = useState({ name: '', age: '', grade: '' });

  useEffect(() => {
    setName(initial?.name ?? '');
    setAge(initial?.age ?? 16);
    setGrade(initial?.grade ?? '');
    setErrors({ name: '', age: '', grade: '' });
  }, [initial, open]);

  const validate = () => {
    const newErrors = { name: '', age: '', grade: '' };
    const trimmedName = name.trim();
    const trimmedGrade = grade.trim();

    if (!trimmedName) {
      newErrors.name = 'Tên không được bỏ trống';
    } else {
      const isDuplicate =
        existingNames.includes(trimmedName) &&
        trimmedName !== initial?.name;
      if (isDuplicate) {
        newErrors.name = 'Tên không được trùng';
      }
    }

    if (!age || age <= 0) {
      newErrors.age = 'Tuổi không hợp lệ';
    }

    if (!trimmedGrade) {
      newErrors.grade = 'Lớp học không được bỏ trống';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      id: initial?.id,
      name: name.trim(),
      age: Number(age),
      grade: grade.trim(),
    });

    // Reset form sau khi submit
    setName('');
    setAge(16);
    setGrade('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initial?.id ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <DialogContent className="flex flex-col gap-4 pt-2">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            autoFocus
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            fullWidth
            inputProps={{ min: 1 }}
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            label="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            fullWidth
            placeholder="e.g. 10A1"
            error={!!errors.grade}
            helperText={errors.grade}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initial?.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentForm;