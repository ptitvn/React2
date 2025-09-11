import { Link } from 'react-router-dom';
import { products } from './Product';

function ProductList() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Danh sách sản phẩm</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              width: '250px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>{product.name}</h3>
            <p><strong>Giá:</strong> {product.price}</p>
            <p>{product.description}</p>
            <Link
              to={`/products/${product.id}`}
              style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
              }}
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;