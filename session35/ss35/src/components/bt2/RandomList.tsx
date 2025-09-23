import { useSelector, useDispatch } from 'react-redux';
import { generateRandomList } from './randomListSlice';
import type { AppDispatch, RootState } from './store/store';

function RandomList() {
  const numbers = useSelector((state: RootState) => state.randomList.numbers);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>List number: [{numbers.join(',')}]</h2>
      <button onClick={() => dispatch(generateRandomList())}>
        Random number
      </button>
    </div>
  );
}

export default RandomList;