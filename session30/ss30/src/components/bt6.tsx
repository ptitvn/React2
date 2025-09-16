import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function Bt6() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const API_URL = 'http://localhost:3000/tasks';

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy công việc:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError('Không được để trống!');
      return;
    }

    const isDuplicate = tasks.some(task => task.title.toLowerCase() === trimmed.toLowerCase());
    if (isDuplicate) {
      setError('Công việc đã tồn tại!');
      return;
    }

    setLoading(true);
    try {
      await axios.post(API_URL, {
        title: trimmed,
        completed: false,
      });
      setInput('');
      setError('');
      inputRef.current?.focus();
      fetchTasks();
    } catch (err) {
      console.error('Lỗi khi thêm công việc:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/${task.id}`, {
        ...task,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = (id: number) => {
    setConfirmId(id);
  };

  const handleDeleteConfirmed = async () => {
    if (confirmId !== null) {
      setLoading(true);
      try {
        await axios.delete(`${API_URL}/${confirmId}`);
        setConfirmId(null);
        fetchTasks();
      } catch (err) {
        console.error('Lỗi khi xóa công việc:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setConfirmId(null);
  };

  const handleDeleteCompleted = async () => {
    setLoading(true);
    try {
      const completedTasks = tasks.filter(t => t.completed);
      await Promise.all(completedTasks.map(t => axios.delete(`${API_URL}/${t.id}`)));
      fetchTasks();
    } catch (err) {
      console.error('Lỗi khi xóa công việc hoàn thành:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    setLoading(true);
    try {
      await Promise.all(tasks.map(t => axios.delete(`${API_URL}/${t.id}`)));
      fetchTasks();
    } catch (err) {
      console.error('Lỗi khi xóa tất cả công việc:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Quản lý công việc</h1>

      <div style={{ marginBottom: '10px' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Nhập tên công việc"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError('');
          }}
          style={{
            width: '70%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            marginLeft: '10px',
            padding: '10px 15px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Thêm công việc
        </button>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>
      )}

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button onClick={() => setFilter('all')} style={{ marginRight: '10px' }}>Tất cả</button>
        <button onClick={() => setFilter('completed')} style={{ marginRight: '10px' }}>Hoàn thành</button>
        <button onClick={() => setFilter('incomplete')}>Chưa hoàn thành</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '5px solid #ccc',
            borderTop: '5px solid #2196F3',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }} />
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredTasks.map(task => (
              <li key={task.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                    style={{
                      marginRight: '10px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      accentColor: '#4CAF50',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#999' : '#000'
                  }}>
                    {task.title}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => {}}
                    disabled
                    style={{
                      marginRight: '8px',
                      backgroundColor: '#FFC107',
                      color: 'white',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '4px',
                      cursor: 'not-allowed'
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleConfirmDelete(task.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={handleDeleteCompleted}
              style={{
                marginRight: '10px',
                backgroundColor: '#e53935',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Xóa công việc hoàn thành
            </button>
            <button
              onClick={handleDeleteAll}
              style={{
                backgroundColor: '#b71c1c',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Xóa tất cả công việc
            </button>
          </div>

          {confirmId !== null && (
            <div style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
                              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999
            }}>
              <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                width: '300px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}>
                <h3>Xác nhận</h3>
                <p>Bạn có chắc chắn muốn xóa công việc này không?</p>
                <div style={{ marginTop: '15px' }}>
                  <button
                    onClick={handleDeleteConfirmed}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '5px',
                      marginRight: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    Xóa
                  </button>
                  <button
                    onClick={handleCancelDelete}
                    style={{
                      backgroundColor: '#ccc',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Bt6;