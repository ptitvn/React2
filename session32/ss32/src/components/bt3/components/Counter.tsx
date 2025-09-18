import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Giá trị Counter: {count}</h2>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Tăng</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Giảm</button>
    </div>
  );
}

export default Counter;