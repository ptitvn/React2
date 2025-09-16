import { useEffect, useState } from 'react';
import axios from 'axios';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function Bt2() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const API_URL = 'http://localhost:3000/tasks';

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  const handleAdd = async () => {
    if (!input.trim()) return;

    await axios.post(API_URL, {
      title: input,
      completed: false,
    });

    setInput('');
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  const handleToggleComplete = async (task: Task) => {
    await axios.put(`${API_URL}/${task.id}`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Quản lý công việc</h1>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Nhập tên công việc"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button style={{ marginRight: '10px' }}>Tất cả</button>
        <button style={{ marginRight: '10px' }}>Hoàn thành</button>
        <button>Đang thực hiện</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
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
                onClick={() => handleDelete(task.id)}
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
    </div>
  );
}

export default Bt2;