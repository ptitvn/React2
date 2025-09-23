import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';
import { toggleFavorite } from './userSlice';
import {
  HeartOutlined,
  HeartFilled,
  UserOutlined,
} from '@ant-design/icons';

function UserList() {
  const users = useSelector((state: RootState) => state.users.list);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>List Favorites User</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              gap: '12px',
              fontSize: '16px',
              background: '#f0f2f5',
              padding: '10px',
              borderRadius: '6px',
            }}
          >
            <UserOutlined />
            <span><strong>UserName:</strong> {user.name}</span>
            <span><strong>Favorites:</strong> </span>
            <span
              style={{ cursor: 'pointer', fontSize: '20px', color: user.isFavorite ? 'red' : '#aaa' }}
              onClick={() => dispatch(toggleFavorite(user.id))}
            >
              {user.isFavorite ? <HeartFilled /> : <HeartOutlined />}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;