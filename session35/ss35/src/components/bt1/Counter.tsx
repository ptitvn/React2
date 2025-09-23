import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease, reset } from './counterSlice';
import type { AppDispatch, RootState } from './store/store';

function Counter() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Count: {count}</h1>
            <button onClick={() => dispatch(increase())}>Increase</button>
            <button onClick={() => dispatch(decrease())}>Decrease</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    );
}

export default Counter;