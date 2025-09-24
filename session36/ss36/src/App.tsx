import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterControls from './components/FilterControls';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import type { RootState } from './components/store/store';
import {
  fetchTasks,
  addTask as apiAdd,
  deleteTask as apiDelete,
  toggleTask as apiToggle,
} from './components/services/api';
import {
  addTask,
  deleteTask,
  toggleTask,
  setTasks,
} from './components/store/taskSlice';
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: '',
  });

  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then((data) => dispatch(setTasks(data)))
      .catch((error) => console.error('Lỗi khi tải dữ liệu:', error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleAdd = async (title: string, priority: 'low' | 'medium' | 'high') => {
    const newTask = await apiAdd({ title, priority });
    dispatch(addTask(newTask));
  };

  const handleToggle = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      await apiToggle(id, !task.completed);
      dispatch(toggleTask(id));
    }
  };

  const openConfirmDelete = (id: string, title: string) => {
    setTaskToDelete({ id, title });
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setTaskToDelete(null);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      await apiDelete(taskToDelete.id);
      dispatch(deleteTask(taskToDelete.id));
      closeConfirm();
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchStatus =
      filters.status === 'all' ||
      (filters.status === 'completed' && t.completed) ||
      (filters.status === 'active' && !t.completed);

    const matchPriority = filters.priority === 'all' || t.priority === filters.priority;
    const matchSearch = t.title.toLowerCase().includes(filters.search.toLowerCase());

    return matchStatus && matchPriority && matchSearch;
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">📝 Task Manager</h1>

      <TaskForm onAdd={handleAdd} />

      <FilterControls
        status={filters.status}
        priority={filters.priority}
        search={filters.search}
        onStatusChange={(status) => setFilters({ ...filters, status })}
        onPriorityChange={(priority) => setFilters({ ...filters, priority })}
        onSearchChange={(search) => setFilters({ ...filters, search })}
      />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress size={40} color="primary" />
        </div>
      ) : (
        <div>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              {...task}
              onToggle={handleToggle}
              onDelete={() => openConfirmDelete(task.id, task.title)}
            />
          ))}
        </div>
      )}

      <Dialog open={confirmOpen} onClose={closeConfirm}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa công việc "{taskToDelete?.title}" không?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm}>Hủy</Button>
          <Button onClick={confirmDelete} color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;