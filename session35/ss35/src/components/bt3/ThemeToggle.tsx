import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';
import { toggleTheme } from './themeSlice';

function ThemeToggle() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch<AppDispatch>();

  const styles = {
    backgroundColor: mode === 'light' ? '#fff' : '#333',
    color: mode === 'light' ? '#000' : '#fff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={styles}>
      <h1>{mode === 'light' ? 'Giao diện sáng' : 'Giao diện tối'}</h1>
      <button onClick={() => dispatch(toggleTheme())}>
        {mode === 'light' ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}

export default ThemeToggle;