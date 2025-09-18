import { useSelector, useDispatch } from 'react-redux';
import type{ RootState } from '../store/store';

function ThemeToggle() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const styles = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
    minHeight: '100vh',
    padding: '20px',
  };

  return (
    <div style={styles}>
      <label>
        <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
        {isDarkMode ? 'Tối' : 'Sáng'}
      </label>
    </div>
  );
}

export default ThemeToggle;