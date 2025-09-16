import { useState, useEffect } from 'react';
import axios from 'axios';

type Task = {
  id: number;
  title: string;
};

function Bt1() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get<Task[]>('http://localhost:3000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Lỗi khi lấy công việc:', err));
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>🗂️ Quản lý công việc</h1>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Nhập tên công việc"
          disabled
          style={{
            width: '70%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: '#eee',
            cursor: 'not-allowed'
          }}
        />
        <button
          disabled
          style={{
            marginLeft: '10px',
            padding: '10px 15px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'not-allowed'
          }}
        >
          Thêm công việc
        </button>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button disabled style={{ marginRight: '10px' }}>Tất cả</button>
        <button disabled style={{ marginRight: '10px' }}>Hoàn thành</button>
        <button disabled>Đang thực hiện</button>
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
                disabled
                style={{
                  marginRight: '10px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  cursor: 'not-allowed'
                }}
              />
              <span>{task.title}</span>
            </div>
            <div>
              <button
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
                disabled
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  cursor: 'not-allowed'
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
          disabled
          style={{
            marginRight: '10px',
            backgroundColor: '#e53935',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'not-allowed'
          }}
        >
          Xóa công việc hoàn thành
        </button>
        <button
          disabled
          style={{
            backgroundColor: '#b71c1c',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'not-allowed'
          }}
        >
          Xóa tất cả công việc
        </button>
      </div>
    </div>
  );
}

export default Bt1;