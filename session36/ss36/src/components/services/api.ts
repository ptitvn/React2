import axios from 'axios';

const BASE_URL = 'http://localhost:8080/tasks';

export const fetchTasks = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addTask = async (task: {
  title: string;
  priority: 'low' | 'medium' | 'high';
}) => {
  const newTask = {
    id: Date.now().toString(),
    title: task.title,
    priority: task.priority,
    completed: false,
  };
  const res = await axios.post(BASE_URL, newTask);
  return res.data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};

export const toggleTask = async (id: string, completed: boolean) => {
  await axios.patch(`${BASE_URL}/${id}`, { completed });
};