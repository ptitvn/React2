// src/components/ChangeState.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';

function ChangeState() {
  const companyName = useSelector((state: RootState) => state.company.name);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch({ type: 'CHANGE_COMPANY' });
  };

  return (
    <div>
      <h2>{companyName}</h2>
      <button onClick={handleChange}>Change state</button>
    </div>
  );
}

export default ChangeState;