import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import StudentSearchSortFilter from './features/students/StudentSearchSortFilter';
import StudentList from './features/students/StudentList';
import StudentForm from './features/students/StudentForm';
import type { RootState, AppDispatch } from './features/students/store';
import {
  fetchStudents,
  createStudent,
  editStudent,
  removeStudent,
} from './features/students/studentSlice';
import type { Student } from './features/students/types';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const students = useSelector((state: RootState) => state.students.list);
  const loading = useSelector((state: RootState) => state.students.loading);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Student> | undefined>(undefined);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'age'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Load dữ liệu từ server khi khởi động
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Lấy danh sách lớp học để lọc
  const grades = useMemo(() => {
    return Array.from(new Set(students.map((s) => s.grade))).sort();
  }, [students]);

  // Mở form thêm mới
  const handleAddClick = () => {
    setEditing(undefined);
    setOpenForm(true);
  };

  // Xử lý submit form (thêm hoặc sửa)
  const handleSubmit = (data: { id?: string; name: string; age: number; grade: string }) => {
    if (data.id) {
      dispatch(editStudent(data as Student));
    } else {
      dispatch(createStudent(data));
    }
    setOpenForm(false);
  };

  // Mở form chỉnh sửa
  const handleEdit = (s: Student) => {
    setEditing(s);
    setOpenForm(true);
  };

  // Mở modal xác nhận xóa
  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
  };

  // Xác nhận xóa sinh viên
  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      dispatch(removeStudent(confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  // Reset bộ lọc
  const handleClearFilters = () => {
    setSearch('');
    setGradeFilter('all');
    setSortBy('name');
    setSortDir('asc');
  };

  // Lọc và sắp xếp danh sách sinh viên
  const filteredSorted = useMemo(() => {
    let out = students.slice();

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter((s) => s.name.toLowerCase().includes(q));
    }

    if (gradeFilter !== 'all') {
      out = out.filter((s) => s.grade === gradeFilter);
    }

    out.sort((a, b) => {
      if (sortBy === 'name') {
        const r = a.name.localeCompare(b.name);
        return sortDir === 'asc' ? r : -r;
      } else {
        const r = a.age - b.age;
        return sortDir === 'asc' ? r : -r;
      }
    });

    return out;
  }, [students, search, gradeFilter, sortBy, sortDir]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🎓 Student Manager</h1>

      <div className="flex gap-4 mb-4">
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add Student
        </Button>
      </div>

      <StudentSearchSortFilter
        search={search}
        gradeFilter={gradeFilter}
        sortBy={sortBy}
        sortDir={sortDir}
        grades={grades}
        onSearchChange={setSearch}
        onGradeChange={setGradeFilter}
        onSortChange={(by, dir) => {
          setSortBy(by);
          setSortDir(dir);
        }}
        onClear={handleClearFilters}
      />

      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center py-10">
            <CircularProgress />
          </div>
        ) : (
          <StudentList
            students={filteredSorted}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      <StudentForm
        open={openForm}
        initial={editing}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        existingNames={students
          .filter((s) => s.id !== editing?.id)
          .map((s) => s.name)}
      />

      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
        <DialogTitle>Xác nhận xóa học sinh?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;