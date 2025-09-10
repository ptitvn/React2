import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function Student3() {
  const [, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    setSearchParams({ studentName: inputValue });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>
    </div>
  );
}

export default Student3;