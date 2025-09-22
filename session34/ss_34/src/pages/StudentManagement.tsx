import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import type { Student } from '../utils/types';
import StudentList from '../components/StudentList';
import Toolbar from '../components/Toolbar';
import StudentForm from '../components/StudentForm';

const StudentManagement = () => {
  const students = useSelector((state: any) => state.students);
  const dispatch = useDispatch();

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleAddStudent = (student: Student) => {
    dispatch({ type: 'ADD_STUDENT', payload: student });
  };

  const handleUpdateStudent = (student: Student) => {
    dispatch({ type: 'UPDATE_STUDENT', payload: student });
    setEditingStudent(null); // reset form sau khi sửa
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_STUDENT', payload: id });
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleSearch = (keyword: string) => {
    dispatch({ type: 'SEARCH_STUDENT', payload: keyword });
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <Toolbar onSearch={handleSearch} />
        <StudentList
          students={students}
          onDelete={handleDelete}
          onEdit={handleEdit} 
        />
      </div>
      <StudentForm
        onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
        editingStudent={editingStudent} // 
      />
    </div>
  );
};

export default StudentManagement;