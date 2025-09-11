import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const products = [
  {
    id: 1,
    name: 'iPhone 13 Pro',
    description: 'Điện thoại thông minh cao cấp của Apple với camera tiên tiến.',
    price: 999,
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    description: 'Laptop mỏng nhẹ với chip Apple M2 hiệu năng cao.',
    price: 1199,
  },
  {
    id: 3,
    name: 'Apple Watch Series 8',
    description: 'Đồng hồ thông minh với các tính năng sức khỏe tiên tiến.',
    price: 399,
  },
  {
    id: 4,
    name: 'iPad Pro',
    description: 'Máy tính bảng mạnh mẽ với màn hình Liquid Retina XDR.',
    price: 1099,
  },
];

function ProductList2() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');

  // Đồng bộ input với query string khi load lại trang
  useEffect(() => {
    const currentSearch = searchParams.get('search');
    if (currentSearch) {
      setKeyword(currentSearch);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (keyword.trim()) {
      setSearchParams({ search: keyword });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Danh sách sản phẩm</h2>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      <ul style={styles.list}>
        {products.map((product) => (
          <li key={product.id} style={styles.card}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Giá:</strong> ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles:any = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  },
  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '30px',
  },
  input: {
    padding: '8px',
    width: '250px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
};

export default ProductList2;