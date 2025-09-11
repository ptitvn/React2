import { useParams, useNavigate } from 'react-router-dom';
import { tasks } from './tasks';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Chi tiết công việc</h2>
        <p style={styles.error}>Không tìm thấy công việc.</p>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Chi tiết công việc</h2>
      <h3 style={styles.name}>{task.name}</h3>
      <p style={styles.desc}>{task.description}</p>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        Quay lại
      </button>
    </div>
  );
}

const styles:any = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '24px',
    color: '#333',
  },
  name: {
    fontSize: '20px',
    color: '#007bff',
    marginBottom: '10px',
  },
  desc: {
    color: '#555',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default TaskDetail;