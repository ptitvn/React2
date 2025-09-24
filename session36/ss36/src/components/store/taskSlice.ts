import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((t) => t.id !== action.payload);
    },setTasks: (_state, action: PayloadAction<Task[]>) => {
  return action.payload;
}
  },
});

export const { addTask, toggleTask, deleteTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;