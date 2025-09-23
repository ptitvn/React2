import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';
import { toggleMenu } from './menuSlice';
import {
  DashboardOutlined,
  UserOutlined,
  DollarOutlined,
  BarChartOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

const menuItems = [
  { label: 'Bảng điều khiển', icon: <DashboardOutlined /> },
  { label: 'Tài khoản', icon: <UserOutlined /> },
  { label: 'Tài sản', icon: <DollarOutlined /> },
  { label: 'Thống kê', icon: <BarChartOutlined /> },
  { label: 'Tài liệu', icon: <FileTextOutlined /> },
];

function MenuBar() {
  const collapsed = useSelector((state: RootState) => state.menu.collapsed);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      style={{
        width: collapsed ? '80px' : '220px',
        backgroundColor: '#001529',
        color: '#fff',
        height: '100vh',
        paddingTop: '20px',
        transition: 'width 0.3s',
      }}
    >
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              gap: '12px',
              cursor: 'pointer',
              color: '#91d5ff',
            }}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </li>
        ))}
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            gap: '12px',
            cursor: 'pointer',
            color: '#91d5ff',
          }}
          onClick={() => dispatch(toggleMenu())}
        >
          <ArrowLeftOutlined />
          {!collapsed && <span>Thu gọn</span>}
        </li>
      </ul>
    </div>
  );
}

export default MenuBar;