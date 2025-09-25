import axios from 'axios';
import type { Student } from './types';

const BASE_URL = 'http://localhost:8080';

export const getStudents = async (): Promise<Student[]> => {
  const res = await axios.get(`${BASE_URL}/students`);
  return res.data;
};

export const addStudent = async (student: Omit<Student, 'id'>) => {
  const res = await axios.post(`${BASE_URL}/students`, student);
  return res.data;
};

export const updateStudent = async (student: Student) => {
  const res = await axios.put(`${BASE_URL}/students/${student.id}`, student);
  return res.data;
};

export const deleteStudent = async (id: string) => {
  await axios.delete(`${BASE_URL}/students/${id}`);
  return id;
};