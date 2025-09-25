import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Student } from './types';
import * as api from './studentApi';

export const fetchStudents = createAsyncThunk('students/fetch', api.getStudents);
export const createStudent = createAsyncThunk('students/create', api.addStudent);
export const editStudent = createAsyncThunk('students/edit', api.updateStudent);
export const removeStudent = createAsyncThunk('students/remove', api.deleteStudent);

interface State {
  list: Student[];
  loading: boolean;
}

const initialState: State = {
  list: [],
  loading: false,
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.list = state.list.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;