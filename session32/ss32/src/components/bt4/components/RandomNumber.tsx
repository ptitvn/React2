import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';

function RandomNumber() {
  const numbers = useSelector((state: RootState) => state.random.numbers);
  const dispatch = useDispatch();

  const generateRandom = () => {
    const random = Math.floor(Math.random() * 100); // Tạo số từ 0–99
    dispatch({ type: 'ADD_RANDOM', payload: random });
  };

  return (
    <div>
      <h2>Mảng số ngẫu nhiên:</h2>
      <p>[{numbers.join(', ')}]</p>
      <button onClick={generateRandom}>Generate Random Number</button>
    </div>
  );
}

export default RandomNumber;