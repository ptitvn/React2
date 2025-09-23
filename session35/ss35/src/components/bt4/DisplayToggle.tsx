import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';
import { toggleDisplayMode } from './displaySlice';

function DisplayToggle() {
  const mode = useSelector((state: RootState) => state.display.mode);
  const dispatch = useDispatch<AppDispatch>();

  const items = [1, 2, 3, 4];

  const containerStyle:any = {
    display: 'flex',
    flexDirection: mode === 'list' ? 'column' : 'row',
    flexWrap: mode === 'grid' ? 'wrap' : 'nowrap',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };

  const itemStyle = {
    width: '100px',
    height: '50px',
    backgroundColor: 'red',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={() => dispatch(toggleDisplayMode())}>
        Chuyển sang {mode === 'list' ? 'dạng lưới' : 'dạng danh sách'}
      </button>
      <div style={containerStyle}>
        {items.map((item) => (
          <div key={item} style={itemStyle}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayToggle;