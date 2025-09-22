import {
  Button,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Student } from '../utils/types';

interface StudentFormProps {
  editingStudent?: Student | null;
}

const StudentForm: React.FC<StudentFormProps> = ({ editingStudent }) => {
  const dispatch = useDispatch();
  const students = useSelector((state: any) => state.students);
  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Student>({
    id: '',
    fullName: '',
    age: 0,
    gender: true,
    dateOfBirth: '',
    placeOfBirth: '',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Cập nhật form khi nhấn “Sửa”
  useEffect(() => {
    if (editingStudent) setForm(editingStudent);
  }, [editingStudent]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const today = new Date().toISOString().split('T')[0];

    if (!form.id.trim()) {
      newErrors.id = 'Mã sinh viên không được để trống';
    } else {
      const isDuplicateId = students.some(
        (s: Student) => s.id === form.id && s.id !== editingStudent?.id
      );
      if (isDuplicateId) newErrors.id = 'Mã sinh viên đã tồn tại';
    }

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Tên sinh viên không được để trống';
    } else {
      const isDuplicateName = students.some(
        (s: Student) => s.fullName === form.fullName && s.id !== editingStudent?.id
      );
      if (isDuplicateName) newErrors.fullName = 'Tên sinh viên đã tồn tại';
    }

    if (form.age <= 0) newErrors.age = 'Tuổi phải lớn hơn 0';
    if (!form.dateOfBirth || form.dateOfBirth > today) newErrors.dateOfBirth = 'Ngày sinh không hợp lệ';
    if (!form.placeOfBirth.trim()) newErrors.placeOfBirth = 'Nơi sinh không được để trống';
    if (!form.address.trim()) newErrors.address = 'Địa chỉ không được để trống';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'age'
          ? Number(value)
          : name === 'gender'
          ? value === 'true'
          : value,
    }));
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (editingStudent) {
      dispatch({ type: 'UPDATE_STUDENT', payload: form });
    } else {
      dispatch({ type: 'ADD_STUDENT', payload: form });
    }

    setForm({
      id: '',
      fullName: '',
      age: 0,
      gender: true,
      dateOfBirth: '',
      placeOfBirth: '',
      address: '',
    });

    setErrors({});
    inputRef.current?.focus();
  };

  return (
    <div className="w-1/3 p-4 border rounded-xl shadow">
      <h2 className="font-semibold mb-4">Thông Tin Sinh Viên</h2>
      <div className="flex flex-col gap-4">
        <TextField
          inputRef={inputRef}
          label="Mã sinh viên"
          name="id"
          value={form.id}
          onChange={handleChange}
          error={!!errors.id}
          helperText={errors.id}
          fullWidth
        />
        <TextField
          label="Họ và tên"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          fullWidth
        />
        <TextField
          label="Tuổi"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          error={!!errors.age}
          helperText={errors.age}
          fullWidth
        />
        <Select
          name="gender"
          value={String(form.gender)}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="true">Nam</MenuItem>
          <MenuItem value="false">Nữ</MenuItem>
        </Select>
        <TextField
          type="date"
          label="Ngày sinh"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Nơi sinh"
          name="placeOfBirth"
          value={form.placeOfBirth}
          onChange={handleChange}
          error={!!errors.placeOfBirth}
          helperText={errors.placeOfBirth}
          fullWidth
        />
        <TextField
          label="Địa chỉ"
          name="address"
          value={form.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default StudentForm;