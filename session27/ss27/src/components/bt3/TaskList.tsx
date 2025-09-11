import { Link } from 'react-router-dom';
import { tasks } from './tasks';

function TaskList() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Danh sách công việc</h2>
      <div style={styles.list}>
        {tasks.map((task) => (
          <div key={task.id} style={styles.card}>
            <h3 style={styles.name}>{task.name}</h3>
            <p style={styles.desc}>{task.description}</p>
            <Link to={`/task/${task.id}`} style={styles.button}>
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles :any = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '24px',
    color: '#333',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  name: {
    marginBottom: '10px',
    fontSize: '18px',
    color: '#007bff',
  },
  desc: {
    marginBottom: '15px',
    color: '#555',
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
};

export default TaskList;